import React from "react";
import {Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";

/**
 * Component to show menu with all dishes
 */
function RenderMenuItem({dishItem, onClick}) {
    return (
        <Card onClick={() => onClick(dishItem.id)}>
            <CardImg width="100%" src={dishItem.image} alt={dishItem.name}/>
            <CardImgOverlay>
                <CardTitle>{dishItem.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

/**
 * This method is lifecycle hook which renders all the dishes
 * @returns {*}
 */
const MenuComponent = (props) => {
    let menu = props.dishes.map((dishItem) => {
        return (
            <div key={dishItem.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dishItem={dishItem} onClick={props.onClick}></RenderMenuItem>
            </div>
        )
    });
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    );
};


export default MenuComponent;