import React from 'react';
import './footer.sass';

const SRC_REPOS = {
  overall: 'https://github.com/jimmychu0807/final-project/',
  truffle: 'https://github.com/jimmychu0807/final-project-truffle/',
  frontend: 'https://github.com/jimmychu0807/final-project-www/',
}

const Footer = (props) => {
  return (pug`
    footer.footer.text-center
      hr
      div Built with #[span(role='img' aria-label='love') ❤️] by Jimmy Chu
      div.
        src:
        ${ Object.entries(SRC_REPOS).map( ([key, repo]) =>
          pug`a(key=key href=repo target='_blank')= key`
        ).reduce( (arr, el) => [...arr, arr.length > 0 && ', ', el], [] ) }
  `);
};

export default React.memo(Footer);
