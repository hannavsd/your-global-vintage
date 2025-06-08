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
    } else if (userLang.startsWith("en")) {
      setLang("en");
    } else {
      setLang("en"); // fallback
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
          type="button"
          className={selectedForm === "buyer" ? "active" : ""}
          onClick={() => {
            setSelectedForm("buyer");
            setFormSent(false);
          }}
        >
          {t.buyer}
        </button>
        <button
          type="button"
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

          <label htmlFor="name">{t.name}:</label>
          <input id="name" type="text" name="name" required />

          <label htmlFor="email">{t.email}:</label>
          <input id="email" type="email" name="email" required />

          <label htmlFor="message">{t.message}:</label>
          <textarea id="message" name="message" rows={4} required></textarea>

          <label htmlFor="attachment">{t.upload}:</label>
          <input id="attachment" type="file" name="attachment" />

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