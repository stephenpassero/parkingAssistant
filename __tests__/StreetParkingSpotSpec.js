import Location from "../models/Location"
import StreetParkingSpot from "../models/StreetParkingSpot"

describe("StreetParkingSpot", () => {
  describe("#location", () => {
    it("returns the location passed in", () => {
      const lat = 45.45
      const long = 45.45
      const location = new Location(lat, long)
      expect(new StreetParkingSpot(location).location()).toEqual(location)
    })
  })
})
