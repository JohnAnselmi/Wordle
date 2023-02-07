import { useGame } from '../context/Context'
import Key from './Key'

export default function Keyboard() {
  const { state, dispatch } = useGame()

  const onClick = (value: string) => {
    if (value === 'backspace' && state.currentGuess.length >= 0 && state.status === 'playing') {
      dispatch({ type: 'removeLetter' })
      return
    } else if (value === 'return' && state.status === 'playing') {
      dispatch({ type: 'checkGuess' })
      return
    } else {
      if (state.currentGuess.length < 5 && state.status === 'playing') {
        dispatch({ type: 'addLetter', payload: value })
      }
      return
    }
  }

  return (
    <section className="keyboardGrid">
      <div className="keyboardRow row1">
        <Key onClick={onClick} letter="Q" />
        <Key onClick={onClick} letter="W" />
        <Key onClick={onClick} letter="E" />
        <Key onClick={onClick} letter="R" />
        <Key onClick={onClick} letter="T" />
        <Key onClick={onClick} letter="Y" />
        <Key onClick={onClick} letter="U" />
        <Key onClick={onClick} letter="I" />
        <Key onClick={onClick} letter="O" />
        <Key onClick={onClick} letter="P" />
      </div>
      <div className="keyboardRow row2">
        <Key onClick={onClick} letter="A" />
        <Key onClick={onClick} letter="S" />
        <Key onClick={onClick} letter="D" />
        <Key onClick={onClick} letter="F" />
        <Key onClick={onClick} letter="G" />
        <Key onClick={onClick} letter="H" />
        <Key onClick={onClick} letter="J" />
        <Key onClick={onClick} letter="K" />
        <Key onClick={onClick} letter="L" />
      </div>
      <div className="keyboardRow row3">
        <Key onClick={onClick} letter="backspace" />
        <Key onClick={onClick} letter="Z" />
        <Key onClick={onClick} letter="X" />
        <Key onClick={onClick} letter="C" />
        <Key onClick={onClick} letter="V" />
        <Key onClick={onClick} letter="B" />
        <Key onClick={onClick} letter="N" />
        <Key onClick={onClick} letter="M" />
        <Key onClick={onClick} letter="return" />
      </div>
    </section>
  )
}
