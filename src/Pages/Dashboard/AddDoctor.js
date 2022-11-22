import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostkey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostkey);

    const navigate = useNavigate();


    const {data: sepcialties, isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async()=>{
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    const handleDoctor = data => {
        console.log(data.image[0])
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostkey}`
        fetch(url,{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgdata =>{
            // console.log(imgdata);
            if(imgdata.success){
                console.log(imgdata.data.url);
                const doctor ={
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgdata.data.url
                }

                // save doctor information to the database
                fetch('http://localhost:5000/doctors',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res=>res.json())
                .then(result =>{
                    console.log(result);
                    toast.success(`${data.name} is added successfully`)
                    navigate('/dashboard/managedoctors')
                })
            }
        })
    }

    if(isLoading){
       return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className='text-3xl'>add A doctor</h2>
            <form onSubmit={handleSubmit(handleDoctor)}>
                <div className='form-control w-full max-w-xs'>
                    <label className='label'><span className='label-text'>Name</span></label>
                    <input type='text'{...register("name", {
                        required: true
                    })} className='input input-bordered w-full' />
                    {errors.name && <p className='text-error'>{errors.name.message}</p>}
                </div>
                <div className='form-control w-full max-w-xs'>
                    <label className='label'><span className='label-text'>Email</span></label>
                    <input type='email'{...register("email", {
                        required: true
                    })} className='input input-bordered w-full' />
                    {errors.email && <p className='text-error'>{errors.email.message}</p>}
                </div>

                <div className='form-control w-full'>
                    <label className='label'><span className='label-text'>Specialty</span></label>
                    <select
                    {...register('specialty')}
                    className="select input-bordered w-full max-w-xs">
                       {
                        sepcialties.map(specialty =><option
                        key={specialty._id}
                        value={specialty.name}
                        >{specialty.name}</option> )
                       }
                        
                    </select>
                </div>
                <div className='form-control w-full max-w-xs'>
                    <label className='label'><span className='label-text'>Name</span></label>
                    <input type='file'{...register("image", {
                        required: true
                    })} className='input input-bordered w-full' />
                    {errors.img && <p className='text-error'>{errors.img.message}</p>}
                </div>

                <input className='btn btn-accent w-full mt-8' value='Add Doctor' type="submit" />
                {/* {signUpError && <p className='text-error'>{signUpError}</p>} */}
            </form>
        </div>
    );
};

/**
 * Three places to store images
 * 1. third party image hosting server
 * 2. file system of your server
 * 3. mongodb
 */

export default AddDoctor;