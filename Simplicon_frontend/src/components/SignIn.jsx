import React, { useState } from "react";
import Joi from "joi-browser";
import { Link, useHistory } from "react-router-dom";
import { signin, authenticate } from "../services/auth";

const SignIn = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [signingIn, setSigningIn] = useState(false);
  const history = useHistory();

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const res = Joi.validate(account, schema, options);

    if (!res.error) return null;

    const validationErrors = {};
    for (let item of res.error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    console.log("Form submitted");
    doSubmit();
  };

  const doSubmit = () => {
    setSigningIn(true);
    console.log("USER: ", account);
    signin({ email: account.email, password: account.password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, email: data.error }));
        } else {
          authenticate(data, () => {
            console.log("Authenticated successfully");
            history.push("/");
          });
        }
      })
      .catch((err) => {
        console.error("Error during sign-in:", err);
      })
      .finally(() => {
        setSigningIn(false);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="form-headings">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            value={account.email}
            onChange={handleChange}
            className="form-control input-field"
            id="email"
            name="email"
            type="text"
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={account.password}
            className="form-control input-field"
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <button className="btn btn-dark m-2" type="submit">
          {signingIn ? "SIGNING IN..." : "SIGN IN"}
        </button>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </form>
    </div>
  );
};

export default SignIn;
