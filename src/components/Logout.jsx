import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  // Logout component, just log user out and take him to `/` homepage

  // suggestion: if you are storing anyting in redux it's a good idea to
  // empty it before loggin out. eg: order
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }, []);
  // log user out. it's just an inmemory value in context api
  return;

  return <></>;
};
