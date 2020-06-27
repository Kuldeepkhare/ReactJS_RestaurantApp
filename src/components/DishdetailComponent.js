import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import * as moment from 'moment';


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
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
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
                    <RenderDish dish={dish}></RenderDish>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={dish.comments}></RenderComments>
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