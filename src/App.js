import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Customer from './Component/Customer.jsx';

function App() {


  let routes = createBrowserRouter([
    {path:"/" ,element:<Customer/>},
  ])


  return (
   <>
    <RouterProvider router={routes}/>
   </>
  );
}

export default App;
