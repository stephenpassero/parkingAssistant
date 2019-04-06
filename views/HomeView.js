import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import { Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class HomeView extends React.Component {

  constructor(props){
    super(props)
    this.state = {position: {latitude: 77, longitude: 77}}
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Park Here" onPress={() => this.props.setLocation(this.state.position)}/>
      </View>
    );
  }
}
