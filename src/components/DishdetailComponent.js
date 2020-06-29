import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import * as moment from 'moment';
import {Link} from 'react-router-dom';

/**
 * This method renders the comment section
 * @param comments: receives comment array of the dish
 * @returns {*}
 */
function RenderComments({comments}) {
    if (comments != null)
        return (
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
        );
    else
        return (
            <div></div>
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
            <CardImg top src={dish.image} alt={dish.name}/>
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
    if (dish != null)
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
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}></RenderComments>
                    </div>
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