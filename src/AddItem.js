import React from 'react';
import './index.css';
import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add item</label>
        <input 
            autoFocus
            ref={inputRef}
            id='addItem'
            type='text' 
            placeholder='Add item'
            required
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
        />
        <button
            className='add-btn'
            type='submit'
            aria-label='Add Item'
            onClick={() => inputRef.current.focus()}
        >
            {/* Add Item */}
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem;
