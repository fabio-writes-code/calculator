document.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>buttonSelector(btn.getAttribute('id'))));


const display=document.querySelector('.display')
pressedOperation=false;
pendingOperator=null;
let firstNumber=display.textContent;
let secondNumber=0;
let storedOperation=0
let operators=['plus','minus','times','division']

function clear(){
    pressedOperation=false
    pendingOperator=null;
    secondNumber=0;
    storedOperation=0;
    display.textContent=0;
    firstNumber=display.textContent;
}
function buttonSelector(btnId){
    let previousNumber=display.textContent;


    //Clear
    if (btnId==='clear'){
        clear();
        return;
    }
    
    //INPUT NUMBERS
    // Avoids storing multiple zeroes
    if (previousNumber==='0' && (parseInt(btnId) || parseInt(btnId)===0)){
        if(btnId==='0'){
            return
        }
        else{
            display.textContent=btnId;
            return
        }
    }

    // If an operation button has previously been pressed. Resets display.
    if(pressedOperation===true){
        if (parseInt(btnId) || parseInt(btnId)===0){
            display.textContent=btnId;
            pressedOperation=false;
            return;
        }
        if (operators.includes(btnId)){
            pendingOperator=btnId;
            pressedOperation=true;
            return;
        }
        if (btnId==='equal') return
        return
    }

    // Equal
    if (btnId==='equal') resolveOperator(false)


    // When an operator works as equal as well, prevents iteration
    if (operators.includes(btnId) && storedOperation===1){
        resolveOperator(true);
    }

    

    // Number Selector for display
    if (parseInt(btnId) || parseInt(btnId)===0){
        display.textContent=previousNumber+btnId;
        return
    }
    
    switch(btnId){
        case 'minus':
            storeData('minus')
            break;

        case 'times':
            storeData('times')
            break;

        case 'division':
            storeData('division')
            break;

        case 'plus':
            storeData('plus')
            break;
    }
}
function storeData(operator){
    firstNumber=parseInt(display.textContent);
    pressedOperation=true;
    secondNumber=0;

    pendingOperator=operator;
    if (pendingOperator) storedOperation=1;
    

}

function resolveOperator(opButton){
    console.log(opButton)
    if (!pendingOperator) return

    // Is the second number of the operation stored or grabbed
    if (!opButton){
        if (secondNumber===0 || secondOperation===true){
            secondNumber=parseInt(display.textContent)
            secondOperation=false;
        }
        storedOperation=0;
    }


    // When resolving through an operator button
    if(opButton){
        secondNumber=parseInt(display.textContent);
    }

    result=0;
    switch(pendingOperator){
        case 'plus':
            result=firstNumber+secondNumber;
            break;
        case 'minus':
            result=firstNumber-secondNumber;
            break;
        case 'times':
            result=firstNumber*secondNumber;
            break;
        case 'division':
            result=firstNumber/secondNumber;
            break;
    }

    console.log(firstNumber,secondNumber,pendingOperator, result)
    display.textContent=result;
    firstNumber=parseInt(display.textContent);
    
}
