import StreetParkingRules from './StreetParkingRules'

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

class StreetParkingSpot {

  /**
   * Constructor
   * @param {Coordinates} coordinates - Geolocation Web API Coordinate object
   * @param {Navigator} navigator - Reverse geocode API
   */
  constructor(coordinates, navigator, alerts){
    this._coordinates = coordinates
    this._navigator = navigator
    this._rules = new StreetParkingRules()
    this._alerts = alerts
  }

  async initialize() {
    try {
      await this._lookupAddress()
      await this._calculateSide()
      await this._scheduleAlert()
    } catch (error) {
      console.log('Unable to calculate side of street: ' + error)
    }
  }

  async _scheduleAlert() {
    await this._alerts.scheduleAlert(this._alertTime())
  }

  async _lookupAddress() {
    this._address = await this._navigator.lookupAddress(this._coordinates)
  }

  address() {
    return this._address
  }

  latitude() {
    return this._coordinates.latitude
  }

  longitude() {
    return this._coordinates.longitude
  }

  heading() {
    return this._coordinates.heading
  }

  locationInDirection(direction, distance){
    const dx = distance * Math.sin(Math.radians(direction))
    const dy = distance * Math.cos(Math.radians(direction))
    const deltaLongitude = dx / (111320 * Math.cos(Math.radians(this.latitude())))
    const deltaLatitude = dy / 110540
    const finalLongitude = this.longitude() + deltaLongitude
    const finalLatitude = this.latitude() + deltaLatitude
    return {
      latitude: finalLatitude,
      longitude: finalLongitude
    }
  }

  toTheRight() {
    return (this.heading() + 90) % 360
  }

  toTheLeft() {
    return this.heading() - 90
  }

  isEven(streetNumber){
    return parseInt(streetNumber) % 2 === 0
  }

  async _calculateSide() {
    const distance = 20 // We always want to get a position 25 feet away
    const rightSideStreetLatLong = this.locationInDirection(this.toTheRight(), distance)
    console.log(JSON.stringify(rightSideStreetLatLong))
    const rightSideStreetAddr = await this._navigator.lookupAddress(rightSideStreetLatLong)

    const leftSideStreetLatLong = this.locationInDirection(this.toTheLeft(), distance * 2)
    const leftSideStreetAddr = await this._navigator.lookupAddress(leftSideStreetLatLong)
    console.log(`rightSideStreetAddr: ${JSON.stringify(rightSideStreetAddr)}`)
    console.log(`leftSideStreetAddr: ${JSON.stringify(leftSideStreetAddr)}`)
    if (rightSideStreetAddr) {
      // same side as right addr is....
      this._side = this.isEven(rightSideStreetAddr.streetNumber) ? 'even' : 'odd'
    } else if (leftSideStreetAddr) {
      // opposite side of what left is....
      this._side = this.isEven(leftSideStreetAddr.streetNumber) ? 'odd' : 'even'
    }
    console.log(`You are park on the ${this._side} side of the street`)
  }

  _alertTime() {
    const alertWindow = 15 * 60 // seconds
    const timeUntilAlertWindow = this.timeRemaining() - alertWindow // seconds
    const alertTime = new Date().getTime() + timeUntilAlertWindow * 1000 // milliseconds
    console.log(`Scheduling alert at ${alertTime}`)
    return alertTime
  }

  timeRemaining(){
    if (this._side) {
      return this._rules.timeRemainingOnSide(new Date(), this._side)
    }
  }
}

export default StreetParkingSpot
