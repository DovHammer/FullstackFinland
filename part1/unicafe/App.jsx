import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick = {handleClick}> {text} </button>
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
      <h1>statistics</h1>
      <p>good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad}</p> <br></br>


    </div>
  )
}

export default App