import React from 'react';

const Footer = ({ length }) => {
    // const date = new Date();

    return (
        <footer>
            {/* <p>Copyright &copy; { date.getFullYear() }</p> */}
            <p>{length} list { length === 1 ? "item" : "items" }</p>
        </footer>
    )
}

export default Footer;
