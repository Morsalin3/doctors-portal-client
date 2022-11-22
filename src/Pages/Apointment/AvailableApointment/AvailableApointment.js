import React, { useEffect, useState } from 'react';
import {format} from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableApointment = ({selectedDate}) => {
        // const [appointmentOptions, setAppointmentOptions] = useState([])
        const [treatment, setTreatment] = useState(null)
        const date = format(selectedDate, 'PP')

        // loadData 2 way with tanstack query
        //comt: load data with fetch then
        // const {data:appointmentOptions = []} = useQuery({
        //     queryKey: ['appointmentOptions'],
        //     queryFn: ()=> fetch('http://localhost:5000/appointmentOptions')
        //     .then(res=>res.json())
        // })

        //comt: laod data with async await-tanstack
        const {data : appointmentOptions = [], refetch, isLoading } = useQuery({
            queryKey:['appointmentOptions'],
            queryFn: async()=>{
                const res = await fetch(`http://localhost:5000/v2/appointmentOptions?date=${date}`);
                const data = await res.json();
                return data;
            }
        });

        if(isLoading){
            return <Loading></Loading>
        }

        // useEffect(()=>{
        //     fetch('http://localhost:5000/appointmentOptions')
        //     .then(res=>res.json())
        //     .then(data => setAppointmentOptions(data))
        // },[])

    return (
        <section className='my-16'>
            <p className='text-center font-bold text-secondary'>Available Appointment on{format(selectedDate, "PP")}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
            {
                appointmentOptions.map(option => <AppointmentOption
                key={option._id}
                AppointmentOption={option}
                setTreatment={setTreatment}
                ></AppointmentOption>)
            }
            </div>
           {
           treatment && 
           <BookingModal
            treatment={treatment}
            selectedDate={selectedDate}
            setTreatment={setTreatment}
            refetch={refetch}
            ></BookingModal>}

        </section>
    );
};

export default AvailableApointment;