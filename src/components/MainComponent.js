import React, {Component} from 'react';
import {DISHES} from '../shared/dishes';
import {PROMOTIONS} from "../shared/promotions";
import {COMMENTS} from "../shared/comments";
import {LEADERS} from "../shared/leaders";
import MenuComponent from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import {Switch, Route, Redirect} from 'react-router-dom';
import HomeComponent from "./HomeComponent";
import ContactComponent from "./ContactComponent";
import AboutComponent from './AboutComponent';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }

    render() {
        /**
         * This method renders the Home component
         * @returns {*}
         * @constructor
         */
        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.state.dishes.find(dish => dish.featured)}
                    promotion={this.state.promotions.find(promo => promo.featured)}
                    leader={this.state.leaders.find(leader => leader.featured)}
                />
            );
        }
        /**
         * This method renders the dishDetail component when specific dish is chosen
         * @param match: route parameter
         * @returns {*}
         * @constructor
         */
        const DishWithId = ({match}) => {
            return (
                <DishDetail
                    dish={this.state.dishes.find(dish => dish.id === parseInt(match.params.dishId, 10))}
                    comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            )
        }
        return (
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={() => <MenuComponent dishes={this.state.dishes}/>}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/contactus' component={ContactComponent}/>
                    <Route exact path='/aboutus' component={() => <AboutComponent leaders={this.state.leaders}/>}/>
                    <Route to='/home'/>
                </Switch>
                <FooterComponent/>
            </div>
        );
    }
}

export default MainComponent;
