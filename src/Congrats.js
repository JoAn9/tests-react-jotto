import React from 'react';
import PropTypes from 'prop-types';

function Congrats(props) {
  const { success } = props;
  return success ? (
    <div data-test="component-congrats">
      <span data-test="message">Congrats!</span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  );
}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
