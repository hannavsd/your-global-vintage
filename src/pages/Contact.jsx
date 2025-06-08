import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [selectedForm, setSelectedForm] = useState("buyer");
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    // Send form data via FormSubmit
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setFormSent(true);
          form.reset(); // optional: clears the form
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(() => alert("There was an error sending your message."));
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="form-toggle">
        <button
          className={selectedForm === "buyer" ? "active" : ""}
          onClick={() => {
            setSelectedForm("buyer");
            setFormSent(false);
          }}
        >
          Buyer
        </button>
        <button
          className={selected
