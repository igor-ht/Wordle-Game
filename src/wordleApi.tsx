import { Fragment, KeyboardEvent, useEffect, useState } from "react";

export interface InputInterface {
  inputId: Number,
  inputValue: string,
  inputStatus: String
}


export interface StateInterface {
  randomWord: String;
  insertedLetters: String[];
  statePicture: InputInterface[][]
};

export function WordleApi() {

  
  const [gameState, setGameState] = useState<StateInterface>({
    randomWord: '',
    insertedLetters: [],
    statePicture: []
  });


  const createStatePicture = () => {
    if (gameState.statePicture.length < 1) {
      for (let i = 1; i < 7; i++) {
        let array: InputInterface[] = [];
        for (let j = 1; j < 6; j++) {
          let new_object: InputInterface = {
            inputId:  Math.random() * Date.now(),
            inputValue: '',
            inputStatus: 'empty'
          };
          array.push(new_object);
        }
        gameState.statePicture.push(array);
      }
    }
  }
  
  useEffect(() => {  
    fetch(`https://random-word-api.herokuapp.com/word?length=5`)
    .then(response => response.json())
    .then(data => data[0])
    .then((value) => gameState.randomWord = value.toUpperCase())
    .then(() => setGameState(gameState))
    .catch(() => gameState.randomWord = 'error')
  
  },);

  const inputBoard = () => {
    console.log(gameState)
    return (
      <div className="myContainer" key={Math.random().toString()}>
      {gameState.statePicture.map((row: InputInterface[], index:Number) => createInputRow(row, index) )}
      </div>
    )
  }

  function createInputRow (row: InputInterface[], i: Number){
    return (
      <Fragment key={Math.random().toString()}>
        {row.map((input: InputInterface, j: Number) => (
          (i === 0 && j === 0 ? 
            <input type={'text'} key={input.inputId.toString()} id={(input.inputId.toString())} onKeyUp={handleInput} pattern='[a-z]' minLength={1} maxLength={1} required autoFocus />
            : <input type={'text'} key={input.inputId.toString()} id={(input.inputId.toString())} onKeyUp={handleInput} pattern='[a-z]' minLength={1} maxLength={1} required disabled />
          )
        ))}
      </Fragment>
    )
  }

  const handleInput = (event: KeyboardEvent<HTMLInputElement>) => {

    if (!/^[a-zA-Z]$/.test(event.key)) return (event.currentTarget.value = '', event.currentTarget.focus());

    let currentTarget: HTMLInputElement = event.currentTarget as HTMLInputElement;
    let targetSibling: HTMLInputElement = currentTarget.nextElementSibling as HTMLInputElement;

    currentTarget.value = currentTarget.value.toUpperCase();
    gameState.statePicture.forEach((inputRow: InputInterface[]) => {
      inputRow.forEach((inputItem: InputInterface, index: number) => {
        if (inputItem.inputId.toString() === currentTarget.id) {
          inputItem.inputValue = currentTarget.value;
          inputItem.inputStatus = 'wrong';
          gameState.insertedLetters.push(currentTarget.value)
          if (gameState.randomWord.includes(inputItem.inputValue)) {
            if (inputRow[index].inputValue === gameState.randomWord[index]) {
              inputItem.inputStatus = 'bull';
            } else {
              inputItem.inputStatus = 'cow';
            }
          }
          if (index === inputRow.length - 1) {
            handleInputWord(inputRow, currentTarget);
          }
        }
      })
    })
    currentTarget.blur()
    if (currentTarget.nextElementSibling !== null) {
      targetSibling.removeAttribute('disabled')
      targetSibling.focus()
    }
  }

  function handleInputWord(inputRow: InputInterface[], element: HTMLInputElement){
    let currentElement: HTMLInputElement = element as HTMLInputElement;
    let BullLetters = 0;
    for (let i = 4; i > -1; i--) {
      if (inputRow[i].inputStatus === 'bull') {
        BullLetters += 1;
        currentElement.classList.add('text-bg-success');
      } else if (inputRow[i].inputStatus === 'cow'){
        currentElement.classList.add('text-bg-warning');
      } else {
        currentElement.classList.add('text-bg-light');
      }
    currentElement = currentElement.previousElementSibling as HTMLInputElement;
    }
    if (BullLetters === 5) {
      setTimeout(() => {
        alert('Success! You got the right word: ' + gameState.randomWord);
      })
    }
  }


  function createKeyboard() {
    let keyboardArray = ['Q','W','E','R','T','Y','U','I','O','P','Enter','A','S','D','F','G','H','J','K','L', 'Z','X','C','V','B','N','M', 'BckSpc'];
    return (
      keyboardArray.map(char => {
        if (char === 'Enter') {
        return <button type="button" className="enter" key={char}><p>{char}</p></button>
        } else if (char === 'BckSpc') {
         return <button type="button" className="backSpace" key={char}><p>{char}</p></button>
        } else {
        return  <button type="button" key={char}><p>{char}</p></button>
        }
      })
    )
  }


  return {
    gameState,
    setGameState,
    inputBoard,
    createStatePicture,
    createInputRow,
    createKeyboard,

  }
}