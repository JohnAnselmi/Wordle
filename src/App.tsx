import { createContext, useEffect, useState } from 'react'
import './App.css'
import { words } from './utils/words'
import Loading from './components/Loading'
import Keyboard from './components/Keyboard'
import Guesses from './components/Guesses'
import { useGame } from './context/Context'
import AlertBox from './components/Alert'

function App() {
  const { state, dispatch } = useGame()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (state.theWord === '') {
      dispatch({ type: 'setWord' })
    }
  }, [])

  useEffect(() => {
    if (state.theWord !== '') {
      setLoading(false)
    }
    console.log('word is', state.theWord)
  }, [state.theWord])

  return loading ? (
    <Loading />
  ) : (
    <main>
      <div className="helper" onClick={() => console.log(state)}>
        <p>Log State</p>
      </div>
      <Guesses />
      <Keyboard />
      {(state.error || state.status === 'won') && (
        <AlertBox
          type={state.error ? 'error' : 'success'}
          message={state.error || 'Congrats! You guessed correctly! Reload the page to try again.'}
        />
      )}
    </main>
  )
}

export default App
