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
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../../components/TextField';

class Register extends Component {
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

  navigateLogin = () => {
    const navigateToLogin = NavigationActions.navigate({ routeName: 'Login' });
    this.props.navigation.dispatch(navigateToLogin);
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
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch (err) {
      this.setState({
        errors: {
          email: 'Already Taken',
        },
        isSubmitting: false,
      });
      return;
    }
    AsyncStorage.setItem("@platform/token", response.data.signup.token)
    //write function to cleear inputs
    //this.setState({ defaultState });
    this.navigateProducts();
  };

  render() {
    const { errors, values: { name, email, password } } = this.state;

    return (
      <View style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{ width: 200 }}>
          <TextField value={name} name="name" onChangeText={this.onChangeText} />
          {errors.email && <Text> {errors.email} </Text>}
          <TextField value={email} name="email" onChangeText={this.onChangeText} />
          <TextField value={password} name="password" onChangeText={this.onChangeText} secureTextEntry />
          <Button
            title="Create Account"
            onPress={this.submit} />
          <Text> or </Text>
          <Button
            title="Login"
            onPress={this.navigateLogin} />
        </View>
      </View>
    );
  }
}

const registerMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(registerMutation)(Register);

