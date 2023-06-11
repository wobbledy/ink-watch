import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // if(name !== "email"){
      setFormState({ 
        ...formState, 
        [name]: value 
      });
    //   return
    // }
    // if(value.includes("@")){
    //   setFormState({
    //     ...formState,
    //     email: value,
    //   })
    // } else {
    //   setFormState({
    //     ...formState,
    //     email: "",
    //     username: value
    //   })
    // }
  };
  // console.log(formState)

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("FORMSTATE VARIABLE", formState);

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    
    try {
      const {data} = await login({
        variables: { ...formState },
      });

     
      Auth.login(data.loginUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      // email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
  <div className="col-12 col-lg-10">
    <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px', border: 'none' }}>
      <h4 className="card-header bg-dark text-light p-2" style={{ borderRadius: '8px 8px 0 0', marginBottom: '0', fontSize: '1.2rem' }}>Login</h4>
      <div className="card-body" style={{ borderBottom: '1px solid #eee' }}>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
