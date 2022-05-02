import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const myState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const val = e.target.value;
    setDetails({
      ...details,
      [e.target.name]: val,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const resp = await axios.get("http://localhost:8080/users");
      console.log(resp);
      console.log(myState);
      if (resp.status !== 200) {
        throw new Error("Unable to login");
      }
      let user = {};
      for (var i = 0; i < resp.data.length; i++) {
        if (
          resp.data[i].username === details.username &&
          resp.data[i].pass === details.password
        ) {
          user = resp.data[i];
          break;
        }
      }
      if (!user.id) {
        throw new Error("Unable to login");
      }
      dispatch({ type: "LOGIN", payload:user });
      if (user.role === "admin") {
        navigate("/orders");
      } else {
        navigate("/neworder");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        onChange={handleChange}
        name="username"
        type="text"
        placeholder="Enter username"
        className="username"
      />
      <input
        onChange={handleChange}
        name="password"
        type="text"
        placeholder="Enter password"
        className="password"
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};
