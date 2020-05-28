import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray,
    FastField} from "formik";
import * as Yup from 'yup'
import TextError from "./TestError";


const initialValues={
    name: 'Anu',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}
const savedValues = {
    name: 'Anu',
    email: 'anugupta02@example.com',
    channel: 'melodius box',
    comments: 'Welcome to Ghaziabad',
    address: 'India',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}
const onSubmit= (values, submitProps) => {
    console.log('Form Data',values)
    console.log('submitProps', submitProps)
    submitProps.setSubmitting(false)
    submitProps.resetForm()
}

const validationSchema =  Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email Format!')
        .required('Email is required!'),
    channel: Yup.string().required('Channel is required!'),
    comments: Yup.string().required('Comments is required!')
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'TextArea is required!'
    }
    return error
}

function YoutubeForm(){
    const [formValues, setFormValues] = useState(null)
    return(
        <Formik initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            validateOnChange={true}
            validateOnBlur={false}
            validateOnMount>
            {formik => {
                console.log('Formik props', formik)
                return (
            <Form>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <Field type='text' id='name' name='name' />
                    <ErrorMessage name='name' component={TextError} />
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <Field type='email' id='email' name='email' />
                    <ErrorMessage name='email'>
                        {errorMsg => <div className='err1'>{errorMsg}</div>}
                    </ErrorMessage>
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <Field
                        type='text'
                        id='channel'
                        name='channel'
                        placeholder='YouTube channel name'
                    />
                    <ErrorMessage name='channel' component={TextError} />
                </div>

                <div className='form-control'>
                    <label htmlFor='comments'>Comments</label>
                    <Field
                        as='textarea'
                        id='comments'
                        name='comments'
                        validate={validateComments}
                    />
                    <ErrorMessage name='comments'>
                        {error => <div className='err'>{error}</div>}
                    </ErrorMessage>
                </div>

                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <FastField name='address'>
                        {({ field, form, meta }) => {
                            console.log('Render propsssss',field, form, meta)
                            return (
                                <div>
                                    <input type='text' {...field} />
                                    {meta.touched && meta.error ? (
                                        <div>{meta.error}</div>
                                    ) : null}
                                </div>
                            )
                        }}
                    </FastField>
                </div>

                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook profile</label>
                     {/*Nested Object here is social.facebook*/}
                    <Field type='text' id='facebook' name='social.facebook' />
                </div>

                <div className='form-control'>
                    <label htmlFor='twitter'>Twitter profile</label>
                       {/*Nested Object here is social.twitter*/}
                    <Field type='text' id='twitter' name='social.twitter' />
                </div>

                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary phone number</label>
                    <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                </div>

                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                    <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                </div>

                <div className='form-control'>
                    <label>List of phone numbers</label>
                    <FieldArray name='phNumbers'>
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { phNumbers } = values
                            // console.log('fieldArrayProps', fieldArrayProps)
                            // console.log('Form errors', form.errors)
                            return (
                                <div>
                                    {phNumbers.map((phNumber, index) => (
                                        <div key={index}>
                                            <Field name={`phNumbers[${index}]`} />
                                            {index > 0 && (
                                                <button type='button' onClick={() => remove(index)}>
                                                    -
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type='button' onClick={() => push('')}>
                                        +
                                    </button>
                                </div>
                            )
                        }}
                    </FieldArray>
                </div>
                <button type='button' onClick={() => setFormValues(savedValues)}>
                    Load saved data
                </button>
                <button type='reset'>Reset</button>
                <button
                    type='submit'
                    disabled={!formik.isValid || formik.isSubmitting}
                >
                    Submit
                </button>
            </Form>
                )
            }}
        </Formik>
    )
}

export default YoutubeForm
