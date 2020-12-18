const countdownButton = document.getElementById('newCountdown');
countdownButton.addEventListener('click', newCountdown);

function newCountdown(evt){
    const endTime = getCountToDate();
    const now = new Date();
    const diff = diffOfDates(now, endTime);
    const newTr = document.createElement('tr');
    appendTd(newTr, ` countDown To ${endTime} from ${now}`, 'label');
    appendTd(newTr, diff, 'count');
    insertARow(newTr);
   
}

function getCountToTime(){
    const input = document.getElementById('countTo');
    const countTo = new Date(input.value);
    return countTo.getTime();
}
function getCountToDate(){
    const input = document.getElementById('countTo');
    const countTo = new Date(input.value);
    return countTo;
}

function diffOfMillis(firstTime, secondTime){
    return  secondTime - firstTime;
}

function diffOfDates(firstDate, secondDate){
    return  secondDate.getTime() - firstDate.getTime();
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

function addARow(newTr){
    const tbody = document.getElementById('countList');
    tbody.prepend(newTr);
    return newTr
}
function insertARow(newTr){
    const tbody = document.getElementById('countList');
    tbody.prepend(newTr);
    return newTr

}