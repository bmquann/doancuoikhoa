import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrderStatus from '../components/OrderStatus';
import { getOrders } from '../redux/apiCalls';
import style from "../assets/orderStatus.module.css"
import { Link } from 'react-router-dom';
import { Button, Col, Modal, Nav, Row, Tab } from 'react-bootstrap';
import numberWithCommas from '../utils/numberWithCommas';

export default function OrderInfor() {
    const dispatch = useDispatch();


    const orders = JSON.parse(localStorage.getItem("orders"))
    const toDo = style.progtrckr_todo;
    const toDone = style.progtrckr_done;
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState([{
        title: "",
        slug: "",
        color: "",
        size: "",
        price: "",
        quantity: "",
        image01: ""
    }]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const renderOrder = (products) => {
        return products.map(product =>
            <div className="cart__item" >
                <div className="cart__item__image">
                    <img src={product.image01} alt="" />
                </div>
                <div className="cart__item__info">
                    <div className="cart__item__info__name">
                        <Link to={`/catalog/${product.slug}`}>
                            {`${product.title} - ${product.color} - ${product.size}`}
                        </Link>
                    </div>
                    <div className="cart__item__info__price">
                        {numberWithCommas(product.price)}
                    </div>
                    <div className="cart__item__info__quantity">
                        {product.quantity}
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div >

            {/* <Button style={{fontSize:"18px",color:'red',background:'white',border:'1px solid',textTransform:'capitalize',margin:'10px',textAlign:'center'}} ><Link to="/" >
            <i  className='bx bx-home'></i> &nbsp; Home
            </Link></Button> */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Chờ xử lý</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Đang giao hàng</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Đã giao hàng</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">

                                {
                                    orders.filter(function (e) { return e.status === 0 }).map((item, index) => {
                                        return <div style={{ border: '1px solid', margin: '10px' }} key={index}>

                                            <ol className={style.progtrckr} data-progtrckr-steps={5}>
                                                <li className={style.progtrckr_done}>Order Processing</li>
                                                <li className={style.progtrckr_done}>Pre-Production</li>
                                                <li className={style.progtrckr_done}>In Production</li>
                                                <li className={item.status >= 1 ? toDone : toDo}>Shipped</li>
                                                <li className={item.status == 2 ? toDone : toDo}>Delivered</li>
                                            </ol>
                                            <div style={{ margin: "50px" }}>
                                                <dl>
                                                    <dt>Order ID: {item._id}</dt>
                                                    <dd>Price: {item.price} &nbsp;$</dd>
                                                    <dd>Create At: {Date(item.createdAt)}</dd>

                                                    <dt>Payer</dt>
                                                    <dd>Name: {item.firstName}&nbsp;{item.lastName} </dd>
                                                    <dd>Email: {item.email}  </dd>

                                                    <dt>STATUS: {item.isOk}</dt>
                                                </dl>
                                            </div>

                                            <div>
                                                <Button variant="warning" onClick={() => { handleShow(); setOrder(item.products) }}>
                                                    Xem chi tiết
                                                </Button>
                                            </div>


                                        </div>


                                    })

                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {
                                    orders.filter(function (e) { return e.status === 1 }).map((item, index) => (
                                        <div style={{ border: '1px solid', margin: '10px' }} key={index}>

                                            <ol className={style.progtrckr} data-progtrckr-steps={5}>
                                                <li className={style.progtrckr_done}>Order Processing</li>
                                                <li className={style.progtrckr_done}>Pre-Production</li>
                                                <li className={style.progtrckr_done}>In Production</li>
                                                <li className={item.status >= 1 ? toDone : toDo}>Shipped</li>
                                                <li className={item.status == 2 ? toDone : toDo}>Delivered</li>
                                            </ol>
                                            <div style={{ margin: "50px" }}>
                                                <dl>
                                                    <dt>Order ID: {item._id}</dt>
                                                    <dd>Price: {item.price} &nbsp;$</dd>
                                                    <dd>Create At: {Date(item.createdAt)}</dd>

                                                    <dt>Payer</dt>
                                                    <dd>Name: {item.firstName}&nbsp;{item.lastName} </dd>
                                                    <dd>Email: {item.email}  </dd>

                                                    <dt>STATUS: {item.isOk}</dt>
                                                </dl>
                                            </div>
                                            <div>
                                                <Button variant="warning" onClick={() => { handleShow(); setOrder(item.products) }}>
                                                    Xem chi tiết
                                                </Button>
                                            </div>


                                        </div>
                                    ))

                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                {
                                    orders.filter(function (e) { return e.status === 2 }).map((item, index) => (
                                        <div style={{ border: '1px solid', margin: '10px' }} key={index}>

                                            <ol className={style.progtrckr} data-progtrckr-steps={5}>
                                                <li className={style.progtrckr_done}>Order Processing</li>
                                                <li className={style.progtrckr_done}>Pre-Production</li>
                                                <li className={style.progtrckr_done}>In Production</li>
                                                <li className={item.status >= 1 ? toDone : toDo}>Shipped</li>
                                                <li className={item.status == 2 ? toDone : toDo}>Delivered</li>
                                            </ol>
                                            <div style={{ margin: "50px" }}>
                                                <dl>
                                                    <dt>Order ID: {item._id}</dt>
                                                    <dd>Price: {item.price} &nbsp;$</dd>
                                                    <dd>Create At: {Date(item.createdAt)}</dd>

                                                    <dt>Payer</dt>
                                                    <dd>Name: {item.firstName}&nbsp;{item.lastName} </dd>
                                                    <dd>Email: {item.email}  </dd>

                                                    <dt>STATUS: {item.isOk}</dt>
                                                </dl>
                                            </div>
                                            <div>
                                                <Button variant="warning" onClick={() => { handleShow(); setOrder(item.products) }}>
                                                    Xem chi tiết
                                                </Button>
                                            </div>


                                        </div>
                                    ))

                                }
                            </Tab.Pane>
                        </Tab.Content>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {renderOrder(order)}

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Tab.Container>
            {/* {
                orders.filter(function(e){return e.status < 3}).map((item, index) => (
                    <div style={{border: '1px solid',margin: '10px'}} key={index}>
                        
                        <ol className={style.progtrckr} data-progtrckr-steps={5}>
                            <li className={style.progtrckr_done}>Order Processing</li>
                            <li className={style.progtrckr_done}>Pre-Production</li>
                            <li className={style.progtrckr_done}>In Production</li>
                            <li className={item.status>=1 ? toDone : toDo}>Shipped</li>
                            <li className={item.status==2 ? toDone : toDo}>Delivered</li>
                        </ol>
                        <div style={{ margin: "50px" }}>
                            <dl>
                                <dt>Order ID: {item._id}</dt>
                                <dd>Price: {item.price} &nbsp;$</dd>
                                <dd>Create At: {Date(item.createdAt)}</dd>

                                <dt>Payer</dt>
                                <dd>Name: {item.firstName}&nbsp;{item.lastName} </dd>
                                <dd>Email: {item.email}  </dd>

                                <dt>STATUS: {item.isOk}</dt>
                            </dl>
                        </div>

                    </div>
                ))

            } */}

        </div>
    )
}
