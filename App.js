import React from 'react';
import Navigator from './utils/Navigator'
import StreetParkingSpot from './models/StreetParkingSpot'
import StreetParkingSpotView from './views/StreetParkingSpotView'
import Loading from './views/Loading'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    Navigator.currentLocation().then(position => {
      this.setState(() => ({ parkingSpot : new StreetParkingSpot(position.coords)}))

    })
  }
  render() {
    if (this.state.parkingSpot) {
      return (
        <StreetParkingSpotView parkingSpot={this.state.parkingSpot}/>
      );
    }
    else {
      return <Loading/>
    }
  }
}
