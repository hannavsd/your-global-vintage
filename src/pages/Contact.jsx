import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [selectedForm, setSelectedForm] = useState("buyer");
  const [formSent, setFormSent] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    setLang(userLang.startsWith("no") ? "no" : "en");
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
      upload: "Valgfri filopplasting",
      send: "Send",
      thankYou: "Takk!",
      thankMsg: "Vi har mottatt meldingen din og vil kontakte deg så snart vi kan.",
      sellerComing: "Selgerskjema kommer snart!",
    },
  };

  const t = text[lang];

  return (
    <div className="contact-container">
      <h1>{t.title}</h1>

      <div className="form-toggle">
        <button
          className={selectedForm === "buyer" ? "active" : ""}
          onClick={() => {
            setSelectedForm("buyer");
            setFormSent(false);
          }}
        >
          {t.buyer}
        </button>
        <button
          className={selectedForm === "seller" ? "active" : ""}
          onClick={() => {
            setSelectedForm("seller");
            setFormSent(false);
          }}
        >
          {t.seller}
        </button>
      </div>

      {selectedForm === "buyer" && !formSent && (
        <form
          className="contact-form"
          action="https://formsubmit.co/yourglobalvintage@gmail.com"
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* FormSubmit options */}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="New message from Your Global Vintage buyer!"
          />
          <input type="hidden" name="_template" value="box" />

          <label>
            {t.name}:
            <input type="text" name="name" required />
          </label>
          <label>
            {t.email}:
            <input type="email" name="email" required />
          </label>
          <label>
            {t.message}:
            <textarea name="message" rows={4} required></textarea>
          </label>
          <label>
            {t.upload}:
            <input type="file" name="attachment" />
          </label>
          <button type="submit">{t.send}</button>
        </form>
      )}

      {formSent && (
        <div className="thank-you-message">
          <h2>{t.thankYou}</h2>
          <p>{t.thankMsg}</p>
        </div>
      )}

      {selectedForm === "seller" && (
        <div className="seller-info">
          <p>{t.sellerComing}</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
