import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import { Button } from 'react-native';
import Navigator from '../utils/Navigator'

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
    this._navigator = new Navigator()
    this.state = {location: {}}
  }

  getLatLong(){
    this._navigator.currentLocation({}).then(
      (coords) => {
        this.setState({location: coords})
        this.props.setLocation(this.state.location)
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Park Here" onPress={this.getLatLong.bind(this)}/>
      </View>
    );
  }
}
