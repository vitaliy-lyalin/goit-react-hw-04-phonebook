import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import {
  AddContactButton,
  ContactFormWrapper,
  InputContactForm,
  LabelContactForm,
} from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = { id: nanoid(), name, number };
    onSubmit(newContact);
    setName('');
    setNumber('');
  };

  return (
    <ContactFormWrapper onSubmit={handleSubmit}>
      <LabelContactForm htmlFor="name">Name</LabelContactForm>
      <InputContactForm
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
      />
      <LabelContactForm htmlFor="number">Number</LabelContactForm>
      <InputContactForm
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        value={number}
      />
      <AddContactButton type="submit">Add contact</AddContactButton>
    </ContactFormWrapper>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
