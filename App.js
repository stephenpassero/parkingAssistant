import React from 'react';
import Navigator from './utils/Navigator'
import Alerts from './utils/Alerts'
import StreetParkingSpot from './models/StreetParkingSpot'
import CompassView from './views/Compass/CompassView'
import HomeView from './views/Home/HomeView'
import ParkedView from './views/Parked/ParkedView'
import { Text, View } from "react-native";

export default class App extends React.Component {

  constructor(props){
    super(props)
    this._alerts = new Alerts()
    this.state = {
      location: false,
      heading: false,
      parkingSpot: false
    }
  }

  setLocation(position) {
    this.setState(() => {
      return {
        position: position
      }
    })
  }

  setHeading(newHeading) {
    this.setState(() => {
      return {
        heading: newHeading
      }
    })
  }

  cancelCountdown(){
    this._alerts.cancelScheduledAlerts()
    this.setState(() => {
      return {
        position:    false,
        heading:     false,
        parkingSpot: false
      }
    })
  }

  setParkingSpot(newParkingSpot) {
    this.setState(() => {
      return {
        parkingSpot: newParkingSpot
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.position && this.state.heading && !this.state.parkingSpot) {
      const spot = this._makeParkingSpot()
      spot.initialize().then(() => this.setParkingSpot(spot))
    }
  }

  _makeParkingSpot() {
    const coordinatesWithHeading = Object.assign(
      {},
      this.state.position.coords,
      { heading: this.state.heading }
    )
    return new StreetParkingSpot(coordinatesWithHeading, new Navigator(), this._alerts)
  }


  render() {
    if(this.state.position && !this.state.heading) {
      return (
        <CompassView setHeading={this.setHeading.bind(this)}/>
      )
    } else if (this.state.position && this.state.heading && !this.state.parkingSpot) {
      return <View/>
    } else if (this.state.parkingSpot){
      return (
        <ParkedView cancel={this.cancelCountdown.bind(this)}
                    parkingSpot={this.state.parkingSpot}/>
      )
    } else if (!this.state.position && !this.state.heading) {
      return (
        <HomeView setLocation={this.setLocation.bind(this)}/>
      )
    }
  }
}
