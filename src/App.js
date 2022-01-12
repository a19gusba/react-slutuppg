import React from 'react'
import './App.css';
import Navbar from './Navbar';
import Heroes from './Heroes';
import Favourites from './Favourites';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: props.heroes,
      favourites: props.favourites,
    }
    this.getData = this.getData.bind(this)
    this.getData()
  }

  update() {
    this.forceUpdate();
  }

  async getData() {
    // Promise Heroes
    let pHeroes = new Promise(async (resolve, reject) => {
      await fetch("http://localhost:5000/heroes", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json()).then(data => {
          resolve(data)
        });
    })

    // Promise Favourite Heroes
    let pFavourites = new Promise(async (resolve, reject) => {
      await fetch("http://localhost:5000/favourites", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json()).then(data => {
          resolve(data)
        });
    })

    Promise.all([pHeroes, pFavourites])
      .then((data) => {
        this.setState({ heroes: data[0], favourites: data[1] })
        this.update()
      })
  }

  render() {
    return (
      <div className='app'>
        <Navbar key={uuidv4()} func={this.getData}></Navbar>
        <Heroes key={uuidv4()} heroes={this.state.heroes} update={this.getData}></Heroes>
        <Favourites key={uuidv4()} heroes={this.state.favourites} update={this.getData}></Favourites>
      </div>
    );
  }
}

export default App;
