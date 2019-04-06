class StreetParkingSpot {

  /**
   * Constructor
   * @param {Coordinates} coordinates - Geolocation Web API Coordinate object
   */
  constructor(coordinates){
    this._coordinates = coordinates
  }

  location(){
    return {
      "latitude":  this._coordinates.latitude,
      "longitude": this._coordinates.longitude
    }
  }
}

export default StreetParkingSpot
