import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TableGridView from "./TableGridView";
import KendoReactGridView from "./KendoReactGridView";

const ContactList = (props) => {
    const contactsPerPage = 10;
    const indexOfLastContact = props.currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = props.searchResults.slice(indexOfFirstContact, indexOfLastContact);

    const paginate = (pageNumber) => {
        props.setPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.searchResults.length / contactsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    const getSearchTerm = () => {
        props.searchKeyWord(inputEl.current.value);
    };

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };
    const inputEl = useRef("");
    const [gridView, setGridView] = useState(false);

    const toggleGridView = () => {
        setGridView(!gridView);
    };

  
  return (
    <div className="main">
        <div className="contact-container">
            <h2 className="contact-heading">
                Contact List
                <Link to="/add">
                    <button className="buttonStyle">Add Contact</button>
                </Link>
            </h2>
        </div>
        <div className="search-container">
            <div className="ui">
                <div className="search">
                    <input
                    className="prompt"
                    type="text"
                    placeholder="Search Contacts"
                    value={props.term}
                    onChange={getSearchTerm}
                    />
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                </div>
            </div>
        </div>
        <div>
            <label>
                view:
                <select value={gridView ? "kendo" : "normal"} onChange={toggleGridView}>
                    <option value="normal">Normal Grid View</option>
                    <option value="kendo">KendoReact Grid View</option>
                </select>
            </label>
        </div>
        {gridView ? (
            <KendoReactGridView currentContacts={currentContacts}  deleteContactHandler={deleteContactHandler}  />
            ) : (
            <TableGridView currentContacts={currentContacts} deleteContactHandler={deleteContactHandler} />
        )}
        <div className="pagination" style={{ marginTop: "20px" }}>
            {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)}>
                {number}
            </button>
            ))}
            <button style={{display: "flex", alignItems:"center", justifyContent:"space-between"}} >LogOut</button>
        </div>
    </div>
  );
};

export default ContactList;
