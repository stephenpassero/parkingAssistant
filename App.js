import React from 'react';
import Navigator from './utils/Navigator'
import StreetParkingSpot from './models/StreetParkingSpot'
import StreetParkingSpotView from './views/StreetParkingSpotView'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    Navigator.currentLocation().then(position => {
      this.setState(() => ({ parkingSpot : new StreetParkingSpot(position.coords)}))

    })
  }
  render() {
    return (
      <StreetParkingSpotView parkingSpot={this.state.parkingSpot}/>
    );
  }
}
