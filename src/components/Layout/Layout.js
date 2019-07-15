import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import './Layout.css';

// Layout of the website, with header
function Layout(props) {
  return (
    <Fragment>
      <div className="header">
        <div className="header-btn-container centered-content">
          <Link className="header-btn" to="/stocks">COMPARE</Link>
          <Link className="header-btn" to="/buy">BUY</Link>
          <Link className="header-btn" to="/mycart">MY CART</Link>
        </div>
      </div>
      <div className="main-container centered-content">
        {props.children}
      </div>
    </Fragment>
  )
}

export default Layout;
