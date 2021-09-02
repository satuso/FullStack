const Header = ({course}) => (<h1>{course.name}</h1>)

const Total = ({course}) => {
    let total = course.parts.map(item => item.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <p><b>total of {total} exercises </b></p>
    )
}

const Part = (props) => {
    return (
        <>
        <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
}

const Content = ({course}) => {
    return (
        <>
        {course.parts.map(part => 
        <Part key={part.id} part={part} />
        )}
        <Total course={course}/>
        </>
    )
}

const Course = ({course}) => {
    return (
        <>
        <Header course={course}/>
        <Content course={course}/>
        </>
    )
}

export default Course