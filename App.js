import React from 'react';
import Navigator from './utils/Navigator'
import StreetParkingSpot from './models/StreetParkingSpot'
import StreetParkingSpotView from './views/StreetParkingSpotView'
import CurrentLocationView from './views/CurrentLocationView'
import Loading from './views/Loading'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    const watchLocationOptions = {
      distanceInterval: 0
    }
    const watchLocationCallback = position => {
      this.setState(() => ({ position : position}))
    }

    this._navigator = new Navigator()
    this._navigator.askPermission().then(() => {
      this._navigator.watchLocation(watchLocationCallback, null, watchLocationOptions)
    })
  }

  render() {
    if (this.state.position) {
      return (
        <CurrentLocationView position={this.state.position}/>
      );
    }
    else {
      return <Loading/>
    }
  }
}
