import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import CountDown from "react-native-countdown-component";
import PropTypes from "prop-types";
import CrimeAlerts from "../models/CrimeAlerts";
import compass_pointer from "./../assets/compass_pointer.png";


export default class ParkedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: this.props.parkingSpot.timeRemaining(),
      crimeNearby: undefined
    };
  }

  static propTypes = {
    parkingSpot: PropTypes.object.isRequired
  };

  updateTimeRemaining() {
    if (this._mounted) {
      this.setState(() => {
        return {
          timeRemaining: this.props.parkingSpot.timeRemaining()
        };
      });
    }
  }

  updateCrimeAlert(crime) {
    if (this._mounted) {
      this.setState(() => {
        return {
          crimeNearby: crime
        };
      });
    }
  }

  requestCrimeAlerts() {
    new CrimeAlerts()
      .getAlertsFor(
        this.props.parkingSpot.latitude(),
        this.props.parkingSpot.longitude()
      )
      .then(crime => this.updateCrimeAlert(crime))
      .catch(error => console.log("Unable to fetch crime alerts: " + error));
  }

  componentDidMount() {
    this._mounted = true
    this._countdownInterval = setInterval(
      this.updateTimeRemaining.bind(this),
      1000
    );
    this.requestCrimeAlerts();
  }

  componentWillUnmount() {
    this._mounted = false
    clearInterval(this._countdownInterval);
  }

  showCrimeAlerts() {
    if(this.state.crimeNearby){
      alert(`Beware of ${this.state.crimeNearby} nearby.`)
    }
  }

  renderCrimeAlertIcon() {
    if (!this.state.crimeNearby) {
      return null;
    }

    return (
      <TouchableHighlight onPress={() => this.showCrimeAlerts()}>
        <Image
          source={compass_pointer}
          style={{
            resizeMode: "contain"
          }}
          />
      </TouchableHighlight>
    )
  }

  renderDismissButton() {
    return (
      <TouchableHighlight
        onPress={this.props.cancel}
        underlayColor="white"
        accessibilityLabel="Cancel Notification button">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    if (this.state.timeRemaining === undefined) {
      return (
        <View style={styles.container} testID="calculatingView">
          <Text style={styles.paragraph}>Calculating time remaining...</Text>
        </View>
      )
    }
    else if (this.state.timeRemaining === 0) {
      return (
        <View style={styles.container} testID="timeExpiredView">
          <Text style={styles.paragraph}>You are not permitted on this side of the street at this time of day!</Text>
          {this.renderDismissButton()}
        </View>
      )
    }
    else {
      return (
        <View style={styles.container} testID="countdownView">
          {this.renderCrimeAlertIcon()}
          <Text style={styles.paragraph}>
            Time remaining until you need to move your car
          </Text>
          <CountDown
            // Duration of countdown in seconds
            until={this.state.timeRemaining}
            timetoShow={["H", "M", "S"]}
            // We need to have this actually do something
            onFinish={() => alert("finished")}
            size={35}
          />
          {this.renderDismissButton()}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D4D9",
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3066BE",
    paddingBottom: 50
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    width: 200,
    alignItems: "center",
    backgroundColor: "#3066BE",
    borderRadius: 10
  },
  buttonText: {
    padding: 20,
    color: "#D3D4D9",
    fontSize: 20,
    fontWeight: "bold"
  }
});
