
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

export default class StreetParkingSpotView extends React.Component {

  static propTypes = {
    parkingSpot : PropTypes.object.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>You are parked at {this.props.parkingSpot.location().latitude}, {this.props.parkingSpot.location().longitude}</Text>
      </View>
    );
  }
}
