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
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from "../redux/actionCreators";
import {actions} from "react-redux-form";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

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

/**
 * This method maps the dispatch with props
 * @param dispatch
 * @returns {{resetFeedbackForm: resetFeedbackForm, fetchLeaders: (function(): *), postComment: (function(*=, *=, *=, *=): *), postFeedback: (function(*=): *), fetchPromos: (function(): *), fetchDishes: fetchDishes, fetchComments: (function(): *)}}
 */
const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'))
    }
});

/**
 * Main Component method
 */
class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
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
                    dish={this.props.dishes.dishes.find(dish => dish.featured)}
                    dishLoading={this.props.dishes.isLoading}
                    dishError={this.props.dishes.errorMessage}
                    promotion={this.props.promotions.promotions.find(promo => promo.featured)}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errorMessage}
                    leader={this.props.leaders.leaders.find(leader => leader.featured)}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderError={this.props.leaders.errorMessage}
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
                    dish={this.props.dishes.dishes.find(dish => dish.id === parseInt(match.params.dishId, 10))}
                    isLoading={this.props.dishes.isLoading}
                    errorMessage={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errorMessage}
                    postComment={this.props.postComment}
                />
            )
        }
        return (
            <div>
                <HeaderComponent/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage}/>
                            <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes}/>}/>
                            <Route path='/menu/:dishId' component={DishWithId}/>
                            <Route exact path='/contactus'
                                   component={() => <ContactComponent
                                       resetFeedbackForm={this.props.resetFeedbackForm}
                                       postFeedback={this.props.postFeedback}/>}/>
                            <Route exact path='/aboutus'
                                   component={() => <AboutComponent leaders={this.props.leaders}/>}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <FooterComponent/>
            </div>
        );
    }
}

// connecting the MainComponent with store, passing the mapStateToProps
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
