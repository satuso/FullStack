import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <>
      {notification &&
      <div style={style}>
        {notification}
      </div>
      }
    </>
  )
}

export default Notification