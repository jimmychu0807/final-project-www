import React from 'react'

import PotsBoard from './PotsBoard'

class PotsBoardContainer extends React.Component {

  render() {
    return(pug`
      PotsBoard(...this.props)
    `)
  }
}

export default PotsBoardContainer;
