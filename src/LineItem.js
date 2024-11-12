import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({item, handleCheck, handleDelete}) => {
  return (
    <li className='item'>
        <input 
            type="checkbox" 
            onChange={() => handleCheck(item.id)}
            checked={item.checked}
        />
        <label
            style={ (item.checked) ? {textDecoration: 'line-through'} : null }
            onDoubleClick={() => handleCheck(item.id)}
        >
            { item.item }
        </label>
        {/* <button 
            onClick={() => handleDelete(item.id)} 
        > 
            Delete 
        </button> */}
        <FaTrashAlt 
            role='button'
            tabIndex="0"
            onClick={() => handleDelete(item.id)}
        />
    </li>
  )
}

export default LineItem;
