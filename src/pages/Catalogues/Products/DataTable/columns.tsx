import { ColumnDef } from "@tanstack/react-table";
import {  MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "./data-table-column-header";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "@/redux/services/productService";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export type Product = {
    _id: string
    title:string
    price: number     
    category: string
    quantity: number
    brand: string
    sold: string
    thumbnail:string
}
export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)
       
            return <div className="text-right font-medium">{formatted}</div>
        },
    },    
    {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Quantity" />
        ),
    },
    {
        accessorKey: "brand",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Brand" />
        ),
    },
    {
        accessorKey: "sold",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Sold" />
        ),
    },
    {
        accessorKey: "thumbnail",
        header: "Image",
    },
    {
        id:"actions",
        cell: ({ row }) => {
            const payment = row.original;
            const navigate = useNavigate();
            const [
              deleteProduct,
              {
                
                isSuccess:isProductDeleteSuccess,
              }
            ] = useDeleteProductMutation();
            const handleDelete = async(id:any) => {              
              if(window.confirm('Are you sure to delete item ?')){
                await deleteProduct(id);
              }                           
            }
            useEffect(()=>{
              if(isProductDeleteSuccess){
                toast({
                  title:"Product Delete Successfully !"
                });
              }
            },[isProductDeleteSuccess]);
            return(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment._id)}
                        >
                            Copy product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigate(`/catalogues/products/${payment._id}`)}
                        >
                            View Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={() => navigate(`/catalogues/products/edit/${payment._id}`)}
                        >
                            Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={() => handleDelete(payment._id)}
                        >
                            Delete Product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    },
]