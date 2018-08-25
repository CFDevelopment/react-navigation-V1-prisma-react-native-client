import { StackNavigator } from "react-navigation";
import Login from "../Screens/setup/Login";
import Register from "../Screens/setup/Register";
import Products from "../Screens/main/Products";

const navigator = StackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Products: {
    screen: Products
  },
});

export default navigator;
