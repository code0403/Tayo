import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editContact } from '../redux/contactSlice';
import { useUpdateContactMutation, useGetContactQuery } from '../api/contactApi';
import { Link } from 'react-router-dom';



const ContactEdit = () => {
    const { id } = useParams<{ id:any }>();
    const dispatch = useDispatch();

    const { data: contact } = useGetContactQuery(id);
    const updateContactMutation = useUpdateContactMutation();

   const [firstName, setfirstName] = useState('');
   const [lastName, setlastName] = useState('');
   const [email, setEmail] = useState('');
   const [status, setStatus] = useState("")
  

  useEffect(() => {
    if (contact) {
      setfirstName(contact.firstName);
      setlastName(contact.lastName);
      setEmail(contact.email);
      setStatus(contact.status)
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedContact = {
      id:contact.id,
      firstName,
      lastName,
      email,
      status
    };

    try {
      await updateContactMutation.mutateAsync(updatedContact);

      dispatch(editContact(updatedContact)); // Update Redux store

      // Redirect or navigate back to the contacts list
    } catch (error) {
      console.error('An error occurred while updating the contact:', error);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} style={{border:"3px solid gray", margin:"auto", width:"50%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"10px", padding:"20px"}}>
      <label style={{fontSize:"24px"}}>
        First name:
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          style={{width:"250px", height:"30px", outline:"none"}}
        />
      </label>
      <br></br>
      <label style={{fontSize:"24px"}}>
        Last Name:
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          style={{width:"250px", height:"30px", outline:"none"}}
        />
      </label>
      <br></br>
      <label style={{fontSize:"24px"}}>
        Email:
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{width:"250px", height:"30px", outline:"none"}}
        />
      </label>
      <br></br>
      <div>
        Status:
        <input
          type="radio"
          name="status"
          value="Active"
          checked={status === "Active"}
          onChange={handleStatusChange}
          style={{width:"20px", height:"20px", outline:"none"}}
        />
        Active
        <input
          type="radio"
          name="status"
          value="Inactive"
          checked={status === "Inactive"}
          onChange={handleStatusChange}
          style={{width:"20px", height:"20px", outline:"none"}}
        />
        Inactive
      </div>
      <button type="submit" style={{width:"150px", height:"40px",fontSize:"18px", fontWeight:"500", background:"none", backgroundColor:"skyblue", border:"none", borderRadius:"10px", color:"#635353", cursor:"pointer", marginTop:"20px"}}>Save Contact</button>

      <Link to={"/"} style={{padding:"20px"}}><button style={{width:"150px", height:"40px", fontSize:"22px", fontWeight:"600", background:"none", border:"none", backgroundColor:"#2f3b4a", color:"#fff", borderRadius:"5px", cursor:"pointer"}}>Go back</button></Link>
    </form>



  )
}

export default ContactEdit
