import React, { Component } from 'react'
import ListOneBook from './ListOneBook'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Debounce } from 'react-throttle'

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    showingBooks: []
  }

  // Sets the shelf for the books found by search
  setShelf = (books) => {
    const hashTable = {}
    this.props.books.forEach((book) => {
      hashTable[book.id] = book.shelf
    })
    books.forEach((b) => {
      b.shelf = hashTable[b.id] || 'none'
    })
  }

  // As search query changes, this updates list of books found by search
  updateQuery = (query) => {
    BooksAPI.search(query, 20)
      .then((books) => {
        this.setShelf(books)
        this.setState({
          query: query,
          showingBooks: books
        })
      })
      .catch((rej) => {
        this.setState({
          query: '',
          showingBooks: []
        })
      })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* Go to start page */}
          <Link 
            className="close-search"
            to="/">
            Close
          </Link>
          {/* Input field to type in search query */}
          <div className="search-books-input-wrapper">
            <Debounce time="300" handler="onChange">
              <input 
                type="text" 
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* List books found by search */}
            {this.state.showingBooks.map((book) => (
                <ListOneBook 
                  book={book} 
                  shelfCode={book.shelf} 
                  onChangeShelf={this.props.onChangeShelf}
                  key={book.id}
                />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks