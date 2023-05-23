import React, { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container, TitleContacts, TitleForm } from './App.styled';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

const localContacts = localStorage.getItem('contacts');

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localContacts) {
      setContacts(JSON.parse(localContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      Notify.warning(`${name} is already in contacts.`, { timeout: 1500 });
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts([...contacts, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setFilter('');
  };

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm onSubmit={addContact} />
      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};
