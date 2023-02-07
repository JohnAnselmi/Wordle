import { CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <div className="loading">
      <CircularProgress />
      <h4>Loading...</h4>
    </div>
  )
}
