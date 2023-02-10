import React,{useContext} from 'react'
import { GlobalState } from '../App'

function CC() {
  const data = useContext(GlobalState)
  return (
    <div>
      CC - {data.data} {data.count}
    </div>
  )
}

export default CC