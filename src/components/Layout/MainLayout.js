import React, { Component } from 'react'
import HeaderContainer from './HeaderContainer'
import Footer from './Footer'

class MainLayout extends Component {
  shouldComponentUpdate() {
    // ref: https://reactpatterns.com/#layout-component
    return false;
  }

  render() {
    return (pug`
      .container-fluid
        HeaderContainer/
        = this.props.children
        Footer/
    `)
  }
}

export default MainLayout;
