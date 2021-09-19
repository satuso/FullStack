const PersonForm = (props) => {
    return (
        <>
        <h2>Add new</h2>
        <form onSubmit={props.handleSubmit}>
            <div>
            name:
            <input 
                name="name"
                value={props.newName} 
                onChange={props.handleNameChange}
                maxlength="30"
            />
            <br />
            number:
            <input 
                name="number"
                value={props.newNumber} 
                onChange={props.handleNumberChange}
                maxlength="20"
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}
export default PersonForm