"use strict"


async function docOnReady(event){
    getSections();
    const namesArray = await getSections();
   
    for (const name of namesArray) {
      let CheckList = document.getElementsByClassName(name);
    for (const item of CheckList) {
      item.addEventListener("pointerover", showData.bind(item));
    }
    }
}

async function getSections(){
  let typesArray = [];
  let fetchRequest = await fetch('./data.json');
  let dataArray = await fetchRequest.json();
  for(const item in dataArray)
  {
    typesArray.push(item);
  }
  return typesArray;
}

async function fetchData(url, nameOfCategory, nameOfClass){
    const myList = document.querySelector('ul');
    fetch(url)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
    .then((data) => {
    for (const item of data[nameOfClass]) {
      for (const it of item[nameOfCategory]) {
        for(const value in it)
        {
          if(value === 'dataType') continue;
          const listItem = document.createElement('input');
          const label = document.createElement('label');
          const breakP = document.createElement('br');

          listItem.setAttribute("type", "checkbox");
          listItem.setAttribute("id", `${value}`);
    
          label.setAttribute('for',`${value} `)
          label.innerHTML = `${value}: ${it[value]}`;
          
          myList.appendChild(listItem);
          myList.appendChild(label);
          myList.appendChild(breakP);
        } 
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
    console.log(this.className, this.id);
    if(checkForOccurence(this.className)){
      console.log('Fetching data..');
      await fetchData('./data.json',this.id, this.className);
    }
    
    const myList = document.querySelector('ul');
    clearData(myList);
    buttonClose();
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

async function checkForOccurence(cName){
  let myArray = await getTypes();
  console.log(myArray.has(cName),'Class found')
}

window.addEventListener("DOMContentLoaded",docOnReady);
