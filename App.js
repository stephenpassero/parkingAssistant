import React from 'react';
import Navigator from './utils/Navigator'
import StreetParkingSpot from './models/StreetParkingSpot'
import StreetParkingSpotView from './views/StreetParkingSpotView'
import CurrentLocationView from './views/CurrentLocationView'
import Loading from './views/Loading'
import CompassView from './views/CompassView'

export default class App extends React.Component {


  render() {
    return (
      <CompassView/>
    );
  }
}
