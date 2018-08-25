import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";


class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  navigate = () => {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: "Register",
      params: { name: "Shubhnik" }
    });
    this.props.navigation.dispatch(navigateToScreen2);
  };

  render() {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "yellowgreen",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Login Stuff</Text>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 40,
            backgroundColor: "indigo"
          }}
          onPress={this.navigate}
        >
          <Text style={{ fontSize: 23, fontWeight: "600", color: "white" }}>
            Screen2
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
