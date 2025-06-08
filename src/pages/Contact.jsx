import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [selectedForm, setSelectedForm] = useState("buyer");
  const [formSent, setFormSent] = useState(false);

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
          className={selectedForm === "seller" ? "active" : ""}
          onClick={() => {
            setSelectedForm("seller");
            setFormSent(false);
          }}
        >
          Seller
        </button>
      </div>

      {/* Buyer Form */}
      {selectedForm === "buyer" && !formSent && (
        <form
          className="contact-form"
          action="https://formsubmit.co/yourglobalvintage@gmail.com"
          method="POST"
          encType="multipart/form-data"
          onSubmit={() => setFormSent(true)}
        >
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="New message from Your Global Vintage buyer!"
          />
          <input type="hidden" name="_template" value="box" />

          <label>
            Name:
            <input type="text" name="name" required />
          </label>

          <label>
            Email:
            <input type="email" name="email" required />
          </label>

          <label>
            Message:
            <textarea name="message" rows={4} required></textarea>
          </label>

          <label>
            Optional File Upload:
            <input type="file" name="attachment" />
          </label>

          <button type="submit">Send</button>
        </form>
      )}

      {/* Thank you message */}
      {formSent && (
        <div className="thank-you-message">
          <h2>Thank you!</h2>
          <p>
            We have received your message and will get back to you as soon as we
            can.
          </p>
        </div>
      )}

      {/* Seller Form (Coming Soon) */}
      {selectedForm === "seller" && (
        <div className="seller-info">
          <p>Seller contact form coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
