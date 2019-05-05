import StreetParkingRules from "../../models/StreetParkingRules"

describe("StreetParkingRules", () => {

  describe('#timeRemainingOnSide', () => {
    let rules;
    beforeEach(() => {
      rules = new StreetParkingRules()
    })

    describe('when parking Monday-Saturday before 7pm', () => {
      describe('and car is on wrong side of street', () => {
        it('returns 0', () => {
          const wednesdayEvening = new Date(2019, 3, 3, 18, 59)
          expect(rules.timeRemainingOnSide(wednesdayEvening, 'even')).toEqual(0)
        })
      })
      describe('and car is on odd side of street on a Wednesday', () => {
        it('returns minutes until switch', () => {
          const aWednesdayMorning = new Date(2019, 3, 3, 18, 59)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'odd')).toEqual(60)
        })
      })
      describe('and car is on even side of street on a Tuesday', () => {
        it('returns minutes until switch', () => {
          const aWednesdayMorning = new Date(2019, 3, 2, 18, 59)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'even')).toEqual(60)
        })
      })
    })
    describe('when parking Monday-Saturday after 7pm', () => {
      describe('and car is on wrong side of street', () => {
        it('returns 0', () => {
          const wednesdayEvening = new Date(2019, 3, 3, 19, 1)
          expect(rules.timeRemainingOnSide(wednesdayEvening, 'odd')).toEqual(0)
        })
      })
      describe('and car is on even side of street on a Wednesday', () => {
        it('returns minutes until switch', () => {
          const aWednesdayMorning = new Date(2019, 3, 3, 19, 1)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'even')).toEqual(1439 * 60)
        })
      })
      describe('and car is on odd side of street on a Tuesday', () => {
        it('returns minutes until switch', () => {
          const aWednesdayMorning = new Date(2019, 3, 2, 19, 1)
          expect(rules.timeRemainingOnSide(aWednesdayMorning, 'odd')).toEqual(1439 * 60)
        })
      })
    })
    describe('when parking on Sunday', () => {
      describe('and car is on odd side of the street', () => {
        it('returns minutes until switch', () => {
          const sundayNoon = new Date(2019, 3, 21, 12, 1)
          expect(rules.timeRemainingOnSide(sundayNoon, 'odd')).toEqual(1859 * 60)
        })
      })

      describe('and car is on even side of the street', () => {
        describe('at noon', () => {
          it('returns 0', () => {
            const sundayNoon = new Date(2019, 3, 21, 12, 1)
            expect(rules.timeRemainingOnSide(sundayNoon, 'even')).toEqual(0)
          })
        })

        describe('at 8 PM', () => {
          it('returns 0', () => {
            const sundayAtEight = new Date(2019, 3, 21, 20, 1)
            expect(rules.timeRemainingOnSide(sundayAtEight, 'even')).toEqual(0)
          })
        })
      })
    })
  })
})
