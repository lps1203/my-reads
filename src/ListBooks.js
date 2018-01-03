import React from 'react'
import ListOneBook from './ListOneBook'
import { shelfInfo } from './App'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Lists books on three shelves
const ListBooks = (props) =>
 (
  <div className="list-books">
    {/* Title for the page */}
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {/* Loop over the three shelves */}
        {shelfInfo.shelves.map((shelf, index) => (                                                          
          <div className="bookshelf" key={index}>
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {/* Pick books for the shelf and display them */}
                {props.books.filter((book) => book.shelf === shelfInfo.shelfCodes[index] ).map((book) => (
                  <ListOneBook 
                    book={book} 
                    shelfCode={shelfInfo.shelfCodes[index]} 
                    onChangeShelf={props.onChangeShelf}
                    key={book.id}
                  />
                ))}
              </ol>
            </div>
          </div>    
        ))}
      </div>
    </div>
    {/* Go to search page */}
    <div className="open-search">
      <Link to="/search">
        Add a book
      </Link>
    </div>
  </div>
)

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default ListBooks