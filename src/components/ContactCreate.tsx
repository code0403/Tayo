import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/contactSlice";
import { useCreateContactMutation } from "../api/contactApi";

const ContactCreate = () => {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Active");

  const createContactMutation = useCreateContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      firstName,
      lastName,
      email,
      status,
    };

    try {
      const createdContact = await createContactMutation.mutateAsync(
        newContact
      );

      dispatch(addContact(createdContact));

      // Clear form inputs
      setfirstName("");
      setlastName("");
      setEmail("");
    } catch (error) {
      console.error("An error occurred while creating the contact:", error);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{border:"3px solid gray", margin:"auto", width:"50%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"10px", padding:"20px"}}>
      <label style={{fontSize:"24px"}}>First name:
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          style={{width:"250px", height:"30px", outline:"none"}}
        /></label>
      
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
      <div style={{fontSize:"24px"}}>
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
    </form>
  );
};

export default ContactCreate;
