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
      timeRemaining: undefined,
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
  render() {
    if (this.state.timeRemaining) {
      return (
        <View style={styles.container}>
          {this.renderCrimeAlertIcon()}
          <Text style={styles.paragraph}>
            Time remaining until you need to move your car
          </Text>
          <CountDown
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
            onPress={this.props.cancel}
            underlayColor="white"
            accessibilityLabel="Cancel Notification button">
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
