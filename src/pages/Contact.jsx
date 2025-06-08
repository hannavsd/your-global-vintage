import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();
  const [formSent, setFormSent] = useState(false);
  const [activeForm, setActiveForm] = useState("buyer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xovwejpq", {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>{t("contactForm.title")}</h2>

      <div className="contact-toggle">
        <button
          className={activeForm === "buyer" ? "active" : ""}
          onClick={() => setActiveForm("buyer")}
        >
          {t("contactForm.buyer")}
        </button>
        <button
          className={activeForm === "seller" ? "active" : ""}
          onClick={() => setActiveForm("seller")}
        >
          {t("contactForm.seller")}
        </button>
      </div>

      {formSent ? (
        <div>
          <h3>{t("contactForm.thankYou")}</h3>
          <p>{t("contactForm.thankMsg")}</p>
        </div>
      ) : (
        <>
          {activeForm === "buyer" ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">{t("contactForm.name")}</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">{t("contactForm.email")}</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">{t("contactForm.message")}</label>
              <textarea id="message" name="message" required />

              <label htmlFor="file">{t("contactForm.upload")}</label>
              <input type="file" id="file" name="file" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("contactForm.sending") : t("contactForm.send")}
              </button>
            </form>
          ) : (
            <p>{t("contactForm.sellerComing")}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Contact;
