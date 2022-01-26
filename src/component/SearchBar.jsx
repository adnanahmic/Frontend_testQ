import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ propMessage, onChange }) {
  const BarStyling = {
    width: '20rem', background: '#F2F1F9', border: 'none', padding: '0.5rem',
  };
  console.log(`${propMessage} SearchBar`);
  return (
    <input
      style={BarStyling}
      placeholder="search post"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
SearchBar.propTypes = {
  propMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar
