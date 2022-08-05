"use strict"


function docOnReady(event){
    fetchData('./data.json');
    checkForOccurence();
    //const CheckList = document.getElementById("Fishing");
    const CheckList = document.getElementsByClassName("Fishing");
    const htmlDoc = document.querySelector("Fishing");
    for (const item of CheckList) {
      item.addEventListener("pointerover", showData.bind(item));
    }
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
          if(value === 'dataType') continue;
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
  return 
}

function buttonClose(){
    const btn = document.getElementById('close');
    btn.addEventListener("click", hideData);
}

function showData(){
    const box = document.getElementById('CheckList');
    box.style.visibility = 'visible';
    console.log(this.id);
    checkForOccurence(this.id);
}

function hideData(){
    const box = document.getElementById('CheckList');
    const myList = document.querySelector('ul');
    
    box.style.visibility = 'hidden';
}

async function getTypes(){
  let typesArray = new Set();
  let fetchRequest = await fetch('./data.json');
  let dataArray = await fetchRequest.json();
  for(const item in dataArray)
    typesArray.add(item);
  return typesArray;
}

async function checkForOccurence(id){
  let myArray = await getTypes();
  console.log(myArray);
  console.log(myArray.has(id))
}

window.addEventListener("DOMContentLoaded",docOnReady);
