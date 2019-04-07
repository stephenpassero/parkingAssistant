import StreetParkingRules from "../models/StreetParkingRules"

describe("StreetParkingRules", () => {

  describe('#timeRemainingOnSide', () => {
    describe('when parking Monday-Saturday before 7pm', () => {
      describe('and car is on wrong side of street', () => {
        it('returns 0', () => {
          const rules = new StreetParkingRules()
          const wednesdayEvening = new Date(2019, 3, 3, 18, 59)
          expect(rules.timeRemainingOnSide(wednesdayEvening, 'even')).toEqual(0)
        })
      })
      describe('and car is on odd side of street on a Wednesday', () => {
        it('returns minutes until switch', () => {
          const rules = new StreetParkingRules()
          const aWednesdayMorning = new Date(2019, 3, 3, 18, 59)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'odd')).toEqual(1)
        })
      })
      describe('and car is on even side of street on a Tuesday', () => {
        it('returns minutes until switch', () => {
          const rules = new StreetParkingRules()
          const aWednesdayMorning = new Date(2019, 3, 2, 18, 59)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'even')).toEqual(1)
        })
      })
    })
    describe('when parking Monday-Saturday after 7pm', () => {
      describe('and car is on wrong side of street', () => {
        it('returns 0', () => {
          const rules = new StreetParkingRules()
          const wednesdayEvening = new Date(2019, 3, 3, 19, 1)
          expect(rules.timeRemainingOnSide(wednesdayEvening, 'odd')).toEqual(0)
        })
      })
      describe('and car is on even side of street on a Wednesday', () => {
        it('returns minutes until switch', () => {
          const rules = new StreetParkingRules()
          const aWednesdayMorning = new Date(2019, 3, 3, 19, 1)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'even')).toEqual(1439)
        })
      })
      describe('and car is on odd side of street on a Tuesday', () => {
        it('returns minutes until switch', () => {
          const rules = new StreetParkingRules()
          const aWednesdayMorning = new Date(2019, 3, 2, 19, 1)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'odd')).toEqual(1439)
        })
      })
    })
    describe('when parking on Sunday', () => {

    })
  })
})
