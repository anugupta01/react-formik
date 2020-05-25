import React from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'

const initialValues={
    name: 'Anu',
    email: '',
    channel: ''
}

const onSubmit= values => {
    console.log('Form Data',values);
}

// const validate = values => {
//     //errors is an object that i declared and returns the values that are instantiate
//     let errors = {}
//     if(!values.name){
//         errors.name = 'Name is Required'
//     }if(!values.email){
//         errors.email = 'Email is Required'
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
//     {
//         errors.email = 'Invalid email format'
//     }
//     if(!values.channel){
//         errors.channel = 'Channel is Required'
//     }
//     return errors
// }

const validationSchema =  Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email Format!')
        .required('Email is required!'),
    channel: Yup.string().required('Channel is required!')
})

function YoutubeForm(){
    const formik = useFormik({
//Note: initialValues properties name should be same as the name attribute of the individual fields
    initialValues,
     onSubmit,
     validationSchema
     //validate
    })
console.log('Visited Fields',formik.touched)

    return(
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
            {formik.touched.name && formik.errors.name ? (
                 <div className='error'>{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
         {formik.touched.email && formik.errors.email ? (
           <div className='error'>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input
                        type='text'
                        id='channel'
                        name='channel'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.channel}
                    />
      {formik.touched.channel && formik.errors.channel ? (
          <div className='error'>{formik.errors.channel}</div>
                    ) : null}
                </div>

                <button type='submit'>Submit</button>
            </form>

    )
}

export default YoutubeForm