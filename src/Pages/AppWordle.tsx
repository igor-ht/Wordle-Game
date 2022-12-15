import Input from '../components/Input'
import Keyboard from '../components/Keyboard'

export function AppWordle() {

  function startGame(event: any) {
    console.log('hi ou')
  }

  return (

    <div className='wordleDisplay' onLoad={startGame}>
        <Input></Input>
        <Keyboard></Keyboard>
    </div>
  )
}