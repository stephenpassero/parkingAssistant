import StreetParkingSpot from "../models/StreetParkingSpot"

describe("StreetParkingSpot", () => {
  let spot, coordinates, navigator
  beforeEach(() => {
    navigator = {
      lookupAddress: jest.fn()
    }
  })
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

  describe('#streetSide', () => {
    const makeLookupAddrResponse = (houseNumber, streetName) => {
      return Promise.resolve(
        {
          'streetNumber' : houseNumber,
          'route': streetName
        })
      }
    describe('when facing west in front of 214 Melrose St, 14619', () => {

      beforeEach(() => {
        coordinates = {
          latitude: 0,
          longitude: 0,
          heading: 0,
        }
        navigator.lookupAddress
                 .mockReturnValueOnce(makeLookupAddrResponse('214', "Melrose Street"))
                 .mockReturnValueOnce(makeLookupAddrResponse('211', "Melrose Street"))
        spot = new StreetParkingSpot(coordinates, navigator)
      })

      it('is even', () => {
        expect.assertions(1)
        return expect(spot.side()).resolves.toEqual('even')
      })
    })

    describe('when facing east in front of 214 Melrose St, 14619', () => {

      beforeEach(() => {
        coordinates = {
          latitude: 0,
          longitude: 0,
          heading: 0,
        }
        navigator.lookupAddress
                 .mockReturnValueOnce(makeLookupAddrResponse(215, "Melrose St"))
                 .mockReturnValueOnce(makeLookupAddrResponse(214, "Melrose St"))
        spot = new StreetParkingSpot(coordinates, navigator)
      })

      it('is odd', () => {
        expect.assertions(1)
        return expect(spot.side()).resolves.toEqual('odd')
      })
    })

  })
})
