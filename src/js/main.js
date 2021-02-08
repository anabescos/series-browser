"use strict";

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 
const formElement = document.querySelector('.js-form');
const ulSeriesList = document.querySelector('.js-seriesList');

let seriesList=[];
let favouriteSeries=[];

// Get series from API
function getDataFromApi() {
    const inputValue = inputElement.value
   
    fetch (`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then (response => response.json())
    .then (data => {
        for (let index = 0; index < data.length; index++) {
            
            const series = data[index].show;
            seriesList.push(series);
            
        }
        renderSeries();
    });
    
}
buttonElement.addEventListener('click', getDataFromApi);
// getDataFromApi();

// function handleButton(ev) {
//     ev.preventDefault();
//     console.log('filtrando');
// }
// buttonElement.addEventListener('click', handleButton);

// function handleForm(ev){
//     ev.preventDefault();
//     console.log('filtrando');
// }

// formElement.addEventListener('submit', handleForm);

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

// paint list with favourite movies

function listenToCardsEvent(){
const cardElements = document.querySelectorAll('.js-series');
    for (const card of cardElements) {
    card.addEventListener('click', handleCard);
    }
}

function handleCard() {
    console.log('holi');
}