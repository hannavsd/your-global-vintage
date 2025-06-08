import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [selectedForm, setSelectedForm] = useState("buyer");
  const [formSent, setFormSent] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("no")) {
      setLang("no");
    } else {
      setLang("en");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          setFormSent(true);
          form.reset();
        } else {
          alert(lang === "no" ? "Noe gikk galt." : "Something went wrong.");
        }
      })
      .catch(() => {
        alert(lang === "no" ? "Feil ved innsending." : "There was an error.");
      });
  };

  const text = {
    en: {
      title: "Contact Us",
      buyer: "Buyer",
      seller: "Seller",
      name: "Name",
      email: "Email",
      message: "Message",
      upload: "Optional File Upload",
      send: "Send",
      thankYou: "Thank you!",
      thankMsg: "We have received your message and will get back to you as soon as we can.",
      sellerComing: "Seller contact form coming soon!",
    },
    no: {
      title: "Kontakt Oss",
      buyer: "Kjøper",
      seller: "Selger",
      name: "Navn",
      email: "E-post",
      message: "Melding",
      upload: "Valgfritt filopplastning",
      send: "Send",
      thankYou: "Takk!",
      thankMsg: "Vi har mottatt meldingen din og vil kontakte deg så snart vi kan.",

