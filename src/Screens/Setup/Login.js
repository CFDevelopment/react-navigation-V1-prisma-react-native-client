import React, { Component, PureComponent } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  Platform,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../../components/TextField';


class Login extends Component {
  state = {
    values: {
      name: "",
      email: "",
      password: ""
    },
    errors: {},
    isSubmitting: false,
  }

  navigateProducts = () => {
    const navigateToProducts = NavigationActions.navigate({ routeName: 'Products' });
    this.props.navigation.dispatch(navigateToProducts);
  };

  navigateRegister = () => {
    const navigateToRegister = NavigationActions.navigate({ routeName: 'Register' });
    this.props.navigation.dispatch(navigateToRegister);
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  }

  submit = async () => {
    if (this.state.isSubmitting) { return; }

    this.setState({ isSubmitting: true });

    const response = await this.props.mutate({
      variables: this.state.values,
    });

    const { payload, error } = response.data.login;

    if (payload) {
      console.log(payload.token);
      AsyncStorage.setItem("@platform/token", payload.token)
      this.navigateProducts();
    } else {
      this.setState({
        errors: {
          [error.field]: error.msg,
        },
        isSubmitting: false
      });
    }

  };

  render() {
    const { errors, values: { email, password } } = this.state;

    return (
      <View style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{ width: 200 }}>
          {errors.email ? <Text> {errors.email} </Text> : null}
          <TextField value={email} name="email" onChangeText={this.onChangeText} />
          {errors.password ? <Text> {errors.email} </Text> : null}
          <TextField value={password} name="password" onChangeText={this.onChangeText} secureTextEntry />
          <Button
            title="Login"
            onPress={this.submit} />
          <Text> or </Text>
          <Button
            title="Register"
            onPress={this.navigateRegister} />
        </View>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload { 
        token
      }
      error { 
        field
        msg
      }
    }
  }
`;

export default graphql(loginMutation)(Login);

