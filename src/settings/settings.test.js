import React from 'react';
import Settings from './settings';
import { shallow } from 'enzyme';
import { Link } from "react-router-dom";



describe("Settings basic tests", () => {

    it("renders without crashing", () => {
        shallow(<Settings />);
    });

    it("renders Link", () => {
        shallow(<Link to="/settings" />);
    });

    it('includes two input radio button', () => {
        const settings = shallow(<Settings />);
        expect(settings.find('input')).toHaveLength(2);
    });

});


