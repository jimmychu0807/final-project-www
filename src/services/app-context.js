import React from 'react';

const AppContext = React.createContext({
  focusedPot: null,
  setContextAttr: (key, val) => {},
});

function withAppContextConsumer(Component) {
  return class extends React.Component {
    render() {
      return (
        <AppContext.Consumer>{ appContext =>
          <Component appContext={appContext} {...this.props} />
        }</AppContext.Consumer>
      );
    }
  }
}

export {AppContext as default, withAppContextConsumer };
