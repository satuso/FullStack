const Total = ({course}) => {
    let total = 0
    for (let i = 0; i < course.parts.length; i++){
        total += course.parts[i].exercises
    }
    return (
        <p><b>total of {total} exercises </b></p>
    )
}

export default Total