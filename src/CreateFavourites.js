import React from 'react';
import FavouriteHero from './FavouriteHero';
import './CreateFavourites.css';
import { v4 as uuidv4 } from 'uuid';

class CreateFavourites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: props.heroes,
            update: props.update
        }
    }

    getHeroImg(heroOb) {
        var heroName = heroOb.name.replace("npc_dota_hero_", "");
        var imgUrl = `http://cdn.dota2.com/apps/dota2/images/heroes/${heroName}_full.png`;
        return imgUrl;
    }

    render() {
        return (
            <div className="favourite-heroes-container" >
                {
                    this.state.heroes.map(hero => {
                        hero["img"] = this.getHeroImg(hero)
                        return <FavouriteHero key={uuidv4()} data={hero} update={this.state.update}></FavouriteHero>
                    })
                }
            </div>
        );
    }
}

export default CreateFavourites;