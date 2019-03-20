import React, { Component } from 'react'
import HeaderContainer from './HeaderContainer'
import Footer from './Footer'

class MainLayout extends Component {
  shouldComponentUpdate() {
    // ref: https://reactpatterns.com/#layout-component
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        { this.props.children }
        <Footer />
      </React.Fragment>
    )
  }
}

export default MainLayout;
