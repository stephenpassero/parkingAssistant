import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import Navigator from "../utils/Navigator";

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this._navigator = new Navigator();
    this.state = {
      errorMessage: ''
    }
  }

  getLatLong(){
    this._navigator.currentLocation({})
    .then(position => this.props.setLocation(position))
    .catch(error => {
      this.setState(() => {
        return {
          errorMessage: error.message
        }
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Parking Assistant</Text>
        <TouchableHighlight
          onPress={this.getLatLong.bind(this)}
          underlayColor="white"
          accessibilityLabel="Park Here button">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Park Here</Text>
          </View>
        </TouchableHighlight>
        <Text>{this.state.errorMessage}</Text>
      </View>
    )
  }
} // end of class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D4D9",
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3066BE",
    paddingBottom: 100
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#3066BE",
    borderRadius: 10
  },
  buttonText: {
    padding: 20,
    color: "#D3D4D9",
    fontSize: 30,
    fontWeight: "bold"
  }
});
