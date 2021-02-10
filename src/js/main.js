"use strict";

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 
const formElement = document.querySelector('.js-form');
const ulSeriesList = document.querySelector('.js-seriesList');
const favListElement = document.querySelector('.js-favList');
const resetElement = document.querySelector('.js-reset');


let seriesList=[];
let favouriteSeries=[];

// Get series from API
function getDataFromApi() {
    getFromLocalStorage ();
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

// prevent the form from refreshing and sending data
function handleForm(ev){
    ev.preventDefault();
    
}

formElement.addEventListener('submit', handleForm);

// paint main series list


function renderSeries() {
    const defaultImg = "../assets/images/download (1).png";
    let htmlCode="";
// test whether the clicked series exists in the favourite series list
    for (const eachItem of seriesList) {
        let favClass;
        if (isFavSeries(eachItem)) {
            favClass ="favourite";
            console.log('found a favourite');
        }else{
            favClass="";
            console.log('found a not favourite');
        }
        htmlCode += `<li class='js-series ${favClass}' id="${eachItem.id}">`;
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
// test whether the clicked series exists in the favourite series list
function isFavSeries(eachItem) {
    const favouriteFound = favouriteSeries.find(x => {
        return x.id === eachItem.id;
    });
    
    if (favouriteFound !== undefined) {
        return true;
    }else{
        console.log(eachItem.id);
        return false;
    } 
}

// listen to the event on each card

function listenToCardsEvent(){
const cardElements = document.querySelectorAll('.js-series');

    for (const card of cardElements) {

    card.addEventListener('click', handleCard);
    };
}
// send clicked series to favourite list array

function handleCard(ev) {
    const clickedSeriesId = parseInt(ev.currentTarget.id);
    const seriesData = seriesList.find(series => series.id === clickedSeriesId);
    const favData= favouriteSeries.findIndex(series => series.id === clickedSeriesId);
    

    if (favData === -1) {
        favouriteSeries.push(seriesData);
    } else{
        favouriteSeries.splice(favData, 1);
    }
    setInLocalStorage();
    renderFavourites();
    renderSeries();
}

// paint list with favourite movies
function renderFavourites() {
    
    let htmlCode = "";
    const defaultImg = "./assets/images/download.png";

    for (const eachItem of favouriteSeries) {
        htmlCode += `<li class='js-fav'id="${eachItem.id}">`;
        htmlCode += `<h2 class='js-favTitle''>${eachItem.name}</h2>`;  
        const seriesImg = eachItem.image;
        
        if (seriesImg === null) {
            htmlCode +=`<img class="sectionFav__list--img" src="${defaultImg}">`
        } else {
            htmlCode += `<img class="sectionFav__list--img" src=${seriesImg.medium}>`
        }
        htmlCode += "</li>";
        htmlCode += '<button class="js-remove">X</button>';
    
    }
    favListElement.innerHTML= htmlCode;
}

 

// set favourite series into my local storage
function setInLocalStorage() {
    const stringfav =JSON.stringify(favouriteSeries);
    localStorage.setItem('favouriteSeries', stringfav);
}

// get information of favourite series from my local storage
function getFromLocalStorage (){
    const localStorageFav = localStorage.getItem('favouriteSeries');
    if (localStorageFav !== null) {
        const arraySeries = JSON.parse(localStorageFav);
        favouriteSeries = arraySeries;
        renderFavourites();
    }
}

// Reset button to delete favourite list 

function resetButton() {
    localStorage.clear('favouriteSeries');
    favouriteSeries=[];
    renderFavourites();
 }
 resetElement.addEventListener('click', resetButton);
 
 getFromLocalStorage ();