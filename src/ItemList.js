import React from 'react';
import LineItem from './LineItem';

const ItemList = ({items, handleCheck, handleDelete}) => {
  return (
    <ul>
        { items.map((item) => (
            <LineItem 
                item = {item}
                // Each child item in a list must have a unique "key" prop
                // Once passed in here, you don't need to repeat yourself in the LineItem component itself.
                key = {item.id}
                handleCheck = {handleCheck}
                handleDelete = {handleDelete}
            />
        )) }
    </ul>
  )
}

export default ItemList;
