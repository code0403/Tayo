
// contactApi.ts
import { useQuery } from 'react-query';
// contactApi.ts
import { useMutation } from 'react-query';

import Contact from "../types"



export const fetchContacts = async () => {
  // Fetch contacts data from an API
  const response = await fetch('http://localhost:8080/contacts');
  const data = await response.json();
  console.log(data)
  return data;
};

export const useContactsQuery = () => {
  return useQuery('contacts', fetchContacts);
};




export const createContact = async (newContact: Contact): Promise<Contact> => {
  // Perform POST request to create a new contact
  const response = await fetch('http://localhost:8080/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContact),
  });

  const data = await response.json();
  return data; // Return the created contact data
};

export const useCreateContactMutation = () => {
  return useMutation(createContact);
};





export const editContact = async (updatedContact:Contact) => {
    console.log(updatedContact)
  const response = await fetch(` http://localhost:8080/contacts/${updatedContact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContact),
  });

  const data = await response.json();
  return data; // Return the updated contact data
};

export const useUpdateContactMutation = () => {
  return useMutation(editContact);
};

// Add a new query to get a single contact by ID
export const useGetContactQuery = (contactId:Contact) => {
  return useQuery(['contact', contactId], async () => {
    const response = await fetch(` http://localhost:8080/contacts/${contactId}`);
    const data = await response.json();
    return data;
  });
};





export const deleteContact = async (contactId: string) => {
  const response = await fetch(`http://localhost:8080/contacts/${contactId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return contactId; // Return the deleted contact's ID
  } else {
    throw new Error('Failed to delete contact');
  }
};

export const useDeleteContactMutation = () => {
  return useMutation(deleteContact);
};



export const fetchContactDetails = async (contactId: number) => {
  const response = await fetch(`http://localhost:8080/contacts/${contactId}`);
  const data = await response.json();
  return data;
};




