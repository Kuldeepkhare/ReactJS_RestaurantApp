import React from "react";
import {Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";
import {Link} from 'react-router-dom';
import {LoadingComponent} from "./LoadingComponent";

/**
 * Component to show menu with all dishes
 */
function RenderMenuItem({dishItem}) {
    return (
        <Card>
            <Link to={`/menu/${dishItem.id}`}>
                <CardImg width="100%" src={dishItem.image} alt={dishItem.name}/>
                <CardImgOverlay>
                    <CardTitle>{dishItem.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

/**
 * This method is lifecycle hook which renders all the dishes
 * @returns {*}
 */
const MenuComponent = (props) => {
    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <LoadingComponent/>
                </div>
            </div>
        );
    } else if (props.dishes.errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.dishes.errorMessage}</h4>
                    </div>
                </div>
            </div>
        );
    }
    let menu = props.dishes.dishes.map((dishItem) => {
        return (
            <div key={dishItem.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dishItem={dishItem}></RenderMenuItem>
            </div>
        )
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {menu}
            </div>
        </div>
    );
};


export default MenuComponent;