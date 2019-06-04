import React from 'react';
import Form from './form';
import { shallow } from 'enzyme';

it('includes input', () => {
    const form = shallow(<Form />);
    expect(form.containsMatchingElement(<input />)).toEqual(true)
});