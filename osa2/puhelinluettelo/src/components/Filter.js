const Filter = (props) => {
    return (
        <div>
        filter list:
        <input
          name="filter"
          value={props.filter}
          onChange={props.handleFilterChange} />
      </div>
    )
}
export default Filter