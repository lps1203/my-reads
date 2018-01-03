import React, { Component } from 'react'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

export const shelfInfo = {
  shelves: ['Currently Reading', 'Want to Read', 'Read'],
  shelfCodes: ['currentlyReading', 'wantToRead', 'read', 'none']  
}

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    // fetch all books from database, updata state, finally, render
    BooksAPI.getAll().then((books) => 
      this.setState({ books })
  )}

  changeShelf = (book, newShelfCode) => {
    // change book's shelf
    book.shelf = newShelfCode
    // update database, update state
    BooksAPI.update(book, newShelfCode).then(res => {
      this.setState(state => ({
        books: this.state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
    // jump back to top of screen
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="app">
        {/* show three shelves of books */}
        <Route exact path="/" render={() => (
          <ListBooks 
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />          
        )} />
        {/* go to search page */}
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeShelf={this.changeShelf}          
          />
        )} />
      </div>
    )
  }
}

export default App