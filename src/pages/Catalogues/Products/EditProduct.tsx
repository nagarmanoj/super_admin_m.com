import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSingleProductQuery, useUpdateProductMutation } from '../../../redux/services/productService';
import { toast } from "@/components/ui/use-toast"
import { Separator } from '@/components/ui/separator';
import { useBrandListQuery } from '@/redux/services/brandService';
import { useCategoryListQuery } from '@/redux/services/categoryService';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
//import { Product } from '@/redux/services/type';

const initialState = {
  title: '',
  category: '',
  brand: '',
  description: '',
  price: '',
  sold: '',
  quantity: '',
}

const EditProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([{ url: ""}]);
  const [productFormValue, setProductFormValue] = useState<any>(initialState);
  const { title, category, brand, description, price, sold, quantity } = productFormValue;
  const [categories, setCategories] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const { data: productData } = useSingleProductQuery(id!);
  const { data: categoryData } = useCategoryListQuery();
  const { data: brandData } = useBrandListQuery();


  // let handleImagesChange = (i:any, e:any) => {
  //   let newFormValues = [...images];
  //   newFormValues[i][e.target.name] = e.target.value;
  //   setImages(newFormValues);
  // }

  let addFormFields = () => {
    setImages([...images, { url: "" }])
  }

  const handleChange = (e: any) => {
    setProductFormValue({ ...productFormValue, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
    if (brandData) {
      setBrands(brandData);
    }
    if (productData) {
      setProductFormValue(productData);
      
    }
    setLoading(false);
  }, [categoryData, brandData, productData]);

  console.log(productFormValue);
  const [
    updateProduct,
    {
      data: updateProductData,     
      error: updateProductError,
    }
  ] = useUpdateProductMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        _id: id,
        title: title,
        description: description,
        category: category,
        brand: brand,
        price: price,
        quantity: quantity,
        sold: sold,
        thumbnail: thumbnail,
        images:images,
      };
      await updateProduct(data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
    catch (err) {
      //toast.error(`error is-:${err}`);
    }
  }

  useEffect(() => {
    if (updateProductError) {
      toast({ title: `error is-:${updateProductError}` });
    }
    if (updateProductData) {
      console.log(updateProductData);

      setTimeout(() => {
        toast({ title: "Update Successfully" });
      }, 300);
    }
  }, [updateProductData, updateProductError])
  if (loading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <>

      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your catalogue settings and products preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            {/* <SidebarNav items={sidebarNavItems} /> */}
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              <Link to={`/catalogues/products/edit/${id}`} className='hover:bg-transparent hover:underline justify-start'>
                Product
              </Link>
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Edit Product</h3>
                <p className="text-sm text-muted-foreground">
                  Customize the product of the app
                </p>
              </div>
              <Separator />
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  {/* <Input
                    type="text"
                    id="text"
                    placeholder="Enter Title"
                    name='title'
                    value={title}
                    onChange={handleChange}
                  /> */}
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    name='title'
                    value={title}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Category</Label>
                  <Select name='category' value={category} onValueChange={handleChange} >

                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified category to display" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((item: any, index: any) => {
                        return (
                          <SelectItem value={item?.title} key={index}>{item?.title}</SelectItem>
                        )
                      })}

                    </SelectContent>
                  </Select>

                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Brand</Label>
                  <Select name='brand' value={brand} onValueChange={handleChange} >

                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified brand to display" />
                    </SelectTrigger>

                    <SelectContent>
                      {brands.map((item: any, index: any) => {
                        return (
                          <SelectItem value={item?.title} key={index}>{item?.title}</SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Description</Label>
                  <Textarea
                    placeholder="Enter description ..."
                    className="h-full min-h-[200px] lg:min-h-[300px] xl:min-h-[300px]"
                    name='description'
                    value={description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Price</Label>
                  <Input
                    type="number"
                    placeholder="Enter price ..."
                    name='price'
                    value={price}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Sold</Label>
                  <Input
                    type='number'
                    placeholder="Enter sold ..."
                    name='sold'
                    value={sold}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Quantity</Label>
                  <Input
                    type='number'
                    placeholder="Enter quantity ..."
                    name='quantity'
                    value={quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Single Image</Label>
                  <Input
                    placeholder="Enter image url http://example.com .."
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>




                <div >
                  <Label htmlFor="title">Multiple Image</Label>
                  {images.map((element, index) => (
                    <div key={index} className='mt-2'>
                     <Input
                        placeholder="Enter image url http://example.com .."
                        name='url'
                        value={element.url || ""}
                        //onChange={e => handleImagesChange(index, e)}
                    />
                    </div> 
                  ))}
                  
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Browse</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[925px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog> */}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addFormFields()}
                  >
                    Add url
                  </Button>
                </div>
                <Button type="submit">Save Change</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProduct