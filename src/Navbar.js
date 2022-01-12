import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            func: props.func,
        }
        this.test = this.test.bind(this)
    }

    test() {
        this.state.func()
    }

    render() {
        return (
            <div className="navbar">
                <div className="nav-item title" onClick={this.test}>Dota 2 App</div>
            </div>
        );
    }
}

export default Navbar;