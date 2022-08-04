"use strict"


function docOnReady(event){
    console.log(event);
    loadNames();
    fetchData('./data.json');
}

async function fetchData(url){
    console.log("fafsasfas");
    let response = await fetch(url);
    let mydata = await response.json();
    console.log(response);
    for(let key in mydata){
      console.log(mydata[key]);
    }
}

async function loadNames() {
    const response = await fetch('./data.json');
    const names = await response.json();
    console.log(names); 
}

window.addEventListener("DOMContentLoaded",docOnReady);