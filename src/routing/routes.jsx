import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactDetails from '../components/ContactDetails'
import ContactDisplay from '../components/ContactDisplay'
import ContactCreate from '../components/ContactCreate'
import ContactEdit from '../components/ContactEdit'
import ChartsMaps from '../dashboardComponent/Charts_Maps'

const ContactRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ContactDisplay /> } ></Route>
        <Route path='/contact/create' element={ <ContactCreate /> }></Route>
        <Route path="/contact/edit/:id" element={ <ContactEdit /> } ></Route>
        <Route path="/contact/details/:id" element={ <ContactDetails /> } ></Route>
        <Route path='/charts' element={<ChartsMaps />} ></Route>
    </Routes>
  )
}

export default ContactRoutes;
