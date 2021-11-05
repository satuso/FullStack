import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state=>state.notification.msg)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
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