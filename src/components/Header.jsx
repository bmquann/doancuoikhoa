import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/images/Logo-2.png'
import { logOut } from '../redux/apiCalls'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Phụ kiện",
        path: "/accessories"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const Header = () => {

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    
    const cartItems = useSelector((state) => state.cartItems.value)
    const [totalProducts, setTotalProducts] = useState(0)
    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])



    const headerRef = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll")
        };
    }, []);
    const { currentUser } = useSelector((state) => state.user);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        logOut(dispatch, {});
    };
    const renderCart = () => {
        return <div style={{ position: 'relative' }} className="header__menu__item header__menu__right__item">
            <Link to="/cart">
                {/* <i className="bx bx-shopping-bag"></i> */}
                {/* <i value={cartItems.length} className="bx bx-shopping-bag badge" ></i> */}
                <i className="bx bx-shopping-bag"></i>
                {!currentUser ? '' : <span className="badge_cart">{totalProducts === undefined ? 0 :totalProducts }</span>
}
            </Link>
        </div>
    }
    // const renderSearch = () => {
    //     return <div className="header__menu__item header__menu__right__item">
    //         <i className="bx bx-search"></i>
    //     </div>
    // }
    const renderUserLogin = () => {
        return <div className="header__menu__right">
            {/* {renderSearch()} */}
            {renderCart()}
            <div className="header__menu__item header__menu__right__item header__avatar">
                <Link to="/login">


                    <img src={currentUser.user ? (currentUser.user.picture ? currentUser.user.picture : `https://i.pravatar.cc/150?u=${currentUser.email}`) :""} alt="avata" />
                </Link>
            </div>
            <div onClick={handleClick} className="header__menu__item header__menu__right__item">

                <Link to="/login">
                    <i className="bx bx-log-out"></i>
                </Link>
            </div>

        </div>
    }
    const renderNavFunction = () => {
        if (currentUser) {

            return renderUserLogin()
        }
        else {
            return <div className="header__menu__right">
                {/* {renderSearch()} */}
                {renderCart()}
                <div className="header__menu__item header__menu__right__item">

                    <Link to="/login">
                        <i className="bx bx-user"></i>
                    </Link>
                </div>
            </div>
        }
    }

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    {renderNavFunction()}
                </div>
            </div>
        </div>
    )
}

export default Header
