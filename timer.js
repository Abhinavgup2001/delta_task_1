const gridContainer = document.querySelector(".grid-container");
var select = document.querySelector('#difficulty');
const button = document.querySelector('button');
function startFunction(){
    clearInterval(x);
    document.getElementById('timer').textContent = "0:00:00"
    gridContainer.style.gridTemplateColumns = "auto";
    gridContainer.style.fontSize = "300%";
    gridContainer.innerHTML = "Click Here To Start The Game";
    gridContainer.addEventListener('click',countdowm);
    bestScoreFunction();
};
startFunction();


//click to start
gridContainer.addEventListener('click',countdowm);
button.addEventListener('click',countdowm);
select.addEventListener('change', startFunction);

var difficulty;
function countdowm(){
    difficulty = document.getElementById('difficulty').value;
    // console.log(difficulty);
    bestScoreFunction();
    j=1; 
    clearInterval(x);
    document.getElementById('timer').textContent = "0:00:00"
    gridContainer.removeEventListener('click',countdowm);
    gridContainer.style.fontSize = "600%";
    gridContainer.style.textAlign = "center";
    setTimeout(() => {
        gridContainer.innerHTML = "3";
        // console.log(3);
    }, 0);
    setTimeout(() => {
        gridContainer.innerHTML = "2";
        // console.log(2);
    }, 1000);
    setTimeout(() => {
        gridContainer.innerHTML = "1";
        // console.log(1);
    }, 2000);
    setTimeout(() => myfunc(), 3000);

}

var start;
function myfunc(){
    gridContainer.style.gridTemplateColumns = "20% 20% 20% 20% 20%";
    gridContainer.style.gridTemplateRows = "25% 25% 25% 25%";
    gridContainer.innerHTML = '<div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div> <div class="grid-item" onclick="change(this)"></div>' ;
    var gridItem = document.getElementsByClassName("grid-item");
    start = new Date().getTime();
    x = setInterval(myTimer, 10);
         
    for (var a=[],i=0;i<20;++i) a[i]=i;
    a = shuffle(a);
    a.forEach((element, index) => {
        element = element+1;
        var g = 90 - element*2;
        // var f = 100 -g;
        gridItem[index].style.backgroundColor = `rgb(${g}%,${g}%,${g}%)`;
        // gridItem[index].style.color = `rgb(${f}%,${f}%,${f}%)`;
        gridItem[index].style.color =   `black`;
        gridItem[index].textContent = "" + element;
    });
}

var timeTaken;
//function for timer
function myTimer(){
    var now = new Date().getTime();
    timeTaken = now - start;
    document.getElementById('timer').textContent = timeFormat(timeTaken);
}


function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

var j = 1;
var x;
var bestScores;
function bestScoreFunction(){
    difficulty = document.getElementById('difficulty').value;
    if(localStorage.getItem('bestScores' + difficulty)){
        bestScoresFull = JSON.parse(localStorage.getItem('bestScores' + difficulty));
        bestScoresFull.sort(function(a, b){return a - b});
        bestScores = bestScoresFull.slice(0,5);
        console.log(bestScores);
        var para = document.getElementsByTagName('p');
        //console.log(para);
        for(var par=0;par<5;par++){
        para[par].innerHTML = "";
        }
        bestScores.forEach((element, index )=> {
            para[index].textContent = timeFormat(bestScores[index])
        })
    }  else{
        bestScores = [];
        localStorage.setItem('bestScores'+difficulty, JSON.stringify(bestScores));
    }
}

bestScoreFunction();

//to change time to minute:seconds:mSeconds format
function timeFormat(timeInFormat){
    var mSeconds = Math.floor((timeInFormat%(1000)));
    var seconds = Math.floor((timeInFormat%(1000*60))/1000);
    var minute = Math.floor((timeInFormat % (1000 * 60 * 60)) / (1000 * 60));
    return `${minute}:${seconds}:${mSeconds}`;
}

var z = document.getElementById("myAudio");
//FUNCTION TO CHANGE THE NUMBERS
const change = (event) => {
    var n = parseInt(event.textContent);
    //console.log(j, n);
    if(j == n){
       
        z.play();
        if(difficulty == 20){
            f20(n,event);
        }
        else if(difficulty == 40){
            f40(n, event);
        } else if(difficulty == 60){
            f60(n, event);
        }
        j++;
    }
}

function f20(n, event){
    if(n===20){
        complete();        
    }
    
    if(n<21){
        event.textContent = " ";
        event.style.backgroundColor = "rgb(0,0,0)";
    } 
}

function f40(n, event){
    if(n===40){
        complete(); 
    }
    
    if(n>20){
        event.textContent = " ";
        event.style.backgroundColor = "rgb(0,0,0)";
    } else if(n>0 && n<21){
        var g = 50 - (n)*2;
        // var f = 100 - g;
        event.style.backgroundColor = `rgb(${g}%,${g}%,${g}%)`;
        // event.style.color = `rgb(${f}%,${f}%,${f}%)`;
        event.style.color = `white`;
        event.textContent = 20 + n;
    } 
}

function f60(n, event){
    if(n===60){
        complete();        
    }
    
    if(n>40){
        event.textContent = " ";
        event.style.backgroundColor = "rgb(0,0,0)";
    } else if(n>0 && n<21){
        var g = 50 - (n)*2;
        // var f = 100 - g;
        event.style.backgroundColor = `rgb(${g}%,${g}%,${g}%)`;
        // event.style.color = `rgb(${f}%,${f}%,${f}%)`;
        event.style.color = `white`;
        event.textContent = 20 + n;
    } else{
        event.textContent = 20 + n;
        var g = 90 - (n-20)*2;
        event.style.backgroundColor = `rgb(${g}%,${g}%,${g}%)`;
        event.style.color =   `black`;
    }
}

function complete(){
    clearInterval(x);
    var result = document.getElementById('timer').textContent;
    document.getElementById('result').textContent =  `Well done! Your score is ${result}`;
    var bestScoresObject = bestScores.concat(timeTaken);
    var bestScoresJSON = JSON.stringify(bestScoresObject);
    localStorage.setItem('bestScores'+difficulty, bestScoresJSON);            
    bestScoreFunction();
}