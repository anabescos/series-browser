'use strict';

const inputElement =document.querySelector ('.js-input');
const buttonElement = document.querySelector ('.js-button'); 

let series=[];

fetch ('http://api.tvmaze.com/search/shows?q=girls')
.then (response => response.json())
.then (data => {
    for (let index = 0; index < data.length; index++) {
        
        series=data[index].show;
        console.log(series);
        
    }
});