const grid= document.querySelector(".grid");
const result= document.querySelector(".result");
const width=15; //dimention of each small box in the grid
const aliensremoved=[];
let shooterIndex=202;
let goingRight=true;
let invadersId
let direction=1
let res=0;
let audio= new Audio("nfak.mp3");
audio.play();

for( let i=0; i<width*width; i++){
    //Creates 225 squares
    const square=document.createElement("div");
    grid.appendChild(square);
}

const squares= Array.from(document.querySelectorAll(".grid div"));

const aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22,23,24,
    30, 31, 32, 33,34, 35, 36, 37,38,39
];

function draw(){
    for (let i=0; i<aliens.length;i++){
        if(!aliensremoved.includes(i)){
        squares[aliens[i]].classList.add("invader");
    }
}
}
draw();
squares[shooterIndex].classList.add("shooter")

function remove(){
    for(let i=0; i<aliens.length; i++){
        squares[aliens[i]].classList.remove("invader");
    }
}

function moveshooter(e){//e=Event Such as key press etc
    squares[shooterIndex].classList.remove("shooter");
    //first we remove the shooter then place it
    switch(e.key){
        case "ArrowLeft":
            if(shooterIndex%width!==0){
                shooterIndex-=1;
            }
            break;
        case "ArrowRight":
            if(shooterIndex %width< width-1){
                shooterIndex+=1;
            }
            break;
    }
    squares[shooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveshooter);

function moveInvaders(){
    const left= aliens[0]%width===0 ;//dividing index by width of the grid gives me the row number 
    const right=aliens[aliens.length-1] %width ===width -1 //here we check korchi if row is the last row mane width 1 kina!?
    //left and stores a boolean value!
    remove();//removes all to reprint

    if(right && goingRight){//This is when it hits the edge
        for(let i=0; i< aliens.length;i++){
            aliens[i]+=width+1;
            direction=-1;
            goingRight=false;
        }
    }

    if(left && !goingRight){
        for(let i=0; i< aliens.length;i++){
            aliens[i]+=width-1;
            direction=1;
            goingRight=true;
        }
    }

    for(let i=0; i <aliens.length;i++){//This moves the aliens when normal
        aliens[i]+=direction;

    }
    draw();

    if(squares[shooterIndex].classList.contains("invader") || squares[196,211].classList.contains("invader")){
        result.innerHTML="You Lose!";
        clearInterval(invadersId);
    }

    if(aliensremoved.length=== aliens.length){
        result.innerHTML="You Win!!";
        clearInterval(invadersId);
    }
}

invadersId= setInterval(moveInvaders, 350);

function shoot(e){
    let laserId;
    let laserIndex=shooterIndex;
    
    function movelaser(){
        squares[laserIndex].classList.remove("laser");
        laserIndex-=width;
        squares[laserIndex].classList.add("laser");

        if(squares[laserIndex].classList.contains("invader")){
            squares[laserIndex].classList.remove("invader");
            squares[laserIndex].classList.remove("laser");
            squares[laserIndex].classList.add("boom");

            setTimeout(()=> squares[laserIndex].classList.remove("boom"), 300);
            clearInterval(laserId);
            //setTimeout execute the function after the delay given
            
            const alienRemoved=aliens.indexOf(laserIndex);
            aliensremoved.push(alienRemoved);
            res++;
            result.innerHTML=res;

        }

        if(e.key==="ArrowUp"){
            laserId= setInterval(moveLaser, 100);
        }
    }

    switch(e.key){
        case "ArrowUp":
            laserId=setInterval(movelaser,100);
            break;
    }
}

document.addEventListener("keydown", shoot);


const leftkey=document.getElementsByClassName("left");
const shootkey=document.getElementsByClassName("shoot");
const rightkey=document.getElementsByClassName("right");

leftkey[0].addEventListener("click", ()=>{
    moveshooter({key:"ArrowLeft"});
    
})

shootkey[0].addEventListener("click", ()=>{
    shoot({key: "ArrowUp"});
})

rightkey[0].addEventListener("click", ()=>{
    moveshooter({key:"ArrowRight"});
})

const restart=document.getElementsByClassName("restart");

restart[0].addEventListener("click", ()=>{
    location.reload()
})




