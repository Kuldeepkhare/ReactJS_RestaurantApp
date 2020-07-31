import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {LoadingComponent} from "./LoadingComponent";
import {baseURL} from "../shared/baseURL";
import {FadeTransform} from 'react-animation-components';

function RenderCard({item, isLoading, errorMessage}) {
    if (isLoading) {
        return (
            <LoadingComponent/>
        );
    } else if (errorMessage) {
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
                    <RenderCard item={props.leader}/>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;