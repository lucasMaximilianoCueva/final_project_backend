import React, { useState } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import './LoginLocal.css';

function LoginLocal() {
    const [dataUserName, setDataUserName] = useState([]);
    const [dataUserPass, setDataUserPass] = useState([]);

    const login = () => {
        Axios({
          method: "POST",
          data: {
            username: dataUserName,
            password: dataUserPass,
          },
          withCredentials: true,
          url: '/user/login',
        }).then((res) => {
            const data = res.data;
            const status = res.status;
            if(data === "No User Exists") {
                window.location = "/faillogin"
            } else if(status === 200 && data !== "No User Exists") {
                window.location = "/"
            }
        });
      };

    return (
      <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="data:image/png;base64,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" style={{borderRadius:15}} className="img-fluid" alt="login"></img>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input
            onChange={(e) => setDataUserName(e.target.value)}
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
            className="form-control form-control-lg"
          ></input>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
            onChange={(e) => setDataUserPass(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
            className="form-control form-control-lg"
          ></input>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
            <Link to="/register">
          <button className="btn btn-secondary">
            Crear nueva cuenta
          </button>
        </Link>
          </div>

          {/* <!-- Submit button --> */}
          <span onClick={login} type="submit" className="btn btn-primary btn-lg btn-block" style={{color:"white"}}>Iniciar</span>

        </form>
      </div>
    </div>
  </div>
</section>
    );
}

export default LoginLocal;