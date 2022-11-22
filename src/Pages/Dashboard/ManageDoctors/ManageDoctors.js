import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal =()=>{
        setDeletingDoctor(null)
    }

    const handleDeleteDoctor = doctor =>{
        console.log(doctor)
    }

    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ['doctor'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });
    
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2>manage doctors</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specilaty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={()=> setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>
                                    {/* <button className="btn "></button> */}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                title={`Are your sure want to delete`}
                message={`If you delete ${deletingDoctor.name}. It cannot be undone`}
                closeModal={closeModal}
                successAction={handleDeleteDoctor}
                modalData={deletingDoctor}
                buttonSuccess={`Delete`}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;