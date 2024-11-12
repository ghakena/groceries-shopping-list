import './index.css';
import Header from './Header';
import SearchItems from './SearchItems';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
    const API_URL = 'http://localhost:3500/items';
    // 1. fetch default state from the localStorage. 
    // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

    // 2. fetch data from the JSON server.
    const [items, setItems] = useState([]);

    // state to handle adding new item.
    const [newItem, setNewItem] = useState('');

    // state to handle search for items.
    const [search, setSearch] = useState('');

    // state to handle fetch error
    const [fetchError, setFetchError] = useState(null);

    // state to handle loading
    const [isLoading, setIsLoading] = useState(true);

    // 1. we can then trigger useEffect to updates our localStorage and then load our items from localStorage whenever "items" is updated.
    // useEffect(() => {
    //   localStorage.setItem('shoppinglist', JSON.stringify(items));
    // }, [items])

    useEffect(() => {
      // create an async function inside of useEffect to fetch data from the available endpoint.
      const fetchItems = async () => {
        try {
          const response = await fetch(API_URL);
          // throw an error in case an ok response is not received.
          if(!response.ok) throw Error('No response received.'); 
          const listItems = await response.json();
          setItems(listItems);
          // in case of successful retrieval of data from the API_URL
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      // instantly invoked function expression (IIFE).
        // not necessary for functions with no return value. you could simply run fetchItems() and it would work just fine.
        // (async () => await fetchItems())();

      // a simulation of load-time with actual APIs.
      // setTimeout(() => {
      //   fetchItems();
      // }, 2000)

      fetchItems();
    }, [])

    // a function to add a new item to our shopping list.
    const addItem = async (item) => {
      // create an id for item to be added.
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      // give new item a structure (an object in this case).
      const myNewItem = {id, checked:false, item};
      // let new listItems array hold both older/existing items plus newly added item.
      const listItems = [...items, myNewItem];
      // update the state and save to local storage.
      // setItems(listItems);
      // localStorage.setItem('shoppinglist', JSON.stringify(listItems));
      setItems(listItems);

      // this is a post request, so we define the post options.
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myNewItem)
      }

      const result = await apiRequest(API_URL, postOptions);
      if (result) setFetchError(result);
    }

    const handleCheck = async (id) => {
        // console.log(`id: ${id}`);
        const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
        // setItems(listItems);
        // localStorage.setItem('shoppinglist', JSON.stringify(listItems));
        setItems(listItems);

        // deal with the particular item that is checked. returns an array.
        const myCheckedItem = listItems.filter((item) => item.id === id);
        // define update options for our API.
        const updateOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ checked: myCheckedItem[0].checked })
        };

        // define request url.
        const reqUrl = `${API_URL}/${id}`;
        // define result
        const result = await apiRequest(reqUrl, updateOptions);
        // in case of any error, update the error setter (setFetchError)
        if (result) setFetchError(result);
    }

    const handleDelete = async (id) => {
        // console.log(`key: ${id}`);
        const listItems = items.filter((item) => item.id !== id);
        // setItems(listItems);
        // localStorage.setItem('shoppinglist', JSON.stringify(listItems));
        setItems(listItems);

        // set delete options object for API request.
        const deleteOptions = { method: 'DELETE' };

        // define custom URL.
        const deleteReqUrl = `${API_URL}/${id}`;
        
        // make request.
        const result = await apiRequest(deleteReqUrl, deleteOptions);
        // if there's an error, store it in fetchError.
        if (result) setFetchError(result);
    }

    // a function to handle submission via input field.
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newItem) return;
      // console.log(newItem);
      // addItem
      addItem(newItem);
      setNewItem('');
    }

  return (
    <div className="App">
      <Header title="Groceries"/>
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItems 
        search = {search}
        setSearch = {setSearch}
      />
      <main>
        {isLoading && <p style={{color: 'blue', fontWeight: 'bold'}}>Loading items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
      <Footer length = {items.length}/>
    </div>
  );
}

export default App;