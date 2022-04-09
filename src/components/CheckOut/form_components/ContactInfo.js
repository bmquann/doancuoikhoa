import React from "react";
import { Alert, Col, Row, Form, FormGroup, Input, Label, Button } from "reactstrap";
import Toggle from '../Toggle';
import CountryOptions from './input_options/countryOptions';
import StateOptions from './input_options/stateOptions';
import PlusIcon from '../../../assets/images/checkOut/_ionicons_svg_md-add.png';
import { connect } from "react-redux";
import Swal from "sweetalert2";

class FormContactInfo extends React.Component {
	constructor(props) {
		super(props);
		// eslint-disable-next-line no-unused-vars
		var handleSetCountry = this.handleSetCountry.bind(this);
		// eslint-disable-next-line no-unused-vars
		var handleSetState = this.handleSetState.bind(this);
		
	}
	handleSetCountry(country) {
		this.setState({ country: country });
	}
	handleSetState(state) {
		this.setState({ state: state });
	}
	
	state = {
		userId: this.props.currentUser.user._id,
		email: this.props.currentUser.user.email,
		firstName: '',
		lastName: this.props.currentUser.user.userName,
		address: '',
		address2: '',
		city: '',
		country: '',
		state: '',
		phone: '',
		zipcode: '',
		isOk:false
	}

	render() {
		var setInfo = this.props.setInfo;
		const submitForm=()=> {
			if (this.state.email === '' || this.state.firstName === '' || this.state.lastName === '' || this.state.address === '' || this.state.city === '' || this.state.country === '' || this.state.state === '' || this.state.zipcode === '' || this.state.phone === '') {
				this.setState({isOk: false})
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Điền đầy đủ tất cả thông tin trước khi tiếp tục tiến hành thanh toán!',
				})
			} else {
				this.setState({isOk: true})
				setInfo(this.state)
			}
		}
		return (
			<Form className="container-fluid contact-info-container">
				<h2 className="mb-3">Contact Information</h2>
				<Toggle>
					{({ on, off, toggle }) => (
						<div className="toggle-container">
							{on && <div>
								<Alert color="success">You contact info has been saved.</Alert>
								<div className="button-right">
									<Button onClick={toggle} color="secondary">Edit</Button>
								</div>
							</div>}
							{off && <div>
								<FormGroup>
									<Input onChange={(e) => { this.setState({ email: e.target.value }) }} type="email" name="email" id="coContactEmail" placeholder={this.state.email} />
								</FormGroup>
								<Row form>
									<Col md={6}>
										<FormGroup>
											<Input onChange={(e) => { this.setState({ firstName: e.target.value }) }} type="text" name="firstName" id="coFirstName" placeholder="First name" />
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Input onChange={(e) => { this.setState({ lastName: e.target.value }) }} type="text" name="lastName" id="coLastName" placeholder={this.state.lastName} />
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input onChange={(e) => { this.setState({ address: e.target.value }) }} type="text" name="address" id="coAddress" placeholder="Address" />
								</FormGroup>
								<FormGroup>
									<Toggle>
										{({ on, off, toggle }) => (
											<div className="toggle-container address2-text">
												{on && <Input onChange={(e) => { this.setState({ address2: e.target.value }) }} type="text" name="address2" id="coAddress2" placeholder="Apartment, suite, etc. (optional)" />}
												{off && <div onClick={toggle}><p className="p-xs"><img className="toggle-ico" src={PlusIcon} alt="expand icon" /> Add Address line 2</p></div>}
											</div>
										)}
									</Toggle>
								</FormGroup>
								<FormGroup>
									<Input onChange={(e) => { this.setState({ city: e.target.value }) }} type="text" name="city" id="coCity" placeholder="City" />
								</FormGroup>
								<Row form>
									<Col md={5}>
										<FormGroup className="dropdown-container">
											<Label for="coCountry">Country</Label>
											<CountryOptions handleSetCountry={this.handleSetCountry.bind(this)} />
										</FormGroup>
									</Col>
									<Col md={4}>
										<FormGroup className="dropdown-container">
											<Label for="coState">State</Label>
											<StateOptions handleSetState={this.handleSetState.bind(this)} />
										</FormGroup>
									</Col>
									<Col md={3}>
										<FormGroup>
											<Label for="coZip">Zip</Label>
											<Input onChange={(e) => { this.setState({ zipcode: e.target.value }) }} className="zip-input" type="text" name="zipcode" id="coZipCode" placeholder="ZIP Code" />
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input onChange={(e) => { this.setState({ phone: e.target.value }) }} type="phone" name="phone" id="coPhone" placeholder="Phone (For Shipping Updates)" />
								</FormGroup>
								<div   className="button-right">
									<Button onMouseDown={()=> this.setState({ isOk: true})} onClick={submitForm} color="primary">Continute</Button>
								</div>
							</div>}
						</div>
					)}
				</Toggle>
			</Form>
		);
	}

}
function mapStateToProps(state) {

	return { currentUser: state.user.currentUser }
}

export default connect(mapStateToProps)(FormContactInfo)
