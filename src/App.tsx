import { useEffect, useState } from 'react'
import './App.css'
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
  }, [state.theWord])

  useEffect(() => {
    if (state.error) {
      if (state.error.startsWith('You lost')) return
      setTimeout(() => {
        dispatch({ type: 'clearError' })
      }, 4000)
    }
  }, [state.error])

  return loading ? (
    <Loading />
  ) : (
    <main>
      {/* <div className="helper" onClick={() => console.log(state)}>
        <p>Log State</p>
      </div> */}
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
