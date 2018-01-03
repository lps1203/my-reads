import React from 'react'
import PropTypes from 'prop-types'

// Displays a book
const ListOneBook = (props) => (
  <li>
    <div className="book">
      <div className="book-top">
        {props.book.imageLinks.thumbnail && 
          <div 
            className="book-cover" 
            style={{ backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}>
          </div>        
        }
        {/* Dropdown list to choose new shelf */}
        <div className="book-shelf-changer">
          <select defaultValue={props.shelfCode} onChange={(event) => props.onChangeShelf(props.book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors? props.book.authors.join('\n') : 'Unknown'}</div>
    </div>
  </li>
)

ListOneBook.propTypes = {
  book: PropTypes.object.isRequired,
  shelfCode: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default ListOneBook
