import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

import numberWithCommas from '../utils/numberWithCommas'
import { getProductBySlug } from '../redux/ProductRedux'
import CheckoutForm from '../components/CheckOut/CheckoutForm.js'
import { getOrders } from '../redux/apiCalls'
const Cart = () => {
    const products = useSelector((state) => state.product.products);
    // const products=JSON.parse(localStorage.getItem("products"))
    const dispatch = useDispatch();
    

    const [isCheckOut, setIstCheckOut] = useState(false);

    const getCartItemsInfo = (cartItems) => {
        let res = []
        if (cartItems.length > 0) {
            cartItems.forEach(e => {
                let product = getProductBySlug(e.slug, products)
                res.push({
                    ...e,
                    product: product
                })
            })
        }
        return res.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))
    }
    const { currentUser } = useSelector((state) => state.user);

    const cartItems = useSelector((state) => state.cartItems.value)

    const [cartProducts, setCartProducts] = useState(getCartItemsInfo(cartItems))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setCartProducts(getCartItemsInfo(cartItems))
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])
    useEffect(() => {
        getOrders(currentUser.user._id,dispatch);
    }, [currentUser.user.id, dispatch]);
    const orders = useSelector((state) => state.checkout.orders);



    if(!isCheckOut){
        return (
        
            <Helmet title="Gi??? h??ng">
                <div className="cart">
                    <div className="cart__info">
                        <div className="cart__info__txt">
                            <p>
                                B???n ??ang c?? {totalProducts} s???n ph???m trong gi??? h??ng
                            </p>
                            <div className="cart__info__txt__price">
                                <span>Th??nh ti???n:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                            </div>
                        </div>
                        <div className="cart__info__btn">
                            {/* <Link > */}
                            <Button onClick={() => {
                                if (totalProducts > 0) {
                                    setIstCheckOut(true)
                                }
                            }} size="block">
                                ?????t h??ng
                            </Button>
                            
                            {/* </Link> */}
    
    
                            <Link to="/catalog">
                                <Button size="block">
                                    Ti???p t???c mua h??ng
                                </Button>
                            </Link>
                            {orders.length !=0 ? <Link to="/orders">
                                <Button size="block">
                                    ????n h??ng ???? mua
                                </Button>
                            </Link> : ""}

                            
                        </div>
                    </div>
                    <div className="cart__list">
                        {
                            cartProducts.map((item, index) => (
                                <CartItem item={item} key={index} />
                            ))
                        }
                    </div>
                </div>
            </Helmet>
    
        )
    }else{
        return (
            // <div style={{alignItems: 'center'}}>
            //     <PayPal
            //     total={totalPrice}
            //     items={cartItems}
            // />
            // </div>
            <CheckoutForm total={totalPrice} items={cartItems} totalProducts={totalProducts}/>
        )
    }
    

}

export default Cart
