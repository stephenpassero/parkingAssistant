import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class ParkedView extends React.Component {

  constructor(props){
    super(props)
    this.state = {timeRemaining: undefined}
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ timeRemaining: this.props.parkingSpot.timeRemaining() })
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.timeRemaining) {
      return (
        <View style={styles.container}>
          <Text>You have {this.state.timeRemaining} minutes until you need to move your car</Text>
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
