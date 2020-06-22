import React, {Component} from "react";
import {Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";
import DishDetail from "./DishdetailComponent";

/**
 * Component to show menu with all dishes
 */
class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    /**
     * This method assigns value to the selectedDish state
     * @param dish: Dish selected by the user
     */
    onDishSelected(dish) {
        this.setState({selectedDish: dish});
    }

    /**
     * This method is lifecycle hook which renders all the dishes
     * @returns {*}
     */
    render() {
        let menu = this.props.dishes.map((dishItem) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dishItem.id} onClick={() => this.onDishSelected(dishItem)}>
                        <CardImg width="100%" src={dishItem.image} alt={dishItem.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dishItem.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {/*Calling DishDetail component which will render the selected dish view*/}
                <DishDetail dish={this.state.selectedDish}/>
            </div>
        );
    }
}

export default MenuComponent;