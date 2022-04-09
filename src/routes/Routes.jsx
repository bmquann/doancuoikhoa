import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Login from '../pages/Login/Login'
import { Redirect } from 'react-router-dom'
import Register from '../pages/Login/Register'
import { useSelector } from 'react-redux'
import OrderInfor from '../pages/OrderInfor';
import NotFound from '../components/NotFound'

const Routes = () => {
    const user = useSelector((state) => state.user.currentUser);
    const orders = useSelector((state) => state.checkout.order);
    return (
        <Switch>
            <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
            <Route path="/register">
                {user ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route path='/' exact component={Home} />
            <Route path='/catalog/:slug' component={Product} />
            <Route path='/catalog' component={Catalog} />
            <Route path="/cart">{!user ? <Redirect to="/login" /> : <Cart/>}</Route>
            {/* <Route path='/cart' component={Cart} /> */}
            <Route path="/orders" component={OrderInfor}/>
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Routes
