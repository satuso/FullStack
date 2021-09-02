const Header = ({course}) => (<h2>{course.name}</h2>)

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({course}) => {
    let total = course.parts.map(item => item.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <p><b>total of {total} exercises </b></p>
    )
}

const Content = ({course}) => {
    return (
        <>
        <Header course={course}/>
        {course.parts.map(part => 
        <Part key={part.id} part={part} />
        )}
        <Total course={course}/>
        </>
    )
}

const Course = ({courses}) => {
    return (
        <>
        {courses.map(course =>
        <Content key={course.id} course={course}/>
        )}
        </>
    )
}

export default Course