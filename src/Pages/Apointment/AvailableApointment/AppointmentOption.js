import React from 'react';

const AppointmentOption = ({ AppointmentOption, setTreatment}) => {
    const { name, slots } = AppointmentOption;
    return (
        <div>
            <div className="card shadow-xl text-center">
                <div className="card-body flex items-center">
                    <h2 className="card-title text-center text-2xl text-secondary font-bold">{name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                    <p>{slots.length} {slots.length > 1 ? 'spaces':'space'} available</p>
                    <div className="card-actions justify-center">
                        <label
                         disabled={slots.length === 0}
                         htmlFor="booking-modal"
                         className="btn btn-primary text-white"
                         onClick={()=> setTreatment(AppointmentOption)} 
                          >Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;