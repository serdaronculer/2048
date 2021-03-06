const rows = document.querySelectorAll(".row");
const score = document.querySelector(".score");
const newGameButton = document.querySelector(".new-game") ;
const end = document.querySelector(".end") as HTMLElement;
const point = document.querySelector(".point");
const restart = document.querySelector(".restart") as HTMLElement;

enum arrowKey { "ArrowDown" = 40, "ArrowUp" = 38, "ArrowLeft" = 37, "ArrowRight" = 39 };



document.addEventListener("keydown", function (e) {
    if(e.keyCode == arrowKey.ArrowLeft && end.style.display =="none"){
        let blockArray = [];
        const blocks = document.querySelectorAll(".block");
        blocks.forEach((item) =>{
              blockArray.push(item);       
        });

     let ok:boolean  = blockArray.every((item) => item.children.length>0);

     let flag = moveLeft();
     let flagII = leftInsertBlock();
     
     if(!ok && flag>0 || flagII>0)
     {
        valueGenerator();
     }
    }
    if(e.keyCode == arrowKey.ArrowUp  && end.style.display =="none"){
        let blockArray = [];
        const blocks = document.querySelectorAll(".block");
        blocks.forEach((item) =>{
              blockArray.push(item);       
        });

     let ok:boolean  = blockArray.every((item) => item.children.length>0);

    let flag = moveUp();
    let flagII =  upInstertBlock();
     
     if(!ok && flag>0 || flagII>0)
     {
        valueGenerator();
     }
    }
    if(e.keyCode == arrowKey.ArrowDown  && end.style.display =="none"){
        let blockArray = [];
        const blocks = document.querySelectorAll(".block");
        blocks.forEach((item) =>{
              blockArray.push(item);       
        });

     let ok:boolean  = blockArray.every((item) => item.children.length>0);

     let flag = moveDown();
     let flagII = downInsertBlock();
     
     if(!ok && flag>0 || flagII>0)
     {
        valueGenerator();
     }
    }
    if(e.keyCode == arrowKey.ArrowRight  && end.style.display =="none"){
        let blockArray = [];
        const blocks = document.querySelectorAll(".block");
        blocks.forEach((item) =>{
              blockArray.push(item);       
        });

     let ok:boolean  = blockArray.every((item) => item.children.length>0);

   let flag = moveRight();
   let flagII = rightInsertBlock();
     
     if(!ok && flag>0 || flagII>0)
     {
        valueGenerator();
     }
    }
    
    gameOverCheck();
     
});




document.addEventListener("DOMContentLoaded", (e: Event) => {

    rows.forEach((item) => {
        for (let index = 0; index < 4; index++) {
            item.appendChild(createBlock());

        }
    });
    
    valueGenerator();


   
});

function valueGenerator() {

    for (let index = 0; ; index++) {
        let selectedRow = rows[randomNumberGenarate(4)];
        let selectedBlock = selectedRow.children[randomNumberGenarate(4)];
 
        if (selectedBlock.children.length < 1) {
            let cell = createCell();
            selectedBlock.appendChild(cell);
            setTimeout(function () {
                cell.style.opacity="1";
                cell.style.transform= "scale(1)";
            },0.8);
            break;
        }

    }


}

function randomNumberGenarate(number: number): number {
    let index: number = Math.floor(Math.random() * number);
    return index;
}

function createBlock(): HTMLDivElement {
    const block = document.createElement("div");
    block.style.width = "100px";
    block.style.height = "100px";
    block.style.background = "rgba(238,228,218,.35)";
    block.classList.add("block");

    return block;
}

