import React, {Component} from 'react';
import MainComponent from "./components/MainComponent";

class App extends Component {

    componentDidMount() {
        console.log('data is in App---- componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('data is in App---- componentDidUpdate');
    }

    render() {
        console.log('data is in App------- render');
        return (
            <div>
                <MainComponent/>
            </div>
        );
    }
}

export default App;
