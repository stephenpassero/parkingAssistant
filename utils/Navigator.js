import { Location, Permissions, Magnetometer } from 'expo';

export default class Navigator {

  constructor() {
    this._permissionGranted = ''
  }

  askPermission() {
    return Permissions.askAsync(Permissions.LOCATION)
                      .then(this.setPermissionRequestResult.bind(this))
                      .then(() => this.permissionGranted())
  }

  permissionGranted() {
    return this._permissionGranted === 'granted'
  }

  setPermissionRequestResult(result) {
    this._permissionGranted = result.status
  }

  async currentLocation(options) {
    let permission = Promise.resolve(true)
    if(!this.permissionGranted()) {
      permission = this.askPermission()
    }
    return permission.then(granted => {
      if (granted) {
        return Location.getCurrentPositionAsync(options)
      } else {
        throw new Error("Unable to get location -- permission not granted")
      }
    })
  }

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

  watchHeading(options, headingCallback) {
    return Magnetometer.addListener(magData => {
      const heading = this._degree(this._angle(magData))
      headingCallback(heading)
    })
  }

  async lookupAddress(coordinates){
    const keyParam = `key=AIzaSyC9Dcx8pDlYPPQp2TGGIFNx0vEonnhjb8o`
    const latLongParam = `latlng=40.714224,-73.96145`
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${latLongParam}&${keyParam}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.errorCode)
    }

    const result = await response.json()
    return {
      "streetNumber" : result.results.address_components[0].long_name,
      "route" : result.results.address_components[1].long_name
    }

  }
}
