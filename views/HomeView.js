import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import Navigator from "../utils/Navigator";

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this._navigator = new Navigator();
    this.state = {
      location: {},
      errorMessage: ""
    };
  }

  getLatLong() {
    this._navigator
      .currentLocation({})
      .then(coords => {
        this.setState({ location: coords });
        this.props.setLocation(this.state.location);
      })
      .catch(error => {
        this.setState(() => {
          return {
            errorMessage: error.message
          };
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Parking Assistant</Text>
        <TouchableHighlight
          onPress={this.getLatLong.bind(this)}
          underlayColor="white"
          accessibilityLabel="Park Here button"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Park Here</Text>
          </View>
        </TouchableHighlight>
        <Text>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2196F3",
    paddingBottom: 100
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  buttonText: {
    padding: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  }
});