function createCell(): HTMLDivElement {

    let randomNumber: number[] = [2, 2, 4, 2];
    let index: number = randomNumberGenarate(randomNumber.length);


    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.color="#776E65";
    cell.style.background = "#EEE4DA";
    cell.style.fontWeight="bold";
    cell.style.opacity="0.2";
    cell.style.transform= "scale(0.4)";
    cell.style.margin="auto";
    cell.style.transition="opacity 1s, transform 1s";
    cell.innerHTML = randomNumber[index].toString();
    return cell;

}

 function moveLeft(){
     
   let rowsArray  = rowsArrayXFunc();
  
        let flag = 0;     

        for(let a=0; a<3; a++){
            for (let i = 0; i < 4; i++) {
                for (let j = a+1; j < 4; j++) {
                    if((rowsArray[i])[a]=="" && (rowsArray[i])[j]!=""){
                        let cell =  ((rows[i]).children[j]).children[0];
                        cell.remove();
                        ((rows[i]).children[a]).appendChild(cell);   
                        rowsArray  = rowsArrayXFunc();
                        flag++;
                    }          
                }             
            }
            rowsArray  = rowsArrayXFunc();
        }
        return flag;
 }

 function moveRight(){
    let rowsArray  = rowsArrayXFunc();
    let flag = 0;    
 
    for(let a=3; a>0; a--){
        for (let i = 0; i < 4; i++) {
            for (let j = a-1; j >= 0; j--) {
                if((rowsArray[i])[a]=="" && (rowsArray[i])[j]!=""){
                    let cell =  ((rows[i]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[a]).appendChild(cell);   
                    rowsArray  = rowsArrayXFunc();
                    flag++;
                }
            }  
        }
        rowsArray  = rowsArrayXFunc();
    }
    return flag;
 }


function moveUp(){
    let flag = 0;
    let rowsArray  = rowsArrayXFunc();

    for (let i = 0; i < 4; i++) {
        
        for (let j = 0; j <4; j++){
    
            for (let k = i+1; k < 4; k++) {

                if(rowsArray[i][j]=="" && rowsArray[k][j]!=""){

                    let cell =  ((rows[k]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[j]).appendChild(cell);   
                     rowsArray  = rowsArrayXFunc();
                     flag++;
                }
           
            }
        }
        rowsArray  = rowsArrayXFunc();
    }

   return flag;
}

function moveDown(){
   
    let flag = 0;
    let rowsArray  = rowsArrayXFunc();

    for (let i = 3; i > 0; i--) {
        for (let j = 0; j <4; j++){
            for (let k = i-1; k >= 0; k--) {
                
                if(rowsArray[i][j]=="" && rowsArray[k][j]!=""){
                    
                    let cell =  ((rows[k]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[j]).appendChild(cell);   
                     rowsArray  = rowsArrayXFunc();
                     flag++;
                }
                
            }
        }
        rowsArray  = rowsArrayXFunc();
    }

    return flag;
}



function leftInsertBlock(){
    let flagII = 0;
  let rowsArray = rowsArrayXFunc();
    for (let i = 0; i < 4; i++) {

        for (let j = 0; j < 3; j++) {

          if(rowsArray[i][j] == rowsArray[i][j+1] && rowsArray[i][j]!=""){
            
            let cell =  ((rows[i]).children[j+1]).children[0];
            cell.remove();
            let newCell:HTMLDivElement = ((rows[i]).children[j]).children[0] as HTMLDivElement;
            let number  =  parseInt(newCell.textContent);
            
        
            newCell.textContent = (number*2).toString();
            cellColor(number,newCell);
            rowsArray  = rowsArrayXFunc();

            let totalPoint = parseInt(score.textContent);
            totalPoint += number*2;
            score.textContent = totalPoint.toString();
            flagII++;
          }
        }
        
    }
    moveLeft();
    return flagII;
}

function cellColor(number,cell){
    switch(number*2){
        case 8 : cell.style.background = "#F3B27A";
        cell.style.color= "#FFF";
        break;
        case 16 : cell.style.background= "#F69664";
        break;
        case 32 : cell.style.background = "#F77C5F";
        break;
        case 64 : cell.style.background = "##F75F3B";
        break;
        case 128 : cell.style.background ="#EDD073";
                   cell.style.textShadow = "rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px";
        break;
        case 256 || 512 || 1024 || 2048 : cell.style.background = "#EDCC62";
                   cell.style.textShadow ="0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #EDCC62, 0 0 30px #EDCC62, 0 0 40px #EDCC62, 0 0 55px #EDCC62";
                
    }
}

function rightInsertBlock(){
    let flagII = 0;
    let rowsArray = rowsArrayXFunc();

    for (let i = 0; i < 4; i++) {

        for (let j = 3; j > 0; j--) {

          if(rowsArray[i][j] == rowsArray[i][j-1] && rowsArray[i][j]!=""){

            let cell =  ((rows[i]).children[j-1]).children[0];
            cell.remove();
            let newCell:HTMLDivElement = ((rows[i]).children[j]).children[0] as HTMLDivElement;
            let number  =  parseInt(newCell.textContent);
            
        
            newCell.textContent = (number*2).toString();
            cellColor(number,newCell);
             rowsArray  = rowsArrayXFunc();

             let totalPoint = parseInt(score.textContent);
            totalPoint += number*2;
            score.textContent = totalPoint.toString();
            flagII++;
          }
        }
        
    }
    moveRight();
    return flagII;
}

function upInstertBlock(){
    let flagII = 0;
    let rowsArray = rowsArrayXFunc();

    for (let i = 0; i <3; i++){
        for (let j =0; j<4; j++){

            if(rowsArray[i][j] == rowsArray[i+1][j] && rowsArray[i][j]!=""){
                let cell =  ((rows[i+1]).children[j]).children[0];
                cell.remove();
                let newCell:HTMLDivElement = ((rows[i]).children[j]).children[0] as HTMLDivElement;
                let number  =  parseInt(newCell.textContent);
                newCell.textContent = (number*2).toString();
                cellColor(number,newCell);
                rowsArray = rowsArrayXFunc();

                let totalPoint = parseInt(score.textContent);
                totalPoint += number*2;
                score.textContent = totalPoint.toString();
                flagII++;
            }
        }
      
    }
    moveUp();
    return flagII;
}

function downInsertBlock(){
    let flagII = 0;
    let rowsArray = rowsArrayXFunc();

    for (let i = 3; i > 0; i--){
        for (let j =0; j<4; j++){

            if(rowsArray[i][j] == rowsArray[i-1][j] && rowsArray[i][j]!=""){
                let cell =  ((rows[i-1]).children[j]).children[0];
                cell.remove();
                let newCell:HTMLDivElement = ((rows[i]).children[j]).children[0] as HTMLDivElement;
                let number  =  parseInt(newCell.textContent);
                newCell.textContent = (number*2).toString();
                cellColor(number,newCell);
                rowsArray = rowsArrayXFunc();

                let totalPoint = parseInt(score.textContent);
                totalPoint += number*2;
                score.textContent = totalPoint.toString();
                flagII++;
            }
        }
    }
    moveDown();
    return flagII;
}

function rowsArrayXFunc(): string[]{
    let rowsArray = [];
    for (let i = 0; i < 4; i++) {
        let XLocation = []; 
        for (let j = 0; j < 4; j++) {              
            let selectedRow = rows[i];
            let selectedBlock = selectedRow.children[j].textContent; 
            
            XLocation.push(selectedBlock);
        }
            rowsArray.push(XLocation);
    }
    return rowsArray;
}

function gameOverCheck(){

    let blockArray = [];
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((item) =>{
          blockArray.push(item);       
    });

    let notEmpty:boolean  = blockArray.every((item) => item.children.length>0);
    let rowsArray : string[]  = rowsArrayXFunc();
    let control = false;
    for(let i=0; i<4; i++){
        if(control)break;
        for(let j = 0; j<3; j++){
          if(rowsArray[i][j] == rowsArray[i][j+1] && rowsArray[i][j] !=""){
            console.log(rowsArray[i][j]); 
              control = true;
                  
              break;
          }  
        }
    }

    if(!control){

        for(let i=0; i<4; i++){
            if(control) break;
              for(let j = 0; j<3; j++){
                  if(rowsArray[j][i] != "" && rowsArray[j][i] == rowsArray[j+1][i]){
                    console.log(rowsArray[j][i]);
                    control = true;
                  }
              }
          }
    }
 
    if(!control && notEmpty){
        end.style.display="flex";
        newGame();
        restart.addEventListener("click", function(){       
            end.style.display = "none";
            
        });
    }
}

   
    newGameButton.addEventListener("click",newGame)

    function newGame(){
        point.textContent = `Point : ${score.textContent}`;
        score.textContent = "0";
        const blocks = document.querySelectorAll(".block");

        blocks.forEach((item) =>{
            if(item.children.length>0)
            item.children[0].remove();

        });
        
        valueGenerator();
    }
  