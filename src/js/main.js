'use strict';

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 
const inputValue = inputElement.value
let series=[];

// Get series from API
function getDataFromApi() {
    fetch (`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then (response => response.json())
    .then (data => {
        for (let index = 0; index < data.length; index++) {
            
            series = data[index].show;
        }
    });
    
}

buttonElement.addEventListener('click', getDataFromApi);