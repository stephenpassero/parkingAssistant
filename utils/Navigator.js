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

  async currentLocation() {
    let permission = Promise.resolve(true)
    if(!this.permissionGranted()) {
      permission = this.askPermission()
    }
    return permission.then(granted => {
      if (granted) {
        return Location.getCurrentPositionAsync({
          accuracy: 4
        })
      } else {
        throw new Error("Unable to get location -- permission not granted")
      }
    })
  }

  _degree(angle) {
    return angle - 90 >= 0 ? angle - 90 : angle + 271;
  }

  _angle(magnetometer) {

    if (magnetometer) {
      let {x, y} = magnetometer;

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
    let lastAccuracy = 0
    return Location.watchHeadingAsync(({magHeading, trueHeading, accuracy}) => {
      if (accuracy !== lastAccuracy) {
        let uncertainty = "<20"
        if (accuracy === 2) {
          uncertainty = "<35"
        } else if (accuracy === 1) {
          uncertainty = "<50"
        } else if (accuracy === 0) {
          uncertainty = ">50"
        }
        console.log(`Heading ${trueHeading} +/- ${uncertainty}`)
        lastAccuracy = accuracy
      }

      headingCallback(Math.round(trueHeading))
    })
  }

  findFirstAddressComponentLongName(addressParts, addressType) {
    const partOfInterest = addressParts.filter(part => part.types[0] === addressType)[0]
    if (partOfInterest) {
      return partOfInterest.long_name
    }else{
      console.log(`Could not find ${addressType} in address parts!`)
    }
  }

  async lookupAddress(coordinates){
    const keyParam = `key=AIzaSyC9Dcx8pDlYPPQp2TGGIFNx0vEonnhjb8o`
    const latLongParam = `latlng=${coordinates.latitude},${coordinates.longitude}`
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${latLongParam}&${keyParam}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.errorCode)
    }

    const result = await response.json()
    const mostSpecificAddress = result.results[0]
    const addressParts = mostSpecificAddress.address_components

    const streetNumber = this.findFirstAddressComponentLongName(addressParts, 'street_number')
    const street = this.findFirstAddressComponentLongName(addressParts, 'route')

    if (streetNumber && street) {
      return {
        "streetNumber" : streetNumber,
        "route" : street
      }
    } else {
      console.log("Could not reverse geocode!")
    }
  }
}
