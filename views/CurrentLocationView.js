
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

export default class CurrentLocationView extends React.Component {

  static propTypes = {
    position : PropTypes.object.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Lat = {this.props.position.coords.latitude}</Text>
        <Text>Long = {this.props.position.coords.longitude}</Text>
        <Text>Heading = {this.props.position.coords.heading}</Text>
        <Text>Timestamp = {this.props.position.timestamp}</Text>
      </View>
    );
  }
}
