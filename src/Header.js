import React from 'react'
import './index.css';

const Header = (props) => {
    // const headerStyle = {
    //     backgroundColor: "mediumblue",
    //     color: "white",
    // };

    return (
    <header>
        <h1>{props.title}</h1>
    </header>
    )
}

// Header.defaultProps = {
//     title: "Default Title"
// }

export default Header;
