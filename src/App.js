import React, { useState  } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';
import FormikContainer from './components/FormikContainer'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import EnrollmentForm from './components/EnrollmentForm'
import { theme, ThemeProvider } from '@chakra-ui/core'

import YoutubeForm from "./components/YoutubeForm";

function  App() {

    const [selectedDate, setSelectedDate] = useState(null)
    return (


        <div>
        <header className="App-header">
            <DatePicker selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat='dd/MM/yyyy'
                        filterDate={date=>date.getDay() !== 6 && date.getDay() !== 0}
                        isClearable
                        showYearDropdown
                        scrollableMonthYearDropdown
            />
        </header><br/>
            <main  className="youtube">
                <YoutubeForm /></main>

            <ThemeProvider theme={theme}>
                <section className='App'>
                    {/*<FormikContainer />*/}
                    <LoginForm />
                    {/*<RegistrationForm />*/}
                    {/*<EnrollmentForm />*/}
                </section>
            </ThemeProvider>
        </div>

    )
}

export default App;


