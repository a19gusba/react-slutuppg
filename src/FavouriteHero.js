import React from 'react';
import "./FavouriteHero.css"

class FavouriteHero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            update: props.update
        }
        this.updateComment = this.updateComment.bind(this)
        this.removeFavourite = this.removeFavourite.bind(this)
    }

    handleClick() {

    }

    updateComment() {
        var date = new Date().toLocaleString()
        let value = document.querySelector("#area-" + this.state.data.id).value
        var url = `http://localhost:5000/patchFavourite/favourites/${this.state.data.id}/comment/${value}`
        var url2 = `http://localhost:5000/patchFavourite/favourites/${this.state.data.id}/last_updated/${date}`
        const userAction = async () => {
            await fetch(url);
            await fetch(url2);
        }
        userAction()
    }

    removeFavourite() {
        var url = `http://localhost:5000/addFavourite/${this.state.data.id}/${this.state.data.name}`
        var url2 = `http://localhost:5000/patchFavourite/heroes/${this.state.data.id}/isFavourite/false`
        const userAction = async () => {
            await fetch(url);
            await fetch(url2);
            this.state.update();
        }
        userAction()
    }

    getHeroName(name) {
        var heroName = name.replace("npc_dota_hero_", "");
        heroName = heroName.replace("_", " ")
        return this.capitalizeFirstLetter(heroName)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div className="favourite-hero-card">
                <img className="card-img" src={this.state.data.img} alt=""></img>
                <div className="favourite-info">
                    <h3 className="hero-name">{this.getHeroName(this.state.data.name)}</h3>
                </div>
                <div className="favourite-info">
                    <div className="textarea-wrapper">
                        <div className="bold">Comment: </div>
                        <textarea name="" className="favourite-comment" id={"area-" + this.state.data.id} defaultValue={this.state.data.comment}></textarea>
                    </div>
                    <div onClick={this.updateComment} className="favourite-btn update-comment-btn">Update comment</div>
                </div>
                <div className="favourite-info">
                    <div>
                        <span className="favourite-date">Added: {this.state.data.date}</span>
                    </div>
                    <div>
                        <span className="favourite-date">Last updated: {this.state.data.last_updated}</span>
                    </div>
                </div>
                <div className="fill">
                    <div onClick={this.removeFavourite} className="favourite-btn remove-favourite-btn">{`Remove ${this.getHeroName(this.state.data.name)} from favourites`}</div>
                </div>
            </div>
        );
    }
}

export default FavouriteHero;
