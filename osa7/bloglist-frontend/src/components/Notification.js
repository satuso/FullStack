import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let style = {
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    display: 'inline-block'
  }

  return (
    <>
      {notification &&
      <div style={style}>
        <em>{notification}</em>
      </div>
      }
    </>
  )
}

export default Notification