import React, { PureComponent } from "react";
import {
    TextInput,
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    field: {
        fontSize: 20,
        marginBottom: 15,
        height: 40
    },
});

class TextField extends PureComponent {
    onChangeText = (text) => {
        const { onChangeText, name } = this.props;
        onChangeText(name, text);
    };
    render() {
        const { value, secureTextEntry, name } = this.props;
        return (
            <TextInput
                onChangeText={this.onChangeText}
                value={value}
                style={styles.field}
                autoCapitalize="none"
                autoComplete="off"
                placeholder={name}
                secureTextEntry={!!secureTextEntry}
            />
        );
    }
}

export default TextField;