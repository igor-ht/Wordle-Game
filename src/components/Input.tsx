import * as React from 'react';
import WordleContext from '../Context/wordleContext';


export const InputConstructor = () => {

  const { inputBoard} = React.useContext(WordleContext);


  return (
    <>
      {inputBoard()}
    </>
  )
}

export default InputConstructor;