import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query'; // Import useQuery
import { fetchContactDetails } from '../api/contactApi';
import  Contact  from '../types';

const ContactDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Use react-query's useQuery to fetch contact details
  const { data: contact, isLoading, isError } = useQuery<Contact | undefined>(['contact', id], () =>
    fetchContactDetails(Number(id))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !contact) {
    return <div>Contact not found</div>;
  }
  return (
    <div style={{margin: "auto", width:"30%", border:"3px solid gray", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    <div style={{padding:"10px"}}>
      <p style={{fontSize:"28px",fontWeight:"600", color:"red"}}>Contact Details</p>
      <p style={{fontSize:"22px",fontWeight:"600"}}>ID: <span style={{color:"blue"}}>{contact.id}</span></p>
      <p style={{fontSize:"22px",fontWeight:"600"}}>First Name: <span style={{color:"blue"}}>{contact.firstName}</span></p>
      <p style={{fontSize:"22px",fontWeight:"600"}}>Last Name: <span style={{color:"blue"}}>{contact.lastName}</span></p>
      <p style={{fontSize:"22px",fontWeight:"600"}}>Email: <span style={{color:"blue"}}>{contact.email}</span> </p>
      <p style={{fontSize:"22px",fontWeight:"600"}}>Status: <span style={{color:"blue"}}>{contact.status}</span></p>
    </div>

    <Link to={"/"} style={{padding:"20px"}}><button style={{width:"150px", height:"40px", fontSize:"22px", fontWeight:"600", background:"none", border:"none", backgroundColor:"#2f3b4a", color:"#fff", borderRadius:"5px", cursor:"pointer"}}>Go back</button></Link>

    </div>
  );
};

export default ContactDetails;
