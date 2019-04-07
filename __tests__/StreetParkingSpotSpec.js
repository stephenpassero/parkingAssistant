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
      return {
        "address_components" : [
          {
            "long_name" : houseNumber,
            "short_name" : houseNumber,
            "types" : [ "street_number" ]
          },
          {
            "long_name" : streetName,
            "short_name" : streetName,
            "types" : [ "route" ]
          }
        ]
      }
    }
    describe('when facing west in front of 214 Melrose St, 14619', () => {

      beforeEach(() => {
        coordinates = {
          latitude: 0,
          longitude: 0,
          heading: 0,
        }
        navigator.lookupAddress
                 .mockReturnValueOnce(makeLookupAddrResponse(214, "Melrose St"))
                 .mockReturnValueOnce(makeLookupAddrResponse(211, "Melrose St"))
        spot = new StreetParkingSpot(coordinates, navigator)
      })

      it('is even', () => {
        expect(spot.side()).toEqual('even')
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
        expect(spot.side()).toEqual('odd')
      })
    })

  })
})
