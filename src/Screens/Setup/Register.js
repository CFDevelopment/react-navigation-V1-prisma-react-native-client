import React, { Component } from "react";
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
  Alert
} from "react-native";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = StyleSheet.create({
  field: {
    fontSize: 20,
    marginBottom: 15,
    height: 40
  },
  safeAreaView: {
    flex: 1
  },
});

const defaultState = {
  values: {
    name: "",
    email: "",
    password: ""
  },
  errors: {},
  isSubmitting: false,
}

class Register extends Component {

  state = defaultState;

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

    Alert.alert(
      response.data.signup.token,
      'My Alert Msg',
      [

      ],
      { cancelable: false }
    )
    // console.log("hey")
    // console.log(response.data.signup.token);
    this.setState({ defaultState });
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
          <TextInput
            onChangeText={text => this.onChangeText('name', text)}
            value={name} style={styles.field}
            autoCapitalize="none"
            autoComplete="off"
            placeholder="name" />

          {errors.email && <Text> {errors.email} </Text>}
          <TextInput
            onChangeText={text => this.onChangeText('email', text)}
            value={email} style={styles.field}
            autoCapitalize="none"
            autoComplete="off"
            placeholder="email" />
          <TextInput
            onChangeText={text => this.onChangeText('password', text)}
            value={password} style={styles.field}
            placeholder="password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry />
          <Button
            title="Create Account"
            onPress={this.submit} />
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

