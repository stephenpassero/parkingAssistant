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
  })
})
