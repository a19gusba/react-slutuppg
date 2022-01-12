import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


async function getData() {
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
      ReactDOM.render(
        <React.StrictMode>
          <App heroes={data[0]} favourites={data[1]} />
        </React.StrictMode>,
        document.getElementById('root')
      );
    })
}
getData()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
