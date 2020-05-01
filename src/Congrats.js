import React from 'react';
import PropTypes from 'prop-types';
import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';

function Congrats(props) {
  const language = React.useContext(languageContext);
  const { success } = props;
  return success ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="message">
        {stringsModule.getStringByLanguage(language, 'congrats')}
      </span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  );
}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
