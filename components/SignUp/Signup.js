import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AppBar() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [response, setResponse] = useState(false);

  const handleChangeName = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleChangePwd = (e) => {
    // console.log(e.target.value);
    setPwd(e.target.value);
  };
  const handleChangeConfirmPwd = (e) => {
    // console.log(e.target.value);
    setConfirmPwd(e.target.value);
  };

  const submitUser = async (e) => {
    e.preventDefault();

    try {
      const submit = await axios
        .post("http://localhost:8000/api/users/signup", {
          name: name,
          email: email,
          password: pwd,
          confirmPwd: confirmPwd,
        })
        .then((response) => {
          setResponse(response.data);
        });
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(response);
  return (
    <div className="login-box">
      <h2>Registro</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            name=""
            required=""
            value={name}
            onChange={handleChangeName}
          />
          <label>Nombre</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name=""
            required=""
            value={email}
            onChange={handleChangeEmail}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name=""
            required=""
            onChange={handleChangePwd}
            value={pwd}
          />
          <label>Contrasena</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name=""
            required=""
            value={confirmPwd}
            onChange={handleChangeConfirmPwd}
          />
          <label>Confirme Contraseña</label>
        </div>
        <a href="/" onClick={submitUser}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Ingresar
        </a>
      </form>

      {response ? <h1>Registrado!</h1> : <h1>Registrate</h1>}
    </div>
  );
}

export default AppBar;
