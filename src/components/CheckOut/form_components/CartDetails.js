import { Button } from "bootstrap";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import PayPal from "../../PayPal";


export default function CartDetails(props) {
    const { total, totalProducts, items } = props


      return (
        <div style={{ alignItems: 'center', }}>
          <PayPal
            total={total}
            items={items}
            totalProducts={totalProducts}
          />
          {/* <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              // description={`Your total is $${cart.total}`}
              // amount={cart.total * 100}
              // token={onToken}
              // stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout> */}
        </div>
      )
    

}
