"use strict"


function docOnReady(event){
    checkForOccurence();
    //const CheckList = document.getElementById("Fishing");
    const CheckList = document.getElementsByClassName("Fishing");
    const htmlDoc = document.querySelector("Fishing");
    for (const item of CheckList) {
      item.addEventListener("pointerover", showData.bind(item));
    }
    
}


async function fetchData(url, nameOfCategory){
    const myList = document.querySelector('ul');
    fetch(url)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
    .then((data) => {
    for (const item of data[nameOfCategory]) {
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
}

function clearData(list){
  list.innerHTML = '';
}

function buttonClose(){
    const btn = document.getElementById('close');
    btn.addEventListener("click", hideData);
}

async function showData(){
    const box = document.getElementById('CheckList');
    box.style.visibility = 'visible';
    console.log(this.id );
    if(checkForOccurence(this.id)){
      console.log('Fetching data..');
      await fetchData('./data.json',this.id);
    }
    
    const myList = document.querySelector('ul');
    clearData(myList);
    await buttonClose();
}

function hideData(){
    const box = document.getElementById('CheckList');
    


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
