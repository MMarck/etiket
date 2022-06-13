import { Component } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { backendURL } from '../config/constants';
import request from './ApiSetup';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: Cookies.get('accessToken') || '',
      isLoading: true,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    const { accessToken } = this.state;
    const header = {
      Authorization: `Bearer ${accessToken}`
    };
    const jsonData = {};
    request
      .post(`${backendURL}UsersDB/auth`, jsonData, {
        headers: header
      })
      .then(() => {
        // For success, update state like
        this.setState({ isLoading: false, isLoggedIn: true });
      })
      .catch(() => {
        // For fail, update state like
        this.setState({ isLoading: false, isLoggedIn: false });
      });
  }

  render() {
    const { isLoading } = this.state;
    const { isLoggedIn } = this.state;
    const { redirectTo } = this.props;

    if (isLoading) return null;
    if (isLoggedIn) {
      return <Outlet />;
    }
    return <Navigate to={redirectTo} />;
  }
}

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string
};

PrivateRoute.defaultProps = {
  redirectTo: ''
};
export default PrivateRoute;
