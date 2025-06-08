import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [selectedForm, setSelectedForm] = useState("buyer");
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    // Set HTML lang attribute to match selected language
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xoqgjjvd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setFormSent(true);
      } else {
        alert(t("contactForm.error"));
      }
    } catch (error) {
      alert(t("contactForm.errorSubmission"));
    }
  };

  return (
    <div className="contact-container">
      <h1>{t("contactForm.title")}</h1>

      <div className="contact-toggle">
        <button
          type="button"
          className={selectedForm === "buyer" ? "active" : ""}
          onClick={() => {
            setSelectedForm("buyer");
            setFormSent(false);
          }}
        >
          {t("contactForm.buyer")}
        </button>
        <button
          type="button"
          className={selectedForm === "seller" ? "active" : ""}
          onClick={() => {
            setSelectedForm("seller");
            setFormSent(false);
          }}
        >
          {t("contactForm.seller")}
        </button>
      </div>

      {selectedForm === "buyer" && !formSent && (
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">{t("contactForm.name")}:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">{t("contactForm.email")}:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">{t("contactForm.message")}:</label>
          <textarea id="message" name="message" required></textarea>

          <label htmlFor="file">{t("contactForm.upload")}:</label>
          <input type="file" id="file" name="file" />

          <button type="submit">{t("contactForm.send")}</button>
        </form>
      )}

      {selectedForm === "seller" && !formSent && (
        <p className="coming-soon">{t("contactForm.sellerComing")}</p>
      )}

      {formSent && (
        <div className="thank-you-message">
          <h2>{t("contactForm.thankYou")}</h2>
          <p>{t("contactForm.thankMsg")}</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
