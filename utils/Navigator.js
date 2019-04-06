
export default class Navigator {

  static currentLocation(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  static watchLocation(positionCallback, errorCallback, options) {
    navigator.geolocation.watchPosition(positionCallback, errorCallback, options);
  }
}
