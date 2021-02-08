"use strict";

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 
const inputValue = inputElement.value
const ulSeriesList = document.querySelector('.js-seriesList');
let seriesList=[];

// Get series from API
function getDataFromApi(ev) {
    ev.preventDefault();
    fetch (`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then (response => response.json())
    .then (data => {
        for (let index = 0; index < data.length; index++) {
            
            const series = data[index].show;
            seriesList.push(series);
            
        }
        renderSeries();
    });
    console.log(seriesList);
    
}

buttonElement.addEventListener('click', getDataFromApi);

// paint series list


function renderSeries() {
    const defaultImg = "../assets/images/download (1).png";
    let htmlCode="";

    for (const eachItem of seriesList) {
        htmlCode += `<li class='js-series'id="${eachItem.id}">`;
        htmlCode += `<h2 class='js-seriesTitle''>${eachItem.name}</h2>`;  
        const seriesImg = eachItem.image;
        console.log(seriesImg);
        if (seriesImg === null) {
            htmlCode +=`<img class="sectionSeries__list--img" src="${defaultImg}">`
        } else {
            htmlCode += `<img class="sectionSeries__list--img" src=${seriesImg.medium}>`
        }
        htmlCode += "</li>";
    }

    
    ulSeriesList.innerHTML= htmlCode;
}

// 
