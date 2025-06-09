// Checkout.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import './Checkout.css';

function Checkout() {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]); // Dummy cart for now
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleSubmit = () => {
    const templateParams = {
      ...form,
      cartItems: cart.map(item => `${item.name} (${item.price} NOK)`).join(', '),
      total: cart.reduce((sum, item) => sum + item.price, 0),
    };

    emailjs.send('service_8i4k36n', 'template_0sxme29', templateParams, 'n1eu0KvA5kToIHZ-Y')
      .then(() => {
        setConfirmation(t('cart.thankYouMsg'));
        setCart([]);
      })
      .catch(() => alert('Noe gikk galt. Prøv igjen.'));
  };

  return (
    <div className="checkout-container">
      <h1>{t('cart.title')}</h1>

      <div className="cart-box">
        {cart.length === 0 ? (
          <p>{t('cart.empty')}</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price} NOK
                <button onClick={() => handleRemove(index)}>X</button>
              </li>
            ))}
          </ul>
        )}
        <p className="total">{t('cart.total')}: {cart.reduce((sum, item) => sum + item.price, 0)} NOK</p>
      </div>

      <div className="form-box">
        <input type="text" placeholder={t('cart.name')} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="tel" placeholder={t('cart.phone')} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input type="email" placeholder={t('cart.email')} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder={t('cart.address')} onChange={e => setForm({ ...form, address: e.target.value })} />

        <select onChange={e => setPaymentMethod(e.target.value)}>
          <option value="">{t('cart.choosePayment')}</option>
          <option value="paypal">PayPal</option>
          <option value="vipps">Vipps</option>
        </select>

        {paymentMethod && (
          <button onClick={handleSubmit}>
            {paymentMethod === 'paypal' ? t('cart.buyWithPaypal') : t('cart.buyWithVipps')}
          </button>
        )}
      </div>

      {confirmation && <p className="confirmation-msg">{confirmation}</p>}
    </div>
  );
}

export default Checkout;
