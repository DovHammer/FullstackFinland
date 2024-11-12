const Header = (props) =>{
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (info) =>{
  return(
    <div>
      <p>
        {info.parts.name} {info.parts.exercises}
      </p>
    </div>
  )
}

const Content = (info) =>{
  return(
    <div>
      <Part parts = {info.parts[0]} />
      <Part parts = {info.parts[1]} />
      <Part parts = {info.parts[2]} />
    </div>
    
  )
}

const Total = (exercises) =>{
  return(
    <div>
      <p>Number of exercises {exercises.parts[0].exercises + exercises.parts[1].exercises + exercises.parts[2].exercises}</p>
    </div>
    
  )
}
const App = () => {
  const course = {
    name : 'Half Stack application development', 
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises:  14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} /> 
      <Total parts = {course.parts} />
    </div>
  )
}

export default App