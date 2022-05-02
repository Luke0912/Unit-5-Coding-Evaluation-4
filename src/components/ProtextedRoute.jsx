// /orders and /neworder are protected routes
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const myState = useSelector((state) => state.loginReducer);

  if (!myState.isLoggedIn) {
    return <Navigate to={"/login"} replace={false} />;
  }
  return children;
};
