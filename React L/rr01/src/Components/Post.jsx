import React from 'react'
import { useParams } from 'react-router-dom'

function Post() {

    let {category} = useParams()

  return (
    <div>
        Post - {category}
    </div>
  )
}

export default Post