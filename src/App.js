import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar';
import BookList from './Components/BookList';
import Form from './Components/Form';

function App() {
  // Creation of a new state for the form 
  const [book, setBook] = useState({
    title: '',
    autor: '',
    edition: 0
  });

  // Creation of a new state that gets all the books
  const [books, setBooks] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getBooks = () => {
      fetch('http://localhost:9000/api')
        .then( res => res.json())
        .then( res => setBooks(res));
    };
    getBooks()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='Library App'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Book List</h2>
            <BookList book={book} books={books} setListUpdated={setListUpdated} setBook={setBook}/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Book Form</h2>
            <Form book={book} setBook={setBook}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
