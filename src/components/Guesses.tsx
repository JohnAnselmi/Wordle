import { useEffect } from 'react'
import { useGame } from '../context/Context'

export default function Guesses() {
  const { state } = useGame()

  useEffect(() => {
    if (state.pastGuesses.length >= 0) {
      state.pastGuesses.forEach((guess, index) => {
        const letters = document.querySelectorAll(`.guess${index + 1} .letter`)
        letters.forEach((letter, letterIndex) => {
          letter.setAttribute('data-value', guess[letterIndex])
          letter.textContent = guess[letterIndex]
        })
      })
    }
    if (state.currentGuess.length >= 0) {
      const letters = document.querySelectorAll(`.guess${state.pastGuesses.length + 1} .letter`)
      letters.forEach((letter, index) => {
        letter.setAttribute('data-value', state.currentGuess[index])
        letter.textContent = state.currentGuess[index]
      })
    }
  }, [state.pastGuesses, state.currentGuess])

  useEffect(() => {
    if (state.status === 'won') {
      //TODO freeze up all interaction, allow reloading
    }
    if (state.status === 'lost') {
      //TODO freeze up all interaction, allow reloading
    }
    if (state.status === 'checking') {
      
      //TODO Implement check animation
    }
    if (state.status === 'playing') {
      //TODO not sure what I need here. This will be the initial load and after a check
    }
  }, [state.status, state.pastGuesses])

  return (
    <section className="guessGrid">
      <div className="guess guess1">
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
      </div>
      <div className="guess guess2">
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
      </div>
      <div className="guess guess3">
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
      </div>
      <div className="guess guess4">
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
      </div>
      <div className="guess guess5">
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
      </div>
      <div className="guess guess6">
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
        <div className="letter" data-value=""></div>
      </div>
    </section>
  )
}
