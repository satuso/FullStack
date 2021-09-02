const Header = (props) => (<h1>{props.course.name}</h1>)

const Total = ({course}) => {
    let total = 0
    for (let i = 0; i < course.parts.length; i++){
        total += course.parts[i].exercises
    }
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