import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SetHtmlLang = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
};

export default SetHtmlLang;
