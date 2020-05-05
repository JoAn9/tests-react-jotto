import React from 'react';
import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

function Congrats(props) {
  const language = React.useContext(languageContext);
  const [success] = successContext.useSuccess();
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

export default Congrats;
