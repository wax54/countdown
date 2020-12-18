const countdownButton = document.getElementById('newCountdown');
countdownButton.addEventListener('click', newCountdown);

function newCountdown(evt){
   console.log('hello'); 
}


/**
 * Should create a new td with inner text of value and the class 
 * of type and append it to the passed tr
 * 
 * @param { HTMLTableRowElement } tr a tr element to be appended to
 * @param { string } value the value to be the inner text of the new td
 * @param { string } type the string that will be set as the class name
 */
function appendTd(tr, value, type){
    const td = document.createElement('td');
    td.innerText = value;
    td.classList.add(type);
    tr.append(td);
}

function addARow(){
    const tbody = document.get

}