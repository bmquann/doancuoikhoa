import React, { Component } from 'react';
import { Container, Col, Row } from "reactstrap";
import ContactInfo from './form_components/ContactInfo';


import CartDetails from './form_components/CartDetails';
import InfoReel from './form_components/InfoReel';
import { connect } from 'react-redux';
import { addCart } from '../../redux/shopping-cart/CheckOutInFo';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-unused-vars
    var setInfo = this.setInfo.bind(this);
  }
  setInfo(info) {
    this.setState({
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
      isOk: info.isOk,
    })
  }
  state = {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    phone: '',
    zipcode: '',
    isOk: false,
    products: this.props.items,
    price: this.props.total

  }
  c
  render() {
    if (this.state.isOk) {
      this.props.addCart(this.state)
    }
    return (
      <Container>
        <Row>

          {this.state.isOk ? <Col><CartDetails
            style={{ width: '100%' }}
            infor={this.state}
            totalProducts={this.props.totalProducts}
            total={this.props.total}
            items={this.props.items} />
          </Col> : <Col
            className="left-col-container" md="6">
            <ContactInfo
              setInfo={this.setInfo.bind(this)} />
          </Col>}

          {this.state.isOk ? <p style={{ display: 'block' }}></p> : <Col className="right-col-container pb-4" md="6"><InfoReel />  </Col>}
        </Row>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // explicitly forwarding arguments
    addCart: (action) => dispatch(addCart(action)),

    // implicitly forwarding arguments
  }
}
export default connect(null, mapDispatchToProps)(CheckoutForm);

