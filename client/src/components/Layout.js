import React, { Component } from 'react';
import Header from './Header';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="px-2 sm:px-4 py-3">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;