import { Alert, AlertTitle, IconButton } from '@mui/material'
import { useGame } from '../context/Context'
import CloseIcon from '@mui/icons-material/Close'

type AlertType = 'error' | 'success'

export default function AlertBox({ type, message }: { type: AlertType; message: string }) {
  const { state, dispatch } = useGame()

  const onClick = () => {
    dispatch({ type: 'clearError' })
    if (state.status === 'won') {
      dispatch({ type: 'resetGame' })
    }
  }

  return (
    <div className="alert" onClick={onClick}>
      <Alert
        severity={type}
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={onClick}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{type === 'error' ? 'Error' : 'You Win!'}</AlertTitle>
        {message}
      </Alert>
    </div>
  )
}
