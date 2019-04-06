import { Location, Permissions, Magnetometer } from 'expo';

export default class Navigator {

  constructor() {
    this._permissionGranted = ''
  }

  askPermission() {
    return Permissions.askAsync(Permissions.LOCATION)
                      .then(this.setPermissionRequestResult.bind(this))
  }

  permissionGranted() {
    return this._permissionGranted === 'granted'
  }

  setPermissionRequestResult(result) {
    this._permissionGranted = result.status
    console.log(`Permission granted = ${this._permissionGranted}`)
  }

  async currentLocation(options) {
    return Location.getCurrentPositionAsync(options)
  }

  // async addHeadingToLocation(angle, locationOptions) {
  //   const position = await this.currentLocation(locationOptions)
  //   position.heading = angle
  //   return position
  // }

  // async currentHeading(options) {
  //   return Location.getHeadingAsync(options)
  // }

  async addHeadingToLocation(heading, locationOptions) {
    const position = await this.currentLocation(locationOptions)
    position.coords.heading = heading
    return position
  }

  _degree(angle) {
    return angle - 90 >= 0 ? angle - 90 : angle + 271;
  }

  _angle(magnetometer) {

    if (magnetometer) {
      let {x, y, z} = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  }

  // watchLocation(positionCallback, errorCallback, options) {
  //   Magnetometer.addListener(magData => {
  //     const heading = this._degree(this._angle(magData))
  //     positionCallback({coords: {latitude: 0, longitude: 0, heading: heading}, timestamp: 2})
  //     // this.addHeadingToLocation(heading, options)
  //     //     .then(position => positionCallback(position))
  //   })
  // }

  watchHeading(options, headingCallback) {
    return Magnetometer.addListener(magData => {
      const heading = this._degree(this._angle(magData))
      headingCallback(heading)
    })
  }
}
