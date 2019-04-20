import React from 'react';
import { mount } from 'enzyme';
import ParkedView from '../../views/ParkedView'


describe('ParkedView', () => {
  let mountView, dummyParkingSpot

  beforeEach(() => {
    dummyParkingSpot = {
      latitude: () => 0,
      longitude: () => 0,
      timeRemaining: () => 0
    }

    mountView = () => mount(
      <ParkedView parkingSpot={dummyParkingSpot}/>
    )
  })

  describe('#render', () => {
    it('works', () => {
      expect(mountView).not.toThrow()
    })
    describe('when time remaining is unknown', () => {
      it('tells the user to wait', () => {
        dummyParkingSpot.timeRemaining = () => undefined
        const wrapper = mountView()
        expect(wrapper.find('[testID="calculatingView"]')).toExist()
      })
    })

    describe('when time remaining is known', () => {
      it('shows the time remaining', () => {
        dummyParkingSpot.timeRemaining = () => 5
        const wrapper = mountView()
        expect(wrapper.find('[testID="countdownView"]')).toExist()
      })
    })


    describe('when time remaining has expired', () => {
      it('tells the user that they are not permitted on that side of the street', () => {
        dummyParkingSpot.timeRemaining = () => 5
        let wrapper = mountView()
        expect(wrapper.find('[testID="countdownView"]')).toExist()
        dummyParkingSpot.timeRemaining = () => 0
        expect(wrapper.update().find('[testID="timeExpiredView"]')).toExist()
      })
    })
  })
})
