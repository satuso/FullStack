const Persons = ({person, handleDelete}) => {
    return (
        <div className="contacts">
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
    )
}
export default Persons