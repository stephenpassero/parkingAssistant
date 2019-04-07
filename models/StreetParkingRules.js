export default class StreetParkingRules {

  constructor() {

    this._rules = {
      oddSideDays : [
        1, 2, 4, 6
      ],
      oddSideDaysSwitchHours: 19
    }
  }

  onCorrectSide(shouldBeParkingOnOddSide, streetSide) {
    return shouldBeParkingOnOddSide && streetSide === 'odd' ||
           !shouldBeParkingOnOddSide && streetSide === 'even'
  }

  switchSidesAt(dateTime) {
    return new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate(),
      this._rules.oddSideDaysSwitchHours,
      0,
      0
    )
  }

  timeRemainingOnSide(dateTime, streetSide) {
    const day = dateTime.getDay() + 1 // Sunday is 1, not 0

    let shouldBeParkingOnOddSide = this._rules.oddSideDays.includes(day)
    let timeToSwitchSides = this.switchSidesAt(dateTime)
    if (timeToSwitchSides <= dateTime) {
      shouldBeParkingOnOddSide = !shouldBeParkingOnOddSide
      timeToSwitchSides.setDate(timeToSwitchSides.getDate() + 1)
    }

    if (this.onCorrectSide(shouldBeParkingOnOddSide, streetSide)) {
      return (timeToSwitchSides - dateTime) / 60000
    }
    return 0
  }
}
