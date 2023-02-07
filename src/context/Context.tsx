import { createContext, useContext, useReducer } from 'react'
import { words } from '../utils/words'

interface ContextProviderProps {
  children: React.ReactNode
}

type State = {
  theWord: string
  pastGuesses: string[]
  currentGuess: string[]
  wrongLetters: string[]
  correctLetters: string[]
  closeLetters: string[]
  status: 'playing' | 'won' | 'lost' | 'checking'
  error: string | null
}

type Actions = {
  type: 'setWord' | 'addLetter' | 'removeLetter' | 'checkGuess' | 'setStatus' | 'clearError' | 'resetGame'
  payload?: string
}

type Dispatch = (action: Actions) => void

const GameContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function gameReducer(state: State, action: Actions): any {
  switch (action.type) {
    case 'setWord': {
      return {
        ...state,
        theWord: words[Math.floor(Math.random() * words.length)],
      }
    }
    case 'setStatus': {
      return {
        ...state,
        status: action.payload,
      }
    }
    case 'clearError': {
      return {
        ...state,
        error: null,
      }
    }
    case 'addLetter': {
      const newGuess = [...state.currentGuess, action.payload]
      return {
        ...state,
        currentGuess: newGuess,
      }
    }
    case 'removeLetter': {
      const newGuess = state.currentGuess.slice(0, -1)
      return {
        ...state,
        currentGuess: newGuess,
      }
    }
    case 'checkGuess': {
      state.status = 'checking'
      let newPastGuesses = state.pastGuesses
      let guess = state.currentGuess.join('')
      if (state.currentGuess.length !== 5) {
        return {
          ...state,
          error: 'You must guess a 5 letter word',
          status: 'playing',
        }
      }
      if (!words.includes(guess.toLowerCase())) {
        return {
          ...state,
          error: 'You must guess a valid word',
          status: 'playing',
        }
      }

      const letters = document.querySelectorAll(`.guess${state.pastGuesses.length + 1} .letter`)
      letters.forEach((letter, index) => {
        if (letter.textContent?.toLowerCase() === state.theWord[index].toLowerCase()) {
          letter.classList.add('correct')
          if (!state.correctLetters.includes(letter.textContent)) {
            state.correctLetters.push(letter.textContent)
          }
        } else if (
          letter.textContent &&
          state.theWord.toLowerCase().includes(letter.textContent.toLowerCase())
        ) {
          letter.classList.add('close')
          if (!state.closeLetters.includes(letter.textContent)) {
            state.closeLetters.push(letter.textContent)
          }
        } else {
          letter.classList.add('wrong')
          if (letter.textContent && !state.wrongLetters.includes(letter.textContent)) {
            state.wrongLetters.push(letter.textContent)
          }
        }
      })

      if (guess.toUpperCase() === state.theWord.toUpperCase()) {
        return {
          ...state,
          pastGuesses: newPastGuesses,
          status: 'won',
          currentGuess: guess,
        }
      } else {
        newPastGuesses = [...state.pastGuesses, guess]
        if (newPastGuesses.length === 6) {
          return {
            ...state,
            pastGuesses: newPastGuesses,
            status: 'lost',
            currentGuess: guess,
          }
        } else {
          return {
            ...state,
            pastGuesses: newPastGuesses,
            status: 'playing',
            currentGuess: [],
          }
        }
      }
    }
    case 'resetGame': {
      window.location.reload()
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const GameProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, {
    theWord: '',
    pastGuesses: [],
    currentGuess: [],
    wrongLetters: [],
    correctLetters: [],
    closeLetters: [],
    status: 'playing',
    error: null,
  })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export { GameProvider, useGame }
