import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Col, Input, Button, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class ContactComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                phone: false,
                email: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    /**
     * This method is called when user submits the form
     * @param event
     */
    handleSubmit(event) {
        event.preventDefault();
        alert('Data after submit' + JSON.stringify(this.state));
    }

    /**
     * This method handles the input field values and assigns it to the field variable key
     * @param event
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * This method manages whether field has been attempted to change by the user
     * @param field
     * @returns {function(...[*]=)}
     */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    /**
     * This method validates the input fields and creates error object
     * @param firstName
     * @param lastName
     * @param phone
     * @param email
     * @returns {{firstName: string, lastName: string, phone: string, email: string}}
     */
    validate(firstName, lastName, phone, email) {
        const errors = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        };
        const phoneRegex = /^\d+$/;
        if (this.state.touched.firstName && firstName.length <= 3)
            errors.firstName = 'First name should be <= 3 characters.';
        else if (this.state.touched.firstName && firstName.length >= 10)
            errors.firstName = 'First name should be >= 10 characters.';
        if (this.state.touched.lastName && lastName.length <= 3)
            errors.lastName = 'LastName name should be >= 3 characters.';
        else if (this.state.touched.lastName && lastName.length >= 10)
            errors.lastName = 'Last name should be >= 10 characters.';
        if (this.state.touched.phone && !phoneRegex.test(phone))
            errors.phone = 'Phone numbers should only contain digits.';
        if (this.state.touched.email && email.split('').filter(e => e === '@').length !== 1)
            errors.email = 'Email should have @.';
        if (this.state.touched.email &&
            (email.substring(email.lastIndexOf('@') + 1).length <= 1 ||
                email.substring(email.lastIndexOf('.') + 1).length < 2 ||
                email.indexOf('.') < 0 ||
                email.substring(0, email.indexOf('@')).length < 2))
            errors.email = errors.email + ' Email should have proper domain';
        return errors;
    }

    /**
     * This method renders the view on UI
     * @returns {*}
     */
    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phone, this.state.email);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br/>
                            Clear Water Bay, Kowloon<br/>
                            HONG KONG<br/>
                            <i className="fa fa-phone"></i>: +852 1234 5678<br/>
                            <i className="fa fa-fax"></i>: +852 8765 4321<br/>
                            <i className="fa fa-envelope"></i>: <a
                            href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i
                                className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i
                                className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text"
                                           id="firstName"
                                           name="firstName"
                                           value={this.state.firstName}
                                           onChange={this.handleInputChange}
                                           onBlur={this.handleBlur('firstName')}
                                           valid={errors.firstName === ''}
                                           invalid={errors.firstName !== ''}
                                           placeholder="First Name"/>
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text"
                                           id="lastName"
                                           name="lastName"
                                           value={this.state.lastName}
                                           onChange={this.handleInputChange}
                                           onBlur={this.handleBlur('lastName')}
                                           valid={errors.lastName === ''}
                                           invalid={errors.lastName !== ''}
                                           placeholder="Last Name"/>
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phone" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phone" name="phone"
                                           placeholder="Tel. number"
                                           value={this.state.phone}
                                           onBlur={this.handleBlur('phone')}
                                           valid={errors.phone === ''}
                                           invalid={errors.phone !== ''}
                                           onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.phone}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                           placeholder="Email"
                                           value={this.state.email}
                                           onBlur={this.handleBlur('email')}
                                           valid={errors.email === ''}
                                           invalid={errors.email !== ''}
                                           onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                   name="agree"
                                                   checked={this.state.agree}
                                                   onChange={this.handleInputChange}/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                           value={this.state.contactType}
                                           onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                           rows="12"
                                           value={this.state.message}
                                           onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default ContactComponent;