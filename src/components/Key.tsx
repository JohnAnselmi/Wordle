import { useEffect, useState } from 'react'
import { useGame } from '../context/Context'

export default function Key({ letter, onClick }: { letter: string; onClick: (letter: string) => void }) {
  const [display, setDisplay] = useState(letter)
  const [letterStatus, setLetterStatus] = useState('')
  const { state } = useGame()

  useEffect(() => {
    if (letter === 'backspace') {
      setDisplay('⌫')
    } else if (letter === 'return') {
      setDisplay('↵')
    }
  }, [letter])

  useEffect(() => {
    if (state.wrongLetters.includes(letter)) {
      setLetterStatus('wrong')
    }
    if (state.closeLetters.includes(letter)) {
      setLetterStatus('close')
    }
    if (state.correctLetters.includes(letter)) {
      setLetterStatus('correct')
    }
  }, [state.wrongLetters, state.correctLetters, state.closeLetters, letter])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === letter.toUpperCase()) {
        onClick(letter)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [letter, onClick])

  return (
    <div
      onClick={() => {
        letterStatus === 'wrong' ? null : onClick(letter)
      }}
      className={`key ${letter === 'backspace' || letter === 'return' ? 'doubleSpan' : ''} ${letterStatus}`}
    >
      {display}
    </div>
  )
}
