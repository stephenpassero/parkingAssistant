import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import Navigator from "../../utils/Navigator";
import { styles } from "./styles"

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this._navigator = new Navigator();
    this.state = {
      errorMessage: ''
    }
  }

  getLatLong(){
    this._navigator.currentLocation()
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
          underlayColor="#D3D4D9"
          accessibilityLabel="Park Here button">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Park Here</Text>
          </View>
        </TouchableHighlight>
        <Text>{this.state.errorMessage}</Text>
      </View>
    )
  }
}
