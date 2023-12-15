import { lazy } from "react";



const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Products = lazy(()=> import('../pages/Catalogues/Products'));
const AddProduct = lazy(()=> import('../pages/Catalogues/Products/AddProduct'));
const EditProduct = lazy(()=> import('../pages/Catalogues/Products/EditProduct'));
const Orders = lazy(()=> import('../pages/Catalogues/Orders'));
const Inventaries = lazy(()=> import('../pages/Catalogues/Inventaries'));
const SettingsAccountPage = lazy(()=> import('../pages/Settings/forms/account'));
const SettingsAppearancePage = lazy(()=> import('../pages/Settings/forms/appearance'));
const SettingsDisplayPage = lazy(()=> import('../pages/Settings/forms/display'));
const SettingsNotificationsPage = lazy(()=> import('../pages/Settings/forms/notifications'));
const MediaFiles = lazy(()=> import('../pages/media'))

const coreRoutes = [
    {
      path: '/profile',
      title: 'Profile',
      component: Profile,
    },   
    {
      path: '/settings',
      title: 'Settings',
      component: Settings,
    },
    {
      path: '/settings/account',
      title: 'Account',
      component: SettingsAccountPage,
    },
    {
      path: '/settings/appearance',
      title: 'Appearance',
      component: SettingsAppearancePage,
    },
    {
      path: '/settings/display',
      title: 'Display',
      component: SettingsDisplayPage,
    },
    {
      path: '/settings/notifications',
      title: 'Notifications',
      component: SettingsNotificationsPage,
    },
    {
      path: '/catalogues/products',
      title: 'Products',
      component: Products,
    },
    {
      path: '/catalogues/products/add',
      title: 'AddProduct',
      component: AddProduct,
    },
    {
      path: '/catalogues/products/edit/:id',
      title: 'Products',
      component: EditProduct,
    },
    {
      path: '/catalogues/orders',
      title: 'Orders',
      component: Orders,
    },
    {
      path: '/catalogues/inventaries',
      title: 'Inventaries',
      component: Inventaries,
    },
    {
      path: '/media',
      title: 'Media',
      component: MediaFiles,
    },
    
   
  ];
  
  const routes = [...coreRoutes];
  export default routes;