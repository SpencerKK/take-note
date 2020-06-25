import React from 'react';
import { Redirect } from 'react-router-dom';
import './Banner.css';

import { connect } from 'react-redux';

const Banner = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return <div className="banner"></div>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Banner);
