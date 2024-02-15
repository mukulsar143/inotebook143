import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
  }, [location]);

  const handleOnlogout = () => {
    try {
        if (localStorage.getItem('token')) {
            localStorage.removeItem("token");
            navigate("/signin");
        }
        else {
            alert('something went wrong')
        }
    } catch (error) {
      alert("Something gome wrong", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            INoteBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                {
                  <Link to="/login">
                    <button className="btn btn-sm btn-primary mx-1">
                      Log In
                    </button>
                  </Link>
                }
              </form>
            ) : (
              <button
                onClick={handleOnlogout}
                className="btn btn-sm btn-primary mx-1"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
