import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import CountDown from "react-native-countdown-component";
import PropTypes from "prop-types";
import CrimeAlerts from '../models/CrimeAlerts'

export default class ParkedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: undefined,
      crimeNearby: undefined
    };
  }

  static propTypes = {
    parkingSpot : PropTypes.object.isRequired
  }

  updateTimeRemaining() {
    this.setState(() => {
      return {
        timeRemaining: this.props.parkingSpot.timeRemaining()
      };
    });
  }

  updateCrimeAlert(crime) {
    this.setState(() => {
      return {
        crimeNearby: crime
      }
    })
  }

  requestCrimeAlerts() {
    new CrimeAlerts().getAlertsFor(this.props.parkingSpot.latitude(), this.props.parkingSpot.longitude())
                     .then(crime => this.updateCrimeAlert(crime))
                     .catch(error => console.log('Unable to fetch crime alerts: ' + error))
  }

  componentDidMount() {
    this._countdownInterval = setInterval(
      this.updateTimeRemaining.bind(this),
      1000
    );
    this.requestCrimeAlerts()
  }

  componentWillUnmount() {
    clearInterval(this._countdownInterval);
  }

  renderCrimeAlerts() {
    return this.state.crimeNearby ?
      <Text>Beware of {this.state.crimeNearby} nearby!</Text> :
      null
  }
  
  render() {
    if (this.state.timeRemaining) {
      return (
        // <View style={styles.container}>
        //   <Text>You have {this.state.timeRemaining} minutes until you need to move your car</Text>
        // </View>

        <View style={styles.container}>
          {this.renderCrimeAlerts()}
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
          <TouchableHighlight
            // onPress={this.getLatLong.bind(this)}
            underlayColor="white"
            accessibilityLabel="Park Here button"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Park Here</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            // onPress={this.getLatLong.bind(this)}
            underlayColor="white"
            accessibilityLabel="Cancel Notification button"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>Calculating time remaining...</Text>
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
    paddingBottom: 50
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    width: 200,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  buttonText: {
    padding: 20,
    color: "#000",
    fontSize: 20,
    fontWeight: "bold"
  }
});
