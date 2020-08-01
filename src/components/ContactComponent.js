import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Label, Col, Button, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Errors, Form} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

/**
 * This component is responsible for displaying contact details and feedback form
 */
class ContactComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * This method is called when user submits the form
     * @param values
     */
    handleSubmit(values) {
        console.log('Data after submit' + JSON.stringify(values));
        this.props.resetFeedbackForm();
        this.props.postFeedback(values);
    }

    /**
     * This method renders the view on UI
     * @returns {*}
     */
    render() {
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
                            <i className="fa fa-phone"/>: +852 1234 5678<br/>
                            <i className="fa fa-fax"/>: +852 8765 4321<br/>
                            <i className="fa fa-envelope"/>: <a
                            href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678">
                                <i className="fa fa-phone"/> Call</a>
                            <a role="button" className="btn btn-info">
                                <i className="fa fa-skype"/> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i
                                className="fa fa-envelope-o"/> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName"
                                                  id="firstName"
                                                  name="firstName"
                                                  className="form-control"
                                                  placeholder="First Name"
                                                  validators={{
                                                      required,
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15)
                                                  }}/>
                                    <Errors model=".firstName"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName"
                                                  id="lastName"
                                                  name="lastName"
                                                  className="form-control"
                                                  placeholder="Last Name"
                                                  validators={{
                                                      required,
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15)
                                                  }}/>
                                    <Errors model=".lastName"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phone" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".phone" id="phone" name="phone"
                                                  placeholder="Tel. number"
                                                  className="form-control"
                                                  validators={{
                                                      required,
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15),
                                                      isNumber
                                                  }}/>
                                    <Errors model=".phone"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less',
                                                isNumber: 'Must be a number'
                                            }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                                  placeholder="Email"
                                                  className="form-control"
                                                  validators={{
                                                      required,
                                                      validEmail
                                                  }}/>
                                    <Errors model=".email"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                validEmail: 'Invalid email address'
                                            }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree"
                                                              name="agree"
                                                              className="form-check-input"/>
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                                    className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message"
                                                      id="message"
                                                      name="message"
                                                      rows="12"
                                                      className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactComponent;