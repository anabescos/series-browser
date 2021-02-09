"use strict";

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 
const formElement = document.querySelector('.js-form');
const ulSeriesList = document.querySelector('.js-seriesList');
const favListElement = document.querySelector('.js-favList');

let seriesList=[];
let favouriteSeries=[];

// Get series from API
function getDataFromApi() {
    const inputValue = inputElement.value
   
    fetch (`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then (response => response.json())
    .then (data => {
        seriesList = [];
        for (let index = 0; index < data.length; index++) {
            
            const series = data[index].show;
            seriesList.push(series);
           
            
        }
        renderSeries();
    });
    
}
buttonElement.addEventListener('click', getDataFromApi);


function handleForm(ev){
    ev.preventDefault();
    
}

formElement.addEventListener('submit', handleForm);

// paint series list


function renderSeries() {
    const defaultImg = "../assets/images/download (1).png";
    let htmlCode="";

    for (const eachItem of seriesList) {
        htmlCode += `<li class='js-series'id="${eachItem.id}">`;
        htmlCode += `<h2 class='js-seriesTitle''>${eachItem.name}</h2>`;  
        const seriesImg = eachItem.image;
        
        if (seriesImg === null) {
            htmlCode +=`<img class="sectionSeries__list--img" src="${defaultImg}">`
        } else {
            htmlCode += `<img class="sectionSeries__list--img" src=${seriesImg.medium}>`
        }
        htmlCode += "</li>";
        
    }

    
    ulSeriesList.innerHTML= htmlCode;
    listenToCardsEvent();
}

// listen to the event on each card

function listenToCardsEvent(){
const cardElements = document.querySelectorAll('.js-series');

    for (let card of cardElements) {

    card.addEventListener('click', handleCard);
    };
}
// send clicked series to favourite list array

function handleCard(ev) {
    const currentT = ev.currentTarget;
    favouriteSeries.push(currentT.id);
    console.log(currentT.id);
    console.log(favouriteSeries);
    renderFavourites();
}
// paint list with favourite movies
function renderFavourites() {
    
    let htmlCode = "";
    for (const eachItem of favouriteSeries) {
        htmlCode += `<li class='js-favSeries'id="${eachItem}">${eachItem}`;
        htmlCode += "</li>";
         
    }

    favListElement.innerHTML= htmlCode;
}