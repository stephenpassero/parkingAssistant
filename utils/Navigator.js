import { Location, Permissions } from 'expo';

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

  async currentHeading(options) {
    return Location.getHeadingAsync(options)
  }

  async currentLocationAndHeading(locationOptions, headingOptions) {
    const position = await this.currentLocation(locationOptions)
    position.heading = await this.currentHeading(headingOptions)
    return position
  }

  watchLocation(positionCallback, errorCallback, options) {
    setInterval(
      () => this.currentLocationAndHeading(options).then(position => positionCallback(position)),
      1000
    )
  }
}
