import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from "../assets/orderStatus.module.css"
import { createOrder, getOrders } from '../redux/apiCalls';

export default function OrderStatus(props) {

    const { order } = props
    // const { value, currency_code } = order.purchase_units[0].amount
    // const { value, currency_code } = order.purchase_units[0].shipping
    const dispatch = useDispatch()
    const info = useSelector((state) => state.checkout.value)
    useEffect(() => {
        const newOrder = {
            _id: order.id,
            userId: info.userId,
            email: info.email,
            firstName: info.firstName,
            lastName: info.lastName,
            address: info.address,
            address2: info.address2,
            city: info.city,
            country: info.country,
            state: info.state,
            phone: info.phone,
            zipcode: info.zipcode,
            isOk: order.status,
            products: info.products,
            price: order.purchase_units[0].amount.value
        }
        createOrder(newOrder, dispatch)
    }, [info, order])

    const { currentUser } = useSelector((state) => state.user);
    const handleClickOrders=()=>{
        getOrders(currentUser.user._id,dispatch);
    }


    return (
        <div>
            <ol className={style.progtrckr} data-progtrckr-steps={5}>
                <li className={style.progtrckr_done}>Order Processing</li>
                <li className={style.progtrckr_done}>Pre-Production</li>
                <li className={style.progtrckr_done}>In Production</li>
                <li className={style.progtrckr_todo}>Shipped</li>
                <li className={style.progtrckr_todo}>Delivered</li>
            </ol>
            <div style={{ margin: "50px" }}>
                <dl>
                    <dt>Order ID: {order.id}</dt>
                    <dd>Create At: {order.create_time}</dd>
                    <dd>Price: {order.purchase_units[0].amount.value} &nbsp;{order.purchase_units[0].amount.currency_code} </dd>


                    <dt>Payer</dt>
                    <dd>Name: {order.payer.name.given_name} &nbsp;{order.payer.name.surname} </dd>
                    <dd>Email: {order.payer.email_address}  </dd>

                    <dt>STATUS: {order.status}</dt>
                </dl>
            </div>
            <Button style={{ color: 'red', background: 'white', border: '1px solid', textTransform: 'capitalize', margin: '10px', textAlign: 'center' }} >
                <Link to="/orders" onClick={handleClickOrders}>
                    Xem Chi tiết các đơn hàng
                </Link>
            </Button>

        </div>


    );
}
