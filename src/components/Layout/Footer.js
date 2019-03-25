import React from 'react';

const Footer = (props) => {
  return (
    <footer>
      <hr/>
      Built with <span role='img' aria-label="love">❤️</span> by Jimmy Chu
    </footer>
  );
};

export default React.memo(Footer);
