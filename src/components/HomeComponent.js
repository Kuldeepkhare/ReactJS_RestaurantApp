import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {LoadingComponent} from "./LoadingComponent";
import {baseURL} from "../shared/baseURL";
import {FadeTransform} from 'react-animation-components';

/**
 * This method renders tge card with some information
 * @param item
 * @param isLoading
 * @param errorMessage
 * @returns {*}
 * @constructor
 */
function RenderCard({item, isLoading, errorMessage}) {
    // display loader incase content is still loading
    if (isLoading) {
        return (
            <LoadingComponent/>
        );
    } else if (errorMessage) {
        // display error message incase content failed to load
        return (
            <h4>{errorMessage}</h4>
        );
    } else
        return (
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card>
                    <CardImg src={baseURL + item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

/**
 * This component is the Home Component which is home page
 * @param props
 * @returns {*}
 * @constructor
 */
function HomeComponent(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                                isLoading={props.dishLoading}
                                errorMessage={props.dishError}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                                isLoading={props.promoLoading}
                                errorMessage={props.promoErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                                isLoading={props.leaderLoading}
                                errorMessage={props.leaderError}/>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;