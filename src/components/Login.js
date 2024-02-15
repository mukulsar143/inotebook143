import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {
  const [creadiantials, setCrediantials] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleonSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: creadiantials.username,
        password: creadiantials.password,
      }),
    });

    let json = await res.json();
    if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/home");
        props.showAlert("Log In Successfully", "success");
    } else {
      props.showAlert("Invalid credientials..", "danger");
    }
  };

  const handleonChange = (e) => {
    setCrediantials({ ...creadiantials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <div className="card-body">
        <h5 className="card-title">Log In to Continue Home Page.. </h5>

        <form onSubmit={handleonSubmit}>
          <div className="row mb-3 my-3">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="username"
                value={creadiantials.username}
                onChange={handleonChange}
                minLength={5}
                required
                id="username"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                minLength={5}
                required
                value={creadiantials.password}
                onChange={handleonChange}
                type="text"
                className="form-control"
                id="inputPassword"
                name="password"
              />
            </div>
          </div>

          <div className="text-center">
            <button disabled = {creadiantials.username.length < 5 || creadiantials.password.length < 5} type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
          <p className="my-3 align-left">
            {" "}
            If Doesn't Account <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
