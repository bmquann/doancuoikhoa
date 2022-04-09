
import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

// import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getProductBySlug } from '../redux/ProductRedux'
import React from 'react'


const Product = props => {

    // const products = useSelector((state) => state.product.products);
    const products=JSON.parse(localStorage.getItem("products"))
    
    // const [slug,setSlug]= useState()}
    const slug=localStorage.getItem("slug")
    // const slug = useSelector((state) => state.product.slug)
    const product = getProductBySlug(slug,products)

    const relatedProducts = getAllProducts(8,products);
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            relatedProducts.map((item, index) => (
                                <ProductCard
                                id={item._id}
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
