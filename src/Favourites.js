import React from 'react';
import CreateFavourites from './CreateFavourites';
import "./Favourites.css"

class Favourites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            heroes: props.heroes,
            update: props.update,
        }
    }

    render() {
        return (
            <div className="favourites-wrapper">
                <h1 className="favourites-header">Favourite heroes ({this.state.heroes.length})</h1>
                <h2 className="favourites-header">View/edit your selected favourite heroes</h2>
                <CreateFavourites heroes={this.state.heroes} update={this.state.update}></CreateFavourites>
            </div>
        );
    }
}

export default Favourites;