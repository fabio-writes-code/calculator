document.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>buttonSelector(btn.getAttribute('id'))));


const display=document.querySelector('.display')
pressedOperation=false;
pendingOperator=null;
let firstNumber=display.textContent;
let secondNumber=0;
let storedOperation=0
let operators=['plus','minus','times','division']
let justEqualed=false;
let theDot=false;

function clear(){
    pressedOperation=false
    pendingOperator=null;
    secondNumber=0;
    storedOperation=0;
    display.textContent=0;
    justEqualed=false
    theDot=false
    firstNumber=display.textContent;
}

function buttonSelector(btnId){
    let previousNumber=display.textContent;
    // console.log('ENTRY')
    // console.log('BtnID:',btnId)
    // console.log('pressed Operation:',pressedOperation)
    // console.log('stored Op:',storedOperation)
    // console.log('Just Equal:',justEqualed)

    //Clear
    if (btnId==='clear'){
        clear();
        return;
    }
    
    //Equal was just pressed
    if (justEqualed){
        if (parseInt(btnId) || parseInt(btnId)===0){
            display.textContent=btnId;
            pendingOperator=null
            justEqualed=false
            return;
        } 
        if(btnId==='dot'){ display.textContent='0.';
            justEqualed=false;
            theDot=true;
            return;
        }
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
        if(btnId==='dot'){
            display.textContent='0.'
            pressedOperation=false
            theDot=true;
            return;
        }
        if (operators.includes(btnId)){
            pendingOperator=btnId;
            pressedOperation=true;
            return;
        }
    }

    // TheDot
    if (btnId==='dot' && !theDot){
        theDot=true;
        display.textContent=previousNumber+'.'
        return;
    }

    // Equal
    if (btnId==='equal') resolveOperator(false)
    

    // When an operator works as equal as well, prevents iteration
    if (operators.includes(btnId) && storedOperation===1){
        secondNumber=0;
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
    firstNumber=Number(display.textContent);
    pressedOperation=true;
    secondNumber=0;
    justEqualed=false;
    theDot=false
    pendingOperator=operator;
    if (pendingOperator) storedOperation=1;

}

function resolveOperator(opButton){
    if (!pendingOperator) return
    
    // Equal Button is pressed
    if (!opButton){
        // Storing secondNumber if empty
        if (secondNumber===0){
            secondNumber=Number(display.textContent)
        }
        justEqualed=true;
        pressedOperation=false;
        storedOperation=0;
    }


    // When resolving through an operator button
    if(opButton){
        secondNumber=Number(display.textContent);
        pressedOperation=true
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
    result=Math.round(result*10000000)/10000000;
    display.textContent=result;
    theDot=false
    firstNumber=Number(display.textContent);
    
}
