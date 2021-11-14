import React, {useState} from "react";
import PropTypes from "prop-types";

function AddTodos({onCreate}) {
    const [value, setValue] = useState('')

    function submitHandler(event) {
        event.preventDefault()

        if (value.trim()) {
            onCreate(value)
            setValue('')
        }
    }



    return(
        <form style={{
            marginBottom: '1rem'
        }} onSubmit={submitHandler}>
            <input className="inputAdd" value={value} onChange={event => setValue(event.target.value)}/>
            <button type="submit" className="addBtn">Add todo</button>
        </form>
    )
}

AddTodos.prototype = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodos