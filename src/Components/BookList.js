import React from 'react';

const BookList = ({book, books, setListUpdated, setBook}) => {

    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then( res => res.text())
        .then(res => console.log(res));

        setListUpdated(true);
    };

    let {title, autor, edition} = book;

    const handleUpdate = id => {
        // Data Validation
        edition = parseInt(edition, 10);
        if (title === '' || autor === '' || edition <= 0 ) {
            alert('Todos los campos necesitan un valor válido');
            return
        }

        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }

        fetch('http://localhost:9000/api/' + id, requestInit)
        .then( res => res.text())
        .then(res => console.log(res));

        // Cleaning book form
        setBook({
            title: '',
            autor: '',
            edition: 0
        });

        setListUpdated(true);
    }


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Autor</th>
                    <th>Edition</th>
                </tr>
            </thead>
            <tbody>
                {books.map( book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.autor}</td>
                        <td>{book.edition}</td>
                        <td >
                            <div className="mb-3">
                                <button onClick={() => handleDelete(book.id)} className='btn btn-danger'>Delete</button>                                
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(book.id)} className='btn btn-warning'>Update</button>
                            </div>
                        </td>
                        
                    </tr>
                    )
                )}
            </tbody>
        </table>
    );
}

export default BookList;