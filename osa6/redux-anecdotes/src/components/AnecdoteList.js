import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote =  async (id) => {
    const votedAnecdote = props.anecdotes.find(anecdote => anecdote.id === id)
    props.addVote(id)
    props.setNotification(`voted anecdote "${votedAnecdote.content}"`, 10)
  }

  const anecdotesCopy = props.anecdotes.concat()
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesCopy.sort((a, b) => (a.votes < b.votes) ? 1 : -1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)