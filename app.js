const countdownButton = document.getElementById('newCountdown');
    countdownButton.addEventListener('click', newCountdown);

let timernum = 0;
let timers = [];    
setUpTimers();
setUpDOM(timers);

function newCountdown(evt){
    const endTime = getCountToDate();
    const diff = howLongFromNow(endTime);
    const title = getTitle();
    
    storeTimer(title, endTime);
    addCountdownToDOM(title, diff);
   
}

function deleteTimer(evt){
    parent = evt.target.parentElement;
    id = parent.id;
    parent.remove();
    timers.forEach(function(val , i, arr ){
        if(val.timernum == id){
            arr.splice(i,1);
        }
    });
    updateStoredtimers();
}

function setUpTimers(){
    const test = getTimers();
    if(!test){
        storeTimer('xmas 2021', new Date(16404408000000));
    }else {
        timers = test;
    }
}

function setUpDOM(){
    timers.forEach(function(val){
        addCountdownToDOM(val.label, new Date(val.endTime), val.timernum);
    })
}
function addCountdownToDOM(title, howLong, rowId = undefined){
    const newTr = document.createElement('tr');
    
    if(rowId == undefined){
        rowId = timernum;
    }
    newTr.id = rowId;
     
    appendTd(newTr, title, 'label');
    appendTd(newTr, howLong, 'count');
    appendDeleteBtn(newTr);
    insertARow(newTr);
}

/**
 * Returns false on empty
 */
function getTimers(){
    if(localStorage.timers){
        let newTimers = JSON.parse(localStorage.timers);
        if(newTimers[0]){
            timernum = newTimers[newTimers.length-1].timernum;
            return newTimers;
        }
    }

    return false;
    

}

function storeTimer(label, end){
    timernum++;
    const newTimer = {
        'label' : label,
        'endTime' : end.getTime(),
        'timernum' : timernum
    };
    timers.push(newTimer);
    updateStoredtimers();
}

function updateStoredtimers(){
    localStorage.timers = JSON.stringify(timers);
}

function getTitle(){
    const titleIn =  document.getElementById('title');
    return titleIn.value;
}

function getCountToTime(){
    const dateIn =  document.getElementById('date');
    const timeIn =  document.getElementById('time');
    const countTo = new Date(dateIn.value + " "  + timeIn.value);
    return countTo.getTime();
}
function getCountToDate(){
    const dateIn =  document.getElementById('date');
    const timeIn =  document.getElementById('time');
    const countTo = new Date(dateIn.value + " " + timeIn.value);
    return countTo;
}


function howLongFromNow(then){
    const now = new Date();
    return diffOfDates(now, then);
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

/**
 *  Creates a new td with the innerText of 'X' and deleteServer click listener
 *   and appends it to the passed tr
 * 
 * @param {HTMLTableRowElement} tr 
 */
function appendDeleteBtn(tr){
    let newTd = document.createElement('td');
    newTd.innerText = 'X';
    newTd.classList.add('delButton');
    newTd.addEventListener('click', deleteTimer);
    tr.append(newTd);
}

function addARow(newTr){
    const tbody = document.getElementById('countList');
    tbody.append(newTr);
    return newTr
}
function insertARow(newTr){
    const tbody = document.getElementById('countList');
    tbody.prepend(newTr);
    return newTr

}