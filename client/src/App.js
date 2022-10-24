


import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar  from './components/Navbar/index';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from "./pages/Profile";


import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedAdmin from "./pages/ProtectedAdmin";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";

import Orders from "./pages/Admin/Orders/index";
import Productss from "./pages/Admin/Products/index";
import ProductDetails from "./pages/Admin/ProductDetail";
import NewProduct from "./pages/Admin/Products/new";

function App() {
  return (
    <div className="App">
      <div id='content'>
        <BrowserRouter>
          <Routes>
              <Route path='/*'  element={<Navbar />} >
                  <Route path='product' exact element={<Products />} /> 
                  <Route path='product/:_id'  element={<ProductDetail />} /> 
                  <Route path='signin' element={<Signin />} /> 
                  <Route path='signup' element={<Signup />} />
                  <Route path='basket' element={<Basket />} />
                  <Route path='admin/orders' element={<Orders />} />
                  <Route path='admin/products' element={<Productss />} />
                  <Route path='admin/products/:_id' element={<ProductDetails />} />
                  <Route path='admin/products/newproduct' element={<NewProduct />} />
                  
                  
                 
                  {/* Kullanıcı login değilse profile girmesin */}
                  <Route path="profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  ></Route>
                   <Route path="admin" element={
                      <ProtectedAdmin>
                        <Admin /> 
                      </ProtectedAdmin>
                    }
                  ></Route>

                  <Route path='*' element={<Error404 />} />
              </Route> 
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}



export default App;
