import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import Navigator from '../utils/Navigator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class CompassView extends React.Component {

  constructor(props){
    super(props)
    this._navigator = new Navigator()
    this.state = {heading: 0}
  }

  updateHeading(heading) {
    this.setState(() => {
      return {
        heading: heading
      }
    })
  }

  componentDidMount(){
    this._subscription = this._navigator.watchHeading({}, this.updateHeading.bind(this))
  }

  componentWillUnmount(){
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Heading: {this.state.heading}</Text>
      </View>
    );
  }
}
