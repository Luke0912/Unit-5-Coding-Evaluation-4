import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewOrder = () => {
  // Get data of only this user. store it in redux
  // GET /orders?owner_name=john will give you all order of user john
  //  on submit click create a new order, new order has status `Not Accepted`
  const myState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    problem: "",
    brand: "",
  });
  const handleChange = (e) => {
    const val = e.target.value;
    setDetails({
      ...details,
      [e.target.name]: val,
    });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const resp = await axios.post("http://localhost:8080/orders", details);
      console.log(resp);
    } catch (error) {
      alert(error.message);
    }
  };
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const user = myState.user.username.split(" ")[0].toLowerCase();
    const res = await axios.get(
      `http://localhost:8080/orders?owner_name=${myState.user.username}`
    );
    setOrders(res.data);
    console.log(res);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <div className="form">
        <input
          onChange={handleChange}
          className="new-problem"
          type="text"
          name="problem"
          placeholder="Enter problem"
        />
        {/* This input is readonly, it's coming from redux */}
        <input
          className="owner-name"
          type="text"
          name="owner_name"
          placeholder="yourname"
          value={myState.user.username}
          readOnly
        />
        <input
          onChange={handleChange}
          className="brand"
          type="text"
          name="brand"
          placeholder="Enter brand name"
        />
        {/* Create new problem, show it in below form immediately */}
        <button className="submit" onClick={submitHandler}>
          submit
        </button>
      </div>

      <div className="pastOrders">
        {/* this button filters the data below. */}

        {/* it's just a toggle of redux state something like `showUnfinished`  */}
        <button className="filter">
          showUnfinished
          {/* Text should change like:   Show {showUnfinished ? "all" : "Only unfinished"} */}
        </button>

        {/* Here create a div for every order, filter them before based on `showUnfinished` */}
        {orders.map((e) => {
          return (
            <div className="past-orders" key={e.id}>
              <span className="id"></span>
              {e.id}.<span className="problem">{e.problem}</span>{" "}
              <span className="cost">
                {e.cost !== "Not Accepted" ? e.cost : ""}
                {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
              </span>
              <p className="status">Status:{e.status} </p>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
