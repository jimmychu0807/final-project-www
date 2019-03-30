import React from 'react';
import './footer.sass';

const Footer = (props) => {
  return (pug`
    footer.footer.fixed-bottom.text-center
      hr
      div.
        Built with #[span(role='img' aria-label='love') ❤️] by Jimmy Chu
      div.
        src:
        #[a(href='https://github.com/jimmychu0807/final-project' target='_blank') overall],
        #[a(href='https://github.com/jimmychu0807/final-project-truffle/' target='_blank') truffle],
        #[a(href='https://github.com/jimmychu0807/final-project-www/' target='_blank') frontend]
  `);
};

export default React.memo(Footer);
