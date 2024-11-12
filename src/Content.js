import React from 'react';
import ItemList from './ItemList';

const Content = ({items, handleCheck, handleDelete}) => {
    // const handleNameChange = () => {
    //     const names = ["Ricky", "Pete", "Ruby"];
    //     const randInt = Math.floor(Math.random() * 3);
    //     // return names[randInt];
    //     setName(names[randInt]);
    // }

    // const handleClick = () => {
    //     console.log('You clicked it.');
    // }

    // const handleClick2 = ( name ) => {
    //     console.log(`${name} was clicked.`);
    // }

    // const handleClick3 = (e) => {
    //     console.log(e.target.innerText);
    // }

    return (
        // element-less blocks of code called fragments.
        <>
            { items.length ? (
                <ItemList 
                    items = {items}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete}
                />
            ) : (
                <p style={{marginTop: "3rem"}}>
                    Hey! Your shopping list is empty.
                </p>
            )}
        </>
    )
}

export default Content;
