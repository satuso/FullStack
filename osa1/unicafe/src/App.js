import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={() => props.setFeedback(props.value)}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = props.good / all * 100
  if (props.good > 0 || props.neutral > 0 || props.bad > 0){
    return (
      <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
    </>
    )
  } else {
    return (
      <>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button value={good + 1} setFeedback={setGood} text={"good"}/>
      <Button value={neutral + 1} setFeedback={setNeutral} text={"neutral"}/>
      <Button value={bad + 1} setFeedback={setBad} text={"bad"}/>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App