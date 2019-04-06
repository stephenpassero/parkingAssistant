class StreetParkingSpot {

  /**
   * Constructor
   * @param {Coordinates} coordinates - Geolocation Web API Coordinate object
   * @param {Navigator} navigator - Reverse geocode API
   */
  constructor(coordinates, navigator){
    this._coordinates = coordinates
    this._navigator = navigator
  }

  location(){
    return {
      "latitude":  this._coordinates.latitude,
      "longitude": this._coordinates.longitude
    }
  }

  side() {
    return "even"
  }
}

export default StreetParkingSpot
