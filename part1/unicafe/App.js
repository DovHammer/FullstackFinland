import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick = {handleClick}> {text} </button>
    
  )
}

const StatisticLine = ({ text, value}) => {
  return(
    <div>
      <tr>
        <td>
          {text} 
        </td>
        <td>
          {value}
        </td>
      </tr>

    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good * 1 + bad * -1) / total).toFixed(2);
  const positivePercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(1);

  if (total === 0) {
    return <p>No feedback given yet</p>
  }

  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positivePercentage}%`} />
        </tbody>
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() =>setGood(good +1)} text = 'good'/>
      <Button handleClick={() => setNeutral(neutral+1)} text = 'neutral' />
      <Button handleClick={() => setBad(bad+1)} text = 'Bad'/>
      <h2>statistics</h2>
      <Statistics good = {good} neutral={neutral} bad={bad}/>


    </div>
  )
}

export default App