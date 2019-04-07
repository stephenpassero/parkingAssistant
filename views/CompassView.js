import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Navigator from "../utils/Navigator";

import compass_bg from "./../assets/compass_bg.png";
import compass_pointer from "./../assets/compass_pointer.png";

const { height, width } = Dimensions.get("window");
export default class CompassView extends React.Component {
  constructor(props) {
    super(props);
    this._navigator = new Navigator();
    this.state = { heading: 0 };
  }

  updateHeading(heading) {
    this.setState(() => {
      return {
        heading: heading
      };
    });
  }

  componentDidMount() {
    this._subscription = this._navigator.watchHeading(
      {},
      this.updateHeading.bind(this)
    );
  }

  componentWillUnmount() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={compass_pointer}
          style={{
            height: height / 26,
            resizeMode: "contain"
          }}
        />
        {/* <ImageBackground
          source={compass_bg}
          style={{
            height: width - 80,
            justifyContent: "center",
            alignItems: "center",
            resizeMode: "contain",
            transform: [{ rotate: 360 - this.state.heading + "deg" }]
          }}
        >
          <Text style={styles.heading}>Heading: {this.state.heading}</Text>
        </ImageBackground> */}

        <Image
          source={compass_bg}
          style={{
            height: width - 80,
            justifyContent: "center",
            alignItems: "center",
            resizeMode: "contain",
            transform: [{ rotate: 360 - 90 - this.state.heading + "deg" }]
          }}
        />
        <Text style={styles.heading}>Heading: {this.state.heading}</Text>
        <TouchableHighlight
          onPress={() => this.props.setHeading(this.state.heading)}
          underlayColor="white"
          accessibilityLabel="Park Here button">
          <View style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "white"
  },
  buttonText: {
    padding: 20,
    color: "#2196F3",
    fontSize: 30,
    fontWeight: "bold"
  },
  heading: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    padding: 20
  }
});
