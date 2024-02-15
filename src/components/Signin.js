import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signin(props) {

    const [crediantials, setCredientials] = useState({first_name : '', last_name : '', username : '', password : ''})
    let navigate = useNavigate()

   const handleonSubmit = async(e) => {

      e.preventDefault()
      const {first_name, last_name, username, password} = crediantials
  
      const res = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
          method : "POST",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({first_name, last_name, username, password})
      });
      let json = await res.json()
      if (json.success) {
          navigate("/login"); 
          props.showAlert("Sign In Successfully", "success")     
      } else {
          props.showAlert("Invalid User Details..", "danger")       
      }
    
   }

  const  handleOnChange = (e) => {
    setCredientials({...crediantials, [e.target.name]: e.target.value})
  }

  return (
    <div className="container my-3">
      <div className="card-body">
        <h5 className="card-title">Sign In </h5>

        <form onSubmit={handleonSubmit}>
          <div className="row mb-3 my-3">
            <label htmlFor="fisrt_name" className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="first_name" value={crediantials.first_name} onChange={handleOnChange} required id="fisrt_name" />
            </div>
          </div>
          <div className="row mb-3 my-3">
            <label htmlFor="last_name" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control"name="last_name" value={crediantials.last_name} onChange={handleOnChange} required id="last_name" />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="username" value={crediantials.username} onChange={handleOnChange} minLength={5} required id="username" />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input type="password" className="form-control" name="password" value={crediantials.password} onChange={handleOnChange} minLength={5} required id="inputPassword" />
            </div>
          </div>

          <div className="text-center">
            <button disabled = {crediantials.username.length < 5 || crediantials.password.length < 5} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="my-3 align-left">If Already account <Link to='/login'>Log In</Link></p>
        </form>
      </div>
    </div>
  );
}
