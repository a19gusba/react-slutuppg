import React from 'react';
import CreateHeroes from './CreateHeroes';
import "./Heroes.css"

class Heroes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            heroes: props.heroes,
            update: props.update
        }
    }

    render() {
        return (
            <div className="heroes-wrapper">
                <h1 className="heroes-header">Heroes ({this.state.heroes.length})</h1>
                <h2 className="heroes-header">Click on a hero to add/remove it from favourites</h2>
                <CreateHeroes heroes={this.state.heroes} update={this.state.update}></CreateHeroes>
            </div>
        );
    }
}

export default Heroes