import React, {Component} from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader, ModalBody, Row, Label
} from "reactstrap";
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";
import {LoadingComponent} from './LoadingComponent';
import {baseURL} from "../shared/baseURL";

/**
 * All the required form validation method definition
 */
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

/**
 * CommentFormComponent: component that displays Submit comment button along with popup and validations
 */
class CommentFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    /**
     * This method toggles the state of isModalOpen
     */
    handleToggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    /**
     * This method is called when user clicks on the submit button
     * @param values: values entered in the form
     */
    submitComment(values) {
        console.log('Data after submit' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        //alert('Data after submit' + JSON.stringify(values));
        this.handleToggleModal();
    }

    /**
     * This method renders the Submit Button along with popup
     * @returns {*}
     */
    render() {
        return (
            <React.Fragment>
                <Button outline color="secondary"
                        className="fa fa-pencil"
                        onClick={this.handleToggleModal}> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleToggleModal}>
                    <ModalHeader toggle={this.handleToggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="container" onSubmit={(values) => this.submitComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating"
                                                name="rating"
                                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author"
                                              id="author"
                                              className="form-control"
                                              validators={{
                                                  required,
                                                  minLength: minLength(3),
                                                  maxLength: maxLength(15)
                                              }}/>
                                <Errors model=".author"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment"
                                                  className="form-control"
                                                  id="comment"
                                                  name="comment"
                                                  rows="6">
                                </Control.textarea>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

/**
 * This method renders the comment section
 * @param comments: receives comment array of the dish
 * @returns {*}
 */
function RenderComments({comments, postComment, dishId}) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((commentDetails) => {
                        if (commentDetails != null)
                            return (
                                <div key={commentDetails.id}>
                                    <li>
                                        <p>{commentDetails.comment}</p>
                                        {/*Displaying author name with date in format*/}
                                        <p>-- {commentDetails.author} , {moment(commentDetails.date).format('MMM DD, YYYY')}</p>
                                    </li>
                                </div>
                            );
                        else
                            return (
                                <div></div>
                            );
                    })};
                </ul>
                <CommentFormComponent dishId={dishId} postComment={postComment}/>
            </div>
        );
    else
        return (
            <div>
                <CommentFormComponent/>
            </div>
        );
}

/**
 * This method returns the dish with comments
 * @param dish: receives dish object to be rendered
 * @returns {*}
 */
function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={baseURL + dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

/**
 * Lifecycle hook method that renders this component
 * @returns {*}
 */
function DishDetail(props) {
    let dish = props.dish;
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <LoadingComponent/>
                </div>
            </div>
        );
    } else if (props.errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}></RenderDish>
                    </div>
                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}></RenderComments>
                </div>
            </div>
        );
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;