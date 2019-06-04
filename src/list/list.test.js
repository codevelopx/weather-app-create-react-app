import React from 'react';
import List from './list';
import { shallow } from 'enzyme';

it('accepts weather props', () => {

    const weather = {
        "cod": "200",
        "message": 0.0036,
        "cnt": 40,
        "list": [
            {
                "dt": 1485799200,
                "main": {
                    "temp": 261.45,
                    "temp_min": 259.086,
                    "temp_max": 261.45,
                    "pressure": 1023.48,
                    "sea_level": 1045.39,
                    "grnd_level": 1023.48,
                    "humidity": 79,
                    "temp_kf": 2.37
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "02n"
                    }
                ],
                "clouds": {
                    "all": 8
                },
                "wind": {
                    "speed": 4.77,
                    "deg": 232.505
                },
                "snow": {

                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2017-01-30 18:00:00"
            }],
    }

    const handleAvg = jest.fn(() => { [20] });

    const list = shallow(<List weather={weather} handleAvg={handleAvg} />);

    expect(list.find('.cityList'));

});


