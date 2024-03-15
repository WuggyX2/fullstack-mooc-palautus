import { useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationsReducer";

export default function useNotifications() {
  const dispatch = useDispatch();

  function addNotification(message) {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  }

  return addNotification;
}
