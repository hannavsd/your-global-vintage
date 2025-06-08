import React from 'react';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();
  return <h2>{t('checkout')}</h2>;
};

export default Checkout;
