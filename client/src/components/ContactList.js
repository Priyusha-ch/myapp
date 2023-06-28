import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ContactList = () => {
  
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
                    />
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactList;
