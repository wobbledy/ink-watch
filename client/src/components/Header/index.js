import React from 'react';
import { Link } from 'react-router-dom';
// import Images from '../../images/logo.png'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        {/* <img src={Images} alt='Logo' width='250px' className='Images'></img> */}
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Ink Watch</h1>
          </Link>
          {/* <p className="m-0">Find Your Ink</p> */}
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
                <Link className="btn btn-lg btn-info m-2" to="/me" style={{ position: 'absolute', left: '0' }}>
                  {Auth.getProfile().data.username}'s profile
                </Link>

              {/* <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link> */}
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
      </header>
    </header>
  );
};

export default Header;
