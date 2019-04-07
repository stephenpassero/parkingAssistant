import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";
import PropTypes from "prop-types";

export default class ParkedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeRemaining: undefined };
  }

  updateTimeRemaining() {
    this.setState(() => {
      return {
        timeRemaining: this.props.parkingSpot.timeRemaining()
      };
    });
  }
  componentDidMount() {
    this._countdownInterval = setInterval(
      this.updateTimeRemaining.bind(this),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this._countdownInterval);
  }

  render() {
    if (this.state.timeRemaining) {
      return (
        // <View style={styles.container}>
        //   <Text>You have {this.state.timeRemaining} minutes until you need to move your car</Text>
        // </View>

        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Time remaining until you need to move your car
          </Text>
          <CountDown
            // style={{
            //   digitBgColor: "#2196F3",
            //   digitTxtColor: "white",
            //   timeTxtColor: "white"
            // }}
            until={this.state.timeRemaining}
            //duration of countdown in seconds
            timetoShow={["H", "M", "S"]}
            //formate to show
            onFinish={() => alert("finished")}
            //on Finish call
            onPress={() => alert("hello")}
            //on Press call
            size={35}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Calculating time remaining...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#281de4",
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    paddingBottom: 75
  }
});
