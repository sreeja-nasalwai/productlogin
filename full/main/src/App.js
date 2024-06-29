import './App.css';
import  AuthProvider  from './components/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
//import FooterComponent from './components/FooterComponent';
import LoginComponent from './components/LoginComponent';
import PasswordComponent from './components/PasswordComponent';
import PrivComponent from './components/PrivComponent';
import ProductComponent from './components/ProductComponent';
import SignUpComponent from './components/SignUpComponent';
import HomeComponent from './components/HomeComponent';
import MainComponent from './components/MainComponent';
import UserPrivateRoute from './components/UserPrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import ProductDetail from './components/ProductDetail';


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <HeaderComponent />
                <Routes>
                    <Route path="/" exact element={<MainComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/pass" element={<PasswordComponent />} />
                    <Route path="/term" element={<PrivComponent />}  />
                    <Route path="/signup" element={<SignUpComponent />} />
                    {/* <Route path="/home" element={<HomeComponent />} /> */}
                    <Route  element={<UserPrivateRoute />}>
                    <Route path='/home' element={<HomeComponent/>}></Route>

                   </Route>
                   <Route  element={<AdminPrivateRoute />}>
                    <Route path='/product' element={<ProductComponent/>}></Route>
                    <Route path="/product/:id" element={<ProductDetail />} />
                   </Route>
                   
                </Routes>
                {/* <FooterComponent />  */}
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
