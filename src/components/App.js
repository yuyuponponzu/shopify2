import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import ProductView from './ProductView';
import { useShopify } from '../hooks';

export default (props) => {
    const {
        createShop,
        createCheckout,
        fetchProducts,
        // fetchCollection,
    } = useShopify();

    useEffect(() => {
        createShop();
        fetchProducts();
        createCheckout();
        // fetchCollection()
    }, []);

    return (
        <Router>
            <div id="App">
                <Route exact path="/" render={() => <Redirect to="/Home" />} />
                <Route path="/Home" component={Home} />
                <Route path="/debug/:contentName" component={Products} />
                <Route path="/Product/:productId" component={ProductView} />
                <Route path="/debug" component={ProductView} />
                <Route path="/About" component={About} />
                <Route path="/Cart" component={Cart} />
                <Route path="/Contact" component={Contact} />
            </div>
        </Router>
    );
};
