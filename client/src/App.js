import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import PizzaDetails from './pages/PizzaDetails';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register'; 

import PrivateRoutes1 from './privateRoutes/privateRoutes1';
import PrivateRoutes2 from './privateRoutes/privateRoutes2';
import PrivateRoutes3 from './privateRoutes/privateRoutes3';

const App = (props) => {
    return (
        <div className="max-w-[1280px] mx-auto">
            <Router>
                <ScrollToTop />
                <Sidebar />

                <Routes>
                    <Route
                        path='/'
                        element={
                            <PrivateRoutes1>
                                <Login />
                            </PrivateRoutes1>
                        }
                    />

                    <Route
                        path='/register'
                        element={
                            <PrivateRoutes1>
                                <Register />
                            </PrivateRoutes1>
                        }
                    />

                    <Route 
                        path="/home" 
                        element={
                            <PrivateRoutes2>
                                <Home />
                            </PrivateRoutes2>
                        } 
                    />

                    <Route 
                        path="/pizza/:id" 
                        element={
                            <PrivateRoutes3>
                                <PizzaDetails /> 
                            </PrivateRoutes3> 
                        } 
                    />

                    <Route 
                        path='/checkout' 
                        element={
                            <PrivateRoutes3>
                                <Checkout />
                            </PrivateRoutes3>
                        } 
                    />  

                    <Route path='*' element={ <NotFound /> } />                  
                </Routes>

                <Footer />
            </Router>
        </div>
    );
};

export default App;