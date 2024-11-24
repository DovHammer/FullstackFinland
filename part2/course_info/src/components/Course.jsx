

const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>
}
  
const Total = ({ sumOfExercises }) => {
    return <p><b>total of {sumOfExercises} exercises</b></p>
}

const Part = ({ part, exercises }) => {
    return (
        <p>
        {part} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map(part =>
            <Part key = {part.id} part = {part.name} exercises={part.exercises}/> 
        )}
        </div>
    )
}

const Course = ({course}) => {
    return(
        <div>
        <Header courseName = {course.name}/>
        <Content parts = {course.parts}/>
        <Total sumOfExercises={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
        </div>
    )
}

export default Course