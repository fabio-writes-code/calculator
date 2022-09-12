document.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>buttonSelector(btn.getAttribute('id'))));


const display=document.querySelector('.display')
pressedOperation=false;
let previousNumber=display.textContent;

function buttonSelector(btnId){
    let previousNumber=display.textContent;
    // Avoids displaying or store multiple 0's
    if (previousNumber==='0'){
        if(btnId==='0'){
            return
        }
        else{
            display.textContent=btnId;
            return
        }
    }
    // If an operation button has been pressed
    if(pressedOperation===true){
        if (parseInt(btnId) || parseInt(btnId)===0){
            display.textContent=btnId;
            pressedOperation=false;
            return;
        }
        return
    }
    // Number Selector for display
    if (parseInt(btnId) || parseInt(btnId)===0){
        display.textContent=previousNumber+btnId;
        return
    }

    switch(btnId){
        case 'minus':
            storeData()
            break;

        case 'times':
            storeData()
            break;

        case 'division':
            storeData()
            break;

        case 'plus':
            storeData()
            break;
    }
}
function storeData(){
    previousNumber=parseInt(display.textContent);
    pressedOperation=true;
    console.log(previousNumber);
}
function displayUpdate(){

}