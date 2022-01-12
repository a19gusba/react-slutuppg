import React from 'react';
import Hero from './Hero';
import "./CreateHeroes.css"
import { v4 as uuidv4 } from 'uuid';

class CreateHeroes extends React.Component {
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
            <div className="heroes-container">
                {this.state.heroes.map(hero => {
                    var data = { img: this.getHeroImg(hero), id: hero.id, name: hero.name, isFavourite: hero.isFavourite }
                    return <Hero key={uuidv4()} data={data} update={this.state.update}></Hero>
                })}
            </div>
        );
    }
}

export default CreateHeroes;