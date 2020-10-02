import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import {showError, server, showSuccess} from '../common';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPasword: '',
  stageNew: false,
};

export default class Auth extends Component {
  state = {
    ...initialState,
  };

  signInOrSignUp = () => {
    if (this.state.stageNew) {
      this.signUp();
    } else {
      this.singIn();
    }
  };

  signUp = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPasword: this.state.confirmPasword,
      });

      showSuccess('Usuario cadastrado!');
      this.setState({...initialState});
    } catch (err) {
      showError(e);
    }
  };

  singIn = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password,
      });

      axios.defaults.headers.common['Authorization'] = `bearer ${
        res.data.token
      }`;

      this.props.navigation.navigate('Home');
    } catch (err) {
      showError(err);
    }
  };

  render() {
    return (
      <ImageBackground style={styles.background} source={backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>
          {this.state.stageNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChangeText={name => this.setState({name})}
            />
          )}
          <AuthInput
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />
          <AuthInput
            icon="lock"
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={password => this.setState({password})}
          />
          {this.state.stageNew && (
            <AuthInput
              icon="asterisk"
              placeholder="Confirmar Senha"
              value={this.state.confirmPasword}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={confirmPasword => this.setState({confirmPasword})}
            />
          )}
          <TouchableOpacity onPress={this.signInOrSignUp}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => this.setState({stageNew: !this.state.stageNew})}>
          <Text style={styles.buttonText}>
            {this.state.stageNew
              ? 'Ja possui conta?'
              : 'Ainda nao possui conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
});
