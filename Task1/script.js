"use strict"


function docOnReady(event){
    fetchData('./data.json');
    const CheckList = document.getElementById("Fishing");
    CheckList.addEventListener("mouseover", showData);
    buttonClose();
}


async function fetchData(url){
    const myList = document.querySelector('ul');
    fetch(url)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
    .then((data) => {
    for (const item of data.items) {
        for(const value in item)
        {
          if(value === 'dataType')
           continue;
          const listItem = document.createElement('input');
          const label = document.createElement('label');
          const breakP = document.createElement('br');

          listItem.setAttribute("type", "checkbox");
          listItem.setAttribute("id", `${value}`);
    
          label.setAttribute('for',`${value} `)
          label.innerHTML = `${value}: ${item[value]}`;
          
          
          myList.appendChild(listItem);
          myList.appendChild(label);
          myList.appendChild(breakP);
        } 
    
    }
  }).catch(console.error);
    
    
}

function buttonClose(){
    const btn = document.getElementById('close');
    btn.addEventListener("click", hideData);
}

function showData(){
    const box = document.getElementById('CheckList');
    box.style.visibility = 'visible';
}

function hideData(){
    const box = document.getElementById('CheckList');
    box.style.visibility = 'hidden';
}


window.addEventListener("DOMContentLoaded",docOnReady);
