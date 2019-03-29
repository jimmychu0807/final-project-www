import React from 'react';
import './Footer.sass';

const Footer = (props) => {
  return (pug`
    footer.footer.text-center
      hr
      div.
        Built with #[span(role='img' aria-label='love') ❤️] by Jimmy Chu.
      div.
        src: #[a(href='https://github.com/dev-bootcamp-2019/final-project-jimmychu0807/' target='_blank') overall], #[a(href='https://github.com/jimmychu0807/final-project-truffle/' target='_blank') truffle], #[a(href='https://github.com/jimmychu0807/final-project-www/' target='_blank') frontend]
  `);
};

export default React.memo(Footer);
