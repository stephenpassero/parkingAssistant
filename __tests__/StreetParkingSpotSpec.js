import StreetParkingSpot from "../models/StreetParkingSpot"

describe("StreetParkingSpot", () => {

  const makeLookupAddrResponse = (houseNumber, streetName) => {
    return Promise.resolve(
      {
        'streetNumber' : houseNumber,
        'route': streetName
      })
  }

  let spot, coordinates, navigator, alerts
  beforeEach(() => {
    navigator = {
      lookupAddress: jest.fn().mockReturnValue(makeLookupAddrResponse('214', "Melrose Street"))
    }
    alerts = {
      scheduleAlert: jest.fn().mockReturnValue(Promise.resolve())
    }
  })

  describe("#location", () => {
    it("returns the location passed in", async () => {
      const coordinates = {
        latitude: 45,
        longitude: 30,
        heading: 0
      }
      const spot = new StreetParkingSpot(coordinates, navigator, alerts)
      await spot.initialize()
      expect(spot.latitude()).toEqual(45)
      expect(spot.longitude()).toEqual(30)
    })
  })

})
