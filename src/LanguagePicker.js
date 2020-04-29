import React from 'react';
import PropTypes from 'prop-types';

function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'emoji', symbol: '😊' },
  ];

  const languageIcons = languages.map(item => (
    <span
      data-test="language-icon"
      key={item.code}
      onClick={() => setLanguage(item.code)}
    >
      {item.symbol}
    </span>
  ));

  return <div data-test="component-language-picker">{languageIcons}</div>;
}

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
