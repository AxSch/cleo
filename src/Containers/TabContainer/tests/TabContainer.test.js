import React from 'react'
import { shallow } from 'enzyme'
import TabContainer from '../TabContainer'

describe('TabContainer', () => {
    it('successfully renders', () => {
        const component = shallow(<TabContainer />)

        expect(component).toHaveLength(1)
    })
})