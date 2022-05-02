import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NewOrder } from "./components/NewOrder";
import { Orders } from "./components/Orders";
import { ProtectedRoute } from "./components/ProtextedRoute";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.loginReducer);
  return (
    <div className="App">
      <div>
        <Link className="nav-home" to="/">
          Home
        </Link>
        {/* Show either login or logout below */}
        {myState.isLoggedIn && (
          <Link className="nav-logout" to="/logout">
            Logout
          </Link>
        )}
        {!myState.isLoggedIn && (
          <Link className="nav-login" to="/login">
            Login
          </Link>
        )}
      </div>

      <Routes>
        {/* Routes are as follows:
        Route      Component
        /           Home
        /login      Login
        /logout     Logout
        /orders     Orders    Protected
        /neworder   NewOrder  Protected
        */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders></Orders>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/neworder"
          element={
            <ProtectedRoute>
              <NewOrder></NewOrder>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
