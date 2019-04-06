import React from 'react';
import Navigator from './utils/Navigator'
import StreetParkingSpot from './models/StreetParkingSpot'
import StreetParkingSpotView from './views/StreetParkingSpotView'
import CurrentLocationView from './views/CurrentLocationView'
import Loading from './views/Loading'
import CompassView from './views/CompassView'
import HomeView from './views/HomeView'
import ParkedView from './views/ParkedView'

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      location: false,
      heading: false
    }
  }

  setLocation(location) {
    this.setState(() => {
      return {
        location: {latitude: location.coords.latitude, longitude: location.coords.longitude}
      }
    })
  }

  setHeading(newHeading) {
    console.log(`Setting Heading to ${newHeading}`)
    this.setState(() => {
      return {
        heading: newHeading
      }
    })
  }

  render() {
    if(this.state.location && !this.state.heading) {
      return (
        <CompassView setHeading={this.setHeading.bind(this)}/>
      )
    } else if (this.state.location && this.state.heading){
      return (
        <ParkedView location={this.state.location} heading={this.state.heading}/>
      )
    } else{
      return (
        <HomeView setLocation={this.setLocation.bind(this)}/>
      )
    }
  }
}
