import React, { useState, useRef, useEffect } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap'
import numberWithCommas from "../utils/numberWithCommas";
import OrderStatus from "./OrderStatus";

function PayPal(props) {

    const { items,total } = props
    let sum;
    if(total<239000){
        sum=Math.round(total / 24000 * 100) / 100 +1
    }
    else{
        sum = Math.round(total / 24000 * 100)/100
    }
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const [order, setOrder] = useState(null)
    const paypalRef = useRef()
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: sum,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, action) => {
                    setOrder(await action.order.capture());
                    setPaidFor(true);
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR', err);
                },
            }).render(paypalRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (paidFor) {
        return (
            <div>
                <OrderStatus order={order} />
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error
            </div>
        )
    }
    return (
        <div>
            <ListGroup style={{ textAlign: 'center' }}>
                {items.map((item, i) =>
                    <ListGroupItem style={{ margin: "20px" }} key={i}>
                        <span style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>Name: </span>
                        <span style={{ color: "red", fontSize: "20px", fontWeight: "400" }}>{item.title} </span>
                        <span style={{ fontWeight: "bold", fontSize: "20px" }}  > &nbsp; - &nbsp; </span>
                        <span style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}> Quantity: </span>
                        <span style={{ color: "red", fontSize: "20px", fontWeight: "400" }}>{item.quantity}</span>
                    </ListGroupItem>
                )}
                {total >= 239000 ? <div>
                    <div style={{ margin: "20px" }}><span style={{ color: "Black", fontSize: "18px", fontWeight: "bold" }}>Shipping: </span>
                        <span style={{ color: "red", fontSize: "20px", fontWeight: "400" }}>Free Ship</span>    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} ref={paypalRef} />
                </div> : <div>
                    <div style={{ margin: "20px" }}><span style={{ color: "Black", fontSize: "18px", fontWeight: "bold" }}>Shipping: </span>
                        <span style={{ color: "red", fontSize: "20px", fontWeight: "400" }}>1 $</span>    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} ref={paypalRef} />
                </div>}
                <div style={{ margin: "20px" }}><span style={{ color: "Black", fontSize: "18px", fontWeight: "bold" }}>Total: </span>
                    <span style={{ color: "red", fontSize: "20px", fontWeight: "400" }}>{numberWithCommas(sum)} $</span>    </div>
                <div style={{ display: 'flex', justifyContent: 'center' }} ref={paypalRef} />
            </ListGroup>
        </div>
    )
}
export default PayPal

