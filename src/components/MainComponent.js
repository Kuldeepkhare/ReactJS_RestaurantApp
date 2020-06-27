import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {DISHES} from '../shared/dishes';
import MenuComponent from './MenuComponent';
import DishDetail from "./DishdetailComponent";

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    /**
     * This method assigns value to the selectedDish state
     * @param dish: Dish selected by the user
     */
    onDishSelected(dishId) {
        this.setState({selectedDish: dishId});
    }

    render() {
        return (
            <div>
                <Navbar dark color='primary'>
                    <div className="container">
                        <NavbarBrand href='/'>
                            Restaurant Confusion
                        </NavbarBrand>
                    </div>
                </Navbar>
                <MenuComponent dishes={this.state.dishes}
                               onClick={(dishId) => {
                                   this.onDishSelected(dishId)
                               }}/>
                <DishDetail dish={this.state.dishes.find((dish) => this.state.selectedDish === dish.id)}/>
            </div>
        );
    }
}

export default MainComponent;
