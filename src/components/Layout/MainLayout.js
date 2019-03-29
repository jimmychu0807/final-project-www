import React from 'react'
import HeaderContainer from './HeaderContainer'
import Footer from './Footer'

import './main-layout.sass';

class MainLayout extends React.Component {
  render() {
    return (pug`
      HeaderContainer
      .container-fluid.main-body
        = this.props.children
      Footer
    `)
  }
}

export default MainLayout;
