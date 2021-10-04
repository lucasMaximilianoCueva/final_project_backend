import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function RegisterLocal() {
  const [dataUserName, setDataUserName] = useState([]);
  // const [dataEmail, setDataEmail] = useState([]);
  const [dataName, setDataName] = useState([]);
  const [dataLastName, setDataLastName] = useState([]);
  const [dataAdress, setDataAdress] = useState([]);
  const [dataAge, setDataAge] = useState([]);
  const [dataPhone, setDataPhone] = useState([]);
  const [dataUserPass, setDataUserPass] = useState([]);

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: dataUserName,
        name: dataName,
        lastname: dataLastName,
        adress: dataAdress,
        age: dataAge,
        phone: dataPhone,
        password: dataUserPass
      },
      withCredentials: true,
      url: "/user/register",
    }).then((res) => {
      const data = res.data;
      const status = res.status;
      if (data === "User Already Exists") {
        window.location = "/failregister";
      } else if (status === 200 && data !== "User Already Exists") {
        window.location = "/login";
      }
    });
  };

  return (
    <section className="vh-100">
    <div className="container py-4 h-100">
      <div className="row d-flex align-items-center justify-content-center h-100">
        <div style={{alignItems:"center", marginBottom:20}}>
          <h1 style={{color:"#303030"}}>Crear una cuenta</h1>
        </div>
        <div className="col-md-7 col-lg-12 col-xl-5 offset-xl-1">
          <form>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input
              onChange={(e) => setDataUserName(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Correo Electrónico"
              required
              className="form-control form-control-lg"
            ></input>
            </div>
  
            {/* <!-- Name input --> */}
            <div className="form-outline mb-4">
              <input
              onChange={(e) => setDataName(e.target.value)}
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              required
              className="form-control form-control-lg"
            ></input>
            </div>

            {/* <!-- Lastname input --> */}
            <div className="form-outline mb-4">
              <input
              onChange={(e) => setDataLastName(e.target.value)}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Apellido"
              required
              className="form-control form-control-lg"
            ></input>
            </div>

            {/* <!-- Adress input --> */}
            <div className="form-outline mb-4">
              <input
              onChange={(e) => setDataAdress(e.target.value)}
              type="text"
              id="adress"
              name="adress"
              placeholder="Dirección"
              required
              className="form-control form-control-lg"
            ></input>
            </div>

            {/* <!-- Age input --> */}
            <div className="form-outline mb-4">
              <input
              onChange={(e) => setDataAge(e.target.value)}
              type="number"
              id="age"
              name="age"
              placeholder="Edad"
              required
              className="form-control form-control-lg"
            ></input>
            </div>

            {/* <!-- Phone input --> */}
            <div className="form-outline mb-4">
              <input
              onChange={(e) => setDataPhone(e.target.value)}
              type="phone"
              id="phone"
              name="phone"
              placeholder="Número de celular"
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
              placeholder="Contraseña"
              required
              className="form-control form-control-lg"
            ></input>
            </div>
  
            <div className="d-flex justify-content-around align-items-center mb-4">
              <Link to="/login">
            <button className="btn btn-secondary">
            ¿Ya tienes una cuenta?
Iniciar sesión
            </button>
          </Link>
            </div>
  
            {/* <!-- Submit button --> */}
            <span onClick={register} type="submit" className="btn btn-primary btn-lg btn-block" style={{color:"white"}}>Crear</span>
  
          </form>
        </div>
      </div>
    </div>
  </section>
  );
}

export default RegisterLocal;