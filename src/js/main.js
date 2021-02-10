"use strict";

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 
const formElement = document.querySelector('.js-form');
const ulSeriesList = document.querySelector('.js-seriesList');
const favListElement = document.querySelector('.js-favList');
const resetElement = document.querySelector('.js-reset');

// series list and favourite series list
let seriesList=[];
let favouriteSeries=[];

// Get series from API and access the date we need

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

    const defaultImg = "./assets/images/default.png";;
    let htmlCode="";

// if it is in favourites, it adds a class to the li, so I can give it a different background colour; if it is not, it does not add it.

    for (const eachItem of seriesList) {
        let favClass;
        if (isFavSeries(eachItem)) {
            favClass ="favourite";
        }else{
            favClass="";
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

// test if the series I receive on the parameter is in the favourite list by linking clicked "li" id in main series list to the "li" id in favourite series list


function isFavSeries(eachItem) {

    const favouriteFound = favouriteSeries.find(x => {
        return x.id === eachItem.id;
    });
    // if not found with "find", it returns undefined.

    if (favouriteFound !== undefined) {
        return true;
    }else{
        
        return false;
    } 
}

// listen to the event on each card on the main series list

function listenToCardsEvent(){
const cardElements = document.querySelectorAll('.js-series');

    for (const card of cardElements) {

    card.addEventListener('click', handleCard);
    };
}

// check if the clicked card (id) on the main list is in favourites array or not. If it is not, push it, if it is, remove it.

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
    const defaultImg = "./assets/images/default.png";

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
        htmlCode += `<button class="js-remove" id ="${eachItem.id}">X</button>`;
    
    }
    favListElement.innerHTML= htmlCode;
    listenToRemoveButtons();
}
// listen to individual remove buttons
function listenToRemoveButtons() {
    const removeButtons = document.querySelectorAll ('.js-remove');
    
    for (const removeButton of removeButtons) {
        removeButton.addEventListener('click', handleRemove);
    }
}
// link clicked element id to id of favourite series array; then remove the clicked element

function handleRemove(ev) {
    console.log(favouriteSeries);
    const clickedRemoveId = parseInt(ev.currentTarget.id);
    const favData= favouriteSeries.findIndex(series => series.id === clickedRemoveId);
    if (favData !== -1) {
        favouriteSeries.splice(favData,1);
    } 
    console.log(clickedRemoveId);
    
    
    console.log(favouriteSeries);
    renderFavourites();
    setInLocalStorage();
    renderSeries();
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