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
  })
})
