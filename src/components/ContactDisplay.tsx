import React, {useState, useEffect} from 'react'
import Contact from '../types';
import { Link } from 'react-router-dom';
import { fetchContacts } from '../api/contactApi';
import ContactList from './ContactList';


const ContactDisplay = () => {
    const [contact, setContacts] =  useState<Contact[]>([]);

    useEffect(() => {
       fetchContacts().then((res) => {
        setContacts(res)
       })
    }, [])

  
  return (
    <div style={{width:"75%", height:"100dvh"}}>
      <Link to={"/contact/create"} style={{marginTop:"50px",display:"flex", justifyContent:"center", alignItems:"center", textDecoration:"none"}}><button style={{width:"150px", height:"50px",fontSize:"18px", fontWeight:"500", background:"none", backgroundColor:"skyblue", border:"none", borderRadius:"10px", color:"#635353", cursor:"pointer"}}>Create Contact</button></Link>
     {
      contact.length === 0 ? 
        <div style={{border:"3px solid red", margin:"auto", width:"50%", marginTop:"50px"}}>
          <div style={{marginTop:"50px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
            <p style={{fontSize:"24px", fontStyle:"oblique", display:"flex", alignItems:"center"}}> <span className="material-symbols-outlined" style={{fontSize:"30px", fontWeight:"500"}}>cancel</span> No Contact found.</p>
            <p style={{fontSize:"24px"}}>Please Add conatct from Add Create Contact Button.</p> 
          </div>
        </div> :
        
        <div style={{marginTop:"50px", display:"grid", gridTemplateColumns:"auto auto auto", rowGap:"50px"}}>
          {
          contact.map((contact) => (
            <ContactList key={contact.id} contact={contact} />
          ))
          }
        </div>
    }
    </div>
  )
}

export default ContactDisplay;
