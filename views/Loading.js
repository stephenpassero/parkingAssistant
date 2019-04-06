
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

export default class Loading extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Getting your location... please wait</Text>
      </View>
    );
  }
}
