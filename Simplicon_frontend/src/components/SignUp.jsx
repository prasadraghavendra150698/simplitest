import React, { useState } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { signup } from "../services/auth";

const SignUp = () => {
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [signingUp, setSigningUp] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const schema = {
    username: Joi.string().required().min(5).label("Username"),
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

    console.log("User account created");
    doSubmit();
  };

  const doSubmit = () => {
    setSigningUp(true);

    signup({
      username: account.username,
      email: account.email,
      password: account.password,
    })
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log("Error during signup: ", data.error);
          setErrors((prevErrors) => ({ ...prevErrors, username: data.error }));
        } else {
          console.log("Account created successfully");
          setAccount({ username: "", email: "", password: "" });
          setAccountCreated(true);
        }
      })
      .catch((err) => {
        console.error("Signup error: ", err);
      })
      .finally(() => {
        setSigningUp(false);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="form-headings">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            value={account.username}
            onChange={handleChange}
            className="form-control input-field"
            id="username"
            name="username"
            type="text"
          />
          {errors.username && <p className="text-danger">{errors.username}</p>}
        </div>
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
            onChange={handleChange}
            className="form-control input-field"
            id="password"
            name="password"
            type="password"
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <button className="btn btn-dark mr-2" type="submit">
          {signingUp ? "SIGNING UP..." : "SIGN UP"}
        </button>
        <Link to="/signin">Already have an account? Sign in</Link>
        {accountCreated && (
          <p className="text-success">
            Account Created Successfully! Please sign in.
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
