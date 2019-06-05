import React from 'react';
import Details from './details';
import { shallow } from 'enzyme';




describe('Details component snapshot', () => {

    it("renders without crashing", () => {
        const details = shallow(<Details />);
        expect(details).toMatchSnapshot();
    });

});


