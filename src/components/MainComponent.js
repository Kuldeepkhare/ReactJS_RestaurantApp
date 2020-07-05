import React, {Component} from 'react';
import MenuComponent from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import HomeComponent from "./HomeComponent";
import ContactComponent from "./ContactComponent";
import AboutComponent from './AboutComponent';
import {connect} from "react-redux";

/**
 * This method maps the incoming state items to props of this component
 * @param state
 * @returns {{promotions: [{image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string}], comments: *, dishes: [{image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}, {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}, {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}, {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}], leaders: [{image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}, {image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}, {image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}, {image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}]}}
 */
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
}

class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * This method renders the Home component
     * @returns {*}
     * @constructor
     */
    render() {
        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.props.dishes.find(dish => dish.featured)}
                    promotion={this.props.promotions.find(promo => promo.featured)}
                    leader={this.props.leaders.find(leader => leader.featured)}
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
                    dish={this.props.dishes.find(dish => dish.id === parseInt(match.params.dishId, 10))}
                    comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            )
        }
        return (
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes}/>}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/contactus' component={ContactComponent}/>
                    <Route exact path='/aboutus' component={() => <AboutComponent leaders={this.props.leaders}/>}/>
                    <Redirect to='/home'/>
                </Switch>
                <FooterComponent/>
            </div>
        );
    }
}

// connecting the MainComponent with store, passing the mapStateToProps
export default withRouter(connect(mapStateToProps)(MainComponent));
