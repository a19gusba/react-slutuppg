import React from 'react';
import "./Hero.css"
import ReactTooltip from 'react-tooltip';

class Hero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            isFavourite: props.data.isFavourite,
            update: props.update,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    getHeroName(name) {
        var heroName = name.replace("npc_dota_hero_", "");
        heroName = heroName.replace("_", " ")
        return this.capitalizeFirstLetter(heroName)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleClick() {
        var newValue = !this.state.isFavourite
        var url = `http://localhost:5000/patchFavourite/heroes/${this.state.data.id}/isFavourite/${newValue}`
        var url2 = `http://localhost:5000/addFavourite/${this.state.data.id}/${this.state.data.name}`
        const userAction = async () => {
            await fetch(url);
            this.setState({ isFavourite: newValue })
            await fetch(url2);
            this.state.update()
        }
        userAction()
    }

    render() {
        var favouriteClass = (this.state.isFavourite) ? "favourite" : ""
        var starClass = (this.state.isFavourite) ? "star" : ""
        return (
            <>
                <ReactTooltip />
                <div data-tip={this.getHeroName(this.state.data.name)} onClick={this.handleClick} className={"border " + favouriteClass}>
                    <img className="hero-img" src={this.state.data.img} alt=""></img>
                    <div className={starClass}></div>
                </div>
            </>
        );
    }
}

export default Hero