import { createContext, useReducer, useContext } from "react";

const initialState = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const { state } = useContext(NotificationContext);
  return state;
};

export const useNotificationDispatch = () => {
  const { dispatch } = useContext(NotificationContext);
  return dispatch;
};

export default NotificationContext;
