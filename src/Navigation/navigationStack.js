import { StackNavigator } from "react-navigation";
import Login from "../Screens/Setup/Login";
import Register from "../Screens/Setup/Register";

const navigator = StackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});

export default navigator;
