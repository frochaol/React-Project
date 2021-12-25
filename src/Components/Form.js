import React from 'react';

const Form = ({book, setBook}) => {

    const handleChange = e => {
        setBook({
            ...book, 
            [e.target.name]: e.target.value
        });
    };

    let {title, autor, edition} = book

    const handleSubmit = () => {
        // Data Validation
        edition = parseInt(edition, 10);
        if (title === '' || autor === '' || edition <= 0 ) {
            alert('Todos los campos necesitan un valor válido');
            return
        }

        // Get API
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        };

        fetch('http://localhost:9000/api', requestInit)
        .then( res => res.text())
        .then( res => console.log(res));

        // Cleaning book form
        setBook({
            title: '',
            autor: '',
            edition: 0
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor='title' className='form-label'>Title</label>
                <input value={title} name='title' onChange={handleChange} type="text" id="title" className='form-control'/>
            </div>

            <div className="mb-3">
                <label htmlFor='autor' className='form-label'>Autor</label>
                <input value={autor} name='autor' onChange={handleChange} type="text" id="autor" className='form-control'/>
            </div>

            <div className="mb-3">
                <label htmlFor='edition' className='form-label'>Edition</label>
                <input value={edition} name='edition' onChange={handleChange} type="number" id="edition" className='form-control'/>
            </div>

            <button type='submit' className='btn btn-primary'> Submit </button>
        </form>
    );
}

export default Form;