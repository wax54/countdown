const countdownButton = document.getElementById('newCountdown');
    countdownButton.addEventListener('click', newCountdown);

let timernum = 0;
let timers = [];    
setUpTimers();
setUpDOM(timers);


/**
 *  whenever a add timer click happens, this function fires
 * 
 * @param { clickEvent } evt the clicked buttons event, not used
 */
function newCountdown(evt){
    const endTime = getCountToDate();
    const diff = howLongFromNow(endTime);
    const title = getTitle();
    
    storeTimer(title, endTime);
    addCountdownToDOM(title, diff, timernum);
   
}

//Timer Functions


/**
 * The function called when a timer delete button has been clicked
 * 
 * @param { clickEvent } evt Expecting the parent element of the clicked button to have the timers id 
 */
function deleteClicked(evt){
    // gets the parent of the clicked button from the DOM
    const parent = evt.target.parentElement;

    //Gets the timer id from the parent object
    const id = parent.id;
    
    const intervalId = parent.dataset.intervalId;
    clearInterval(intervalId);
    //removes the timer from the shared array, timers
    deleteTimer(id);

    //removes the parent from the DOM #cleanUp
    parent.remove();

}
/**
 * uses the shared timers array 
 *  iterates through the timers array 
 *  checks each timer's timernum to see if it's the same as id
 *  if it is, it removes it from the array and updates the localStorage
 * 
 * @param { number } id the id or a string representing the id of 
 *  the timer you wish to be deleted 
 */

function deleteTimer(id){

    timers.forEach(function(val , i, arr){
        if(val.timernum == id){
            arr.splice(i,1);
        }
    });
    //updates the localStorage #cleanUp
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
        intervalId = setInterval(function(){
            updateTime(val)
        },1000);
        addCountdownToDOM(val.label, new Date(val.endTime), val.timernum, intervalId);
        
    })
}
function addCountdownToDOM(title, howLong, rowId, intervalId){
    const newTr = document.createElement('tr');
    
    newTr.id = rowId;
    newTr.dataset.intervalId = intervalId;
    appendTd(newTr, title, 'label');
    appendTd(newTr, howLong, 'count');
    appendDeleteBtn(newTr);

    insertARow(newTr);
}

function updateTime(timer){

    const timerRow = document.getElementById(timer.timernum);

    const count = timerRow.querySelector('.count');

    const howLong = howLongFromNow(new Date(timer.endTime));

    const formatted = timeFormat(howLong, 2);

    count.innerText = formatted;
} 

function timeFormat(ms, specificity){
    const MSINYEAR = 31540000000;
    const MSINMONTH = 2628000000;
    const MSINDAY = 86400000;
    const MSINHOUR = 3600000;
    const MSINMINUTE = 60000;
    const MSINSEC = 1000;
    


    const y = Math.floor(ms / MSINYEAR);
    ms = ms - (y*MSINYEAR);

    const mth = Math.floor(ms / MSINMONTH);
    ms = ms - (mth*MSINMONTH);

    const d = Math.floor(ms / MSINDAY);
    ms = ms - (d*MSINDAY);

    const h = Math.floor(ms /MSINHOUR);
    ms = ms - (h*MSINHOUR);

    const min = Math.floor(ms / MSINMINUTE);

    ms = ms - (min*MSINMINUTE);
    const s = Math.floor(ms / MSINSEC);
    
    ms = ms - (s*MSINSEC);



    return `${y}Years, ${mth}Months, ${d}Days, ${h}Hours, ${min}Minutes, ${s}Seconds, and ${ms}Milliseconds,  `
    
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
    newTd.addEventListener('click', deleteClicked);
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