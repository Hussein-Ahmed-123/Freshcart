import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './context/CounterContext';
import UserContextProvider from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import WishList from './components/WishList/WishList';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import WhishListProvider from './context/WishListContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';

let query =new QueryClient()

let x =createBrowserRouter([
  {path:"", element: <Layout/> ,children:[
    {index:true, element: <ProtectedRoute>  <Home/> </ProtectedRoute>},
    {path:"cart", element: <ProtectedRoute>  <Cart/> </ProtectedRoute>},
    {path:"brands", element: <ProtectedRoute>  <Brands/> </ProtectedRoute>},
    {path:"categories", element: <ProtectedRoute>  <Categories/> </ProtectedRoute>},
    {path:"productdetails/:id/:category", element: <ProtectedRoute>  <ProductDetails/> </ProtectedRoute>},
    {path:"wishlist", element: <ProtectedRoute>  <WishList/> </ProtectedRoute>},
    {path:"checkout", element: <ProtectedRoute>  <Checkout/> </ProtectedRoute>},
    {path:"allorders", element: <ProtectedRoute>  <Allorders/> </ProtectedRoute>},
    {path:"register", element: <Register/> },
    {path:"verifycode", element: <VerifyCode/> },
    {path:"forgot-password", element: <ForgotPassword/> },
    {path:"login", element: <Login/> },
    {path:"products", element: <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:"*", element: <Notfound/> },
  ],
},
]);

function App() {

  return<>
  <UserContextProvider>
  <CounterContextProvider>  
  <QueryClientProvider client={query}>
    <CartContextProvider>
      <WhishListProvider>
      <RouterProvider router={x}></RouterProvider>
      <Toaster/>
      </WhishListProvider>
    </CartContextProvider>
    <ReactQueryDevtools/>
  </QueryClientProvider>
  </CounterContextProvider>
  </UserContextProvider>
  </> ;
}

export default App
