import StreetParkingSpot from "../models/StreetParkingSpot"

describe("StreetParkingSpot", () => {
  describe("#location", () => {
    it("returns the location passed in", () => {
      const coordinates = {
        latitude: 45,
        longitude: 30
      }
      expect(new StreetParkingSpot(coordinates).location().latitude).toEqual(45)
      expect(new StreetParkingSpot(coordinates).location().longitude).toEqual(30)
    })
  })
})
