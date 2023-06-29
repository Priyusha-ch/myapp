import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchContacts, addContact, deleteContact } from "../api/contacts";
import Home from "./Home";
import SignUp from "./SignUp";
import ContactDetail from "./ContactDetail";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedContacts || [];
  });

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await fetchContacts();
        const allContacts = response.data;
        setContacts(allContacts);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };
  
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = async (contact) => {
    const customId = `contact${contacts.length + 1}`;
    const request = {
      id: customId,
      ...contact,
    };
  
    try {
      const response = await addContact(request);
      const insertedId = response.data;
      console.log(`Contact added with ID: ${insertedId}`);
      const updatedContacts = [...contacts, request];
      setContacts(updatedContacts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };
  
  const searchHandler = (serachTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join("")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    };
  };
  const removeContactHandler = async (id) => {
    await deleteContact(id);
    const newContactList = contacts.filter((contact) => contact.id !==id);
    setContacts(newContactList);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  };

  return (
    <Router>
      <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
        {!isAuthenticated && <Route path="/login" element={<Login/>}/>}
        {!isAuthenticated && <Route path="/sign_up" element={<SignUp/>}/>}
        {!isAuthenticated && <Route path="/contact-list" 
                  element={
                  <ContactList
                    searchResults={searchTerm.length < 1 ? contacts : searchResults}
                    getContactId={removeContactHandler}
                    term={searchTerm}
                    searchKeyWord={searchHandler}
                    currentPage={currentPage} setPage={setCurrentPage} 
                  />}
        />}
        {isAuthenticated && <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />}
        {isAuthenticated && <Route path="/contact/:id" element={<ContactDetail contacts={contacts}/>}/>}
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
