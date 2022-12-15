import { Fragment, KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/home')
    }
  }, [navigate])
  
/*   useEffect(() => {
    console.log('fetch random word')

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '50fc996453msh7e9f2917bec60fbp1ddd25jsn7557a1b81a68',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    };
    fetch('https://random-words5.p.rapidapi.com/getRandom?wordLength=5', options)
    .then(response => response.text())
    .then((word) => gameState.randomWord = word.toUpperCase())
    .catch(err => console.log(err))
  
  },); */

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

  const handleInputInKeyboard = (target: HTMLInputElement, row: InputInterface[]) => {
    console.log([...gameState.statePicture])
    const keyboard = target.parentNode?.nextSibling as HTMLElement;
    const allChar = keyboard.querySelectorAll('button');
    row.forEach(input => {
      allChar.forEach(button => {
        if (button.id === input.inputValue) {
          button.classList.add('btn','disabled');
          if (input.inputStatus === 'bull') {
            if (button.classList.contains('btn-warning')) {
              button.classList.remove('btn-warning')
            }
            button.classList.add('btn-success');
          } else if ( input.inputStatus === 'cow') {
            if (!button.classList.contains('btn-success')) {
              button.classList.add('btn-warning');
            }
          }}
      })
    })
    
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
          if (inputRow.indexOf(inputItem) === 4) {
            console.log('before')
            handleInputInKeyboard(currentTarget, inputRow);
          }
        }
      })
    })
    currentTarget.blur()
    if (currentTarget.nextElementSibling !== null) {
      targetSibling.removeAttribute('disabled')
      targetSibling.focus()
    } else {
      for (let el of gameState.statePicture[5]) {
        if (el.inputStatus !== 'bull') {
          setTimeout(() => {
            alert('You fail! The word is: ' + gameState.randomWord);
            window.location.reload();
          },500);
          return;
        }
      }
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
        window.location.reload();
      })
    }
  }


  function createKeyboard() {
    let keyboardArray = ['Q','W','E','R','T','Y','U','I','O','P','Enter','A','S','D','F','G','H','J','K','L', 'Z','X','C','V','B','N','M', 'BckSpc'];
    return (
      keyboardArray.map(char => {
        if (char === 'Enter') {
        return <button type="button" className="enter" key={char} id={char}><p>{char}</p></button>
        } else if (char === 'BckSpc') {
         return <button type="button" className="backSpace" key={char} id={char}><p>{char}</p></button>
        } else {
        return  <button type="button" key={char} id={char}><p>{char}</p></button>
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