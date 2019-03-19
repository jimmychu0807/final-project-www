import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

class MainLayout extends Component {
  shouldComponentUpdate() {
    // ref: https://reactpatterns.com/#layout-component
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        { this.props.children }
        <Footer />
      </React.Fragment>
    )
  }
}

export default MainLayout;
