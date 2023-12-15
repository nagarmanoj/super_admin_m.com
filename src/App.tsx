
import { Suspense, lazy, useEffect, useState } from 'react';

import routes from './routes'
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Ecommerce from './pages/Dashboard/Ecommerce';
import AuthMiddleware from './middleware/AuthMiddleware';
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch } from './redux/store/hooks';
import { setUser } from './redux/features/authSlice';

const DefaultLayout = lazy(()=>import('./layout/DefaultLayout'));
export default function App() {
  const [loading,setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const getUser = async() => {
    try{
      const user = JSON.parse(await sessionStorage.getItem("user") || "{}");
      if(user){
        dispatch(setUser(user));
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getUser();
    setTimeout(()=>setLoading(false),1000);
  },[])

  return loading ? (
    <h1>Loading ...</h1>
  ) : (
    
      <>
        <Toaster />
        <Routes>
          <Route path="/auth/signin" element={<SignIn/>} />
          <Route path="/auth/signup" element={<SignUp/>} />
          <Route element={<AuthMiddleware><DefaultLayout /></AuthMiddleware>}>
            <Route index element={<Ecommerce />} />
            { routes.map((routes,index)=>{
                const {path,component:Component } = routes;
                return(
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<h1>Loading ...</h1>}>
                        <Component />
                      </Suspense>
                    }
                  />
                )
              })
            }
          </Route>
        </Routes>        
      </>
    
  )
}


