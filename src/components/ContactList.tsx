// ContactList.tsx
import React from "react";
import { Link } from "react-router-dom";
import Contact from "../types";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contactSlice";
import { useDeleteContactMutation } from "../api/contactApi";

interface ContactListProps {
  contact: Contact;
}

const ContactList: React.FC<ContactListProps> = ({ contact }) => {
  const { id, firstName } = contact;

  const dispatch = useDispatch();
  const deleteContactMutation = useDeleteContactMutation();

  const handleDelete = async () => {
    try {
      if (id !== undefined) {
        let Id = String(id);
        await deleteContactMutation.mutateAsync(Id);
        dispatch(deleteContact(id)); // Update Redux store
      }
    } catch (error) {
      console.error("An error occurred while deleting the contact:", error);
    }
  };

  return (
    <div
      key={id}
      style={{
        width: "50%",
        height:"100%",
        border: "3px solid gray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap:"10px",
        borderRadius:"10px"
      }}
    >
      <img
        src="https://dummyimage.com/100x100/2c323c/86868e.jpg&text=Contact"
        alt="contact"
      />
      <p style={{fontSize:"20px"}}>{firstName}</p>
      <Link to={`/contact/edit/${id}`}>
        <button style={{width:"100px", height:"25px", background:"none", backgroundColor:"red", border:"none", borderRadius:"5px", color:"#fff"}}>Edit</button>
      </Link>

      <button onClick={handleDelete} style={{width:"100px", height:"25px", background:"none", backgroundColor:"#94b4f1", border:"none", borderRadius:"5px", color:"#fff"}}>Delete</button>
      <Link to={`/contact/details/${id}`}><button style={{width:"100px", height:"25px", background:"none", backgroundColor:"#e5a986f6", border:"none", borderRadius:"5px", color:"#fff"}}>Details</button></Link>
    </div>
  );
};

export default ContactList;
