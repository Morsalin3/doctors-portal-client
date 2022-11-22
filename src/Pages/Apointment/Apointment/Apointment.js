import React, { useState } from 'react';
import ApointmentBanner from '../ApointmentBanner/ApointmentBanner';
import AvailableApointment from '../AvailableApointment/AvailableApointment';

const Apointment = () => {
    const [selectedDate, setSeletedDate] = useState(new Date());
    return (
        <div>
            <ApointmentBanner 
            selectedDate={selectedDate}
            setSeletedDate={setSeletedDate}
            ></ApointmentBanner>

            <AvailableApointment
            selectedDate={selectedDate}
            ></AvailableApointment>
           
        </div>
    );
};

export default Apointment;