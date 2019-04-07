import StreetParkingRules from './StreetParkingRules'
import { Permissions, Notifications } from 'expo'

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
  constructor(coordinates, navigator){
    this._coordinates = coordinates
    this._navigator = navigator
    this._rules = new StreetParkingRules()
    this._lookupAddress()
        .then(() => this._calculateSide())
        .then(() => this._scheduleAlert())
        .catch(error => {
          console.log('Unable to calculate side of street: ' + error)
        })
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
    const dx = distance * Math.cos(Math.radians(direction))
    const dy = distance * Math.sin(Math.radians(direction))
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
    return this.heading() - 90
  }

  toTheLeft() {
    return this.heading() + 90
  }

  isEven(streetNumber){
    return parseInt(streetNumber) % 2 === 0
  }

  async _calculateSide() {
    const distance = 20 // We always want to get a position 20 feet away
    const rightSideStreetLatLong = this.locationInDirection(this.toTheRight(), distance)
    const rightSideStreetAddr = await this._navigator.lookupAddress(rightSideStreetLatLong)

    const leftSideStreetLatLong = this.locationInDirection(this.toTheLeft(), distance * 2)
    const leftSideStreetAddr = await this._navigator.lookupAddress(leftSideStreetLatLong)

    this._side = this.isEven(rightSideStreetAddr.streetNumber) ? 'even' : 'odd'
  }

  async _scheduleAlert() {
    await this._requestPermissionToNotifyUser()
    await this._scheduleLocalNotification()
  }

  _alertTime() {
    const alertWindow = 15 // minutes
    const timeUntilAlertWindow = this.timeRemaining() - alertWindow // minutes
    // CHANGE THIS AFTER DEMO
    const alertTime = new Date().getTime() + 10000// milliseconds
    console.log(`Scheduling alert at ${alertTime}`)
    return alertTime
  }

  async _requestPermissionToNotifyUser() {
    this._notification = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  }


  async _scheduleLocalNotification() {
    if(this._notification.status === 'granted'){
      this._notificationId = await Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Parking Ticket Imminent',
          body:  'You have 15 minutes to move your car before you may be ticketed',
          ios:   {
            sound: true
          }
        }, // LocalNotification
        {
          time: this._alertTime()
        } // schedulingOptions
      )
    }else{
      alert('You will need to allow notifications for this app')
    }
  }

  timeRemaining(){
    if (this._side) {
      return this._rules.timeRemainingOnSide(new Date(), this._side)
    }
  }
}

export default StreetParkingSpot
