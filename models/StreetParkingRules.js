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


  switchSidesAt(dateTime, day) {
    if(day === 1){ // There are different rules on Sunday
      return new Date(
        dateTime.getFullYear(),
        dateTime.getMonth(),
        dateTime.getDate(),
        43, // At the very beginning of Sunday, you will need to switch your car in 43 hours
        0,
        0
      )
    }
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
    let timeToSwitchSides = this.switchSidesAt(dateTime, day)

    if (timeToSwitchSides <= dateTime) {
      shouldBeParkingOnOddSide = !shouldBeParkingOnOddSide
      timeToSwitchSides.setDate(timeToSwitchSides.getDate() + 1)
    }

    if (this.onCorrectSide(shouldBeParkingOnOddSide, streetSide)) {
      return (timeToSwitchSides - dateTime) / 1000
    }
    return 0
  }
}
