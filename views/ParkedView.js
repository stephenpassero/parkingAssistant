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

  render() {
    return (
      <View style={styles.container}>
        <Text>You have 1:43 until you need to move your car</Text>
      </View>
    );
  }
}
