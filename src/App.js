import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import {DISHES} from './shared/dishes';
import MenuComponent from './components/MenuComponent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
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
                <MenuComponent dishes={this.state.dishes}/>
            </div>
        );
    }
}

export default App;
