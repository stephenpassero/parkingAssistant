class Location {
  constructor(lat, long) {
    this._lat = lat
    this._long = long
  }

  lat(){
    return this._lat
  }

  long(){
    return this._long
  }
}

export default Location
