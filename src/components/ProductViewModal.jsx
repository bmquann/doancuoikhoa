import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ProductView from './ProductView'

import Button from './Button'

import { remove } from '../redux/product-modal/productModalSlice'

import { findProduct } from '../redux/apiCalls'

const ProductViewModal = () => {

    const dispatch = useDispatch();

    const productSlug = useSelector((state) => state.productModal.value)
    useEffect(() => {
        findProduct(productSlug,dispatch)
    }, [dispatch, productSlug]);

    let product = useSelector((state) => state.product.productBySlug);

    return (
        <div className={`product-view__modal ${product[0] === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product[0]}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"    
                        onClick={() => dispatch(remove())}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal
