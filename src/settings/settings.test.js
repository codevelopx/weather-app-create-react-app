import React from 'react';
import Settings from './settings';
import { shallow } from 'enzyme';

it('includes two input radio button', () => {
    const settings = shallow(<Settings />);
    expect(settings.find('input')).toHaveLength(2);
});