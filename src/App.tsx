import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from './utils/Layout';
import FormCard, { FormField } from './pages/FormCard';


const App = () => {

  const schema1: FormField[] = [
    {
        type: 'text',
        label: 'Hello',
        validation: 'number',
        min: 2,
        max: 100,
    },
    {
        type: 'checkbox',
        mode: 'single',
        label: 'MaritalStatus',
    },
    {
        type: 'checkbox',
        mode: 'group',
        groupLabel: ['Male', 'Female'],
        label: 'Gender',
    },
    {
        type: 'select',
        options: ['Bangalore', 'Jaipur', 'Delhi'],
        label: 'City',
    },
];

  const schema2: FormField[] = [
    {
        type: 'text',
        label: 'Full Name',
        validation: 'number',
        min: 5,
        max: 50,
    },
    {
        type: 'text',
        label: 'Email Address',
        validation: 'number',
        min: 10,
        max: 20,
    },
    {
        type: 'select',
        options: ['Student', 'Professional', 'Academician'],
        label: 'Occupation',
    },
    {
        type: 'checkbox',
        mode: 'group',
        groupLabel: ['Workshops', 'Keynote Sessions', 'Networking Events'],
        label: 'Interests',
    },
    {
        type: 'checkbox',
        mode: 'single',
        label: 'Agree to terms and conditions?'
    },
];

  
  return (
    <div>
      <Router>
            <Routes>
            {/* <Route path="/" element={<Layout><FormCard schema={schema1} name={"Schema 1"}/></Layout>} /> */}
            <Route path="/" element={<Layout><FormCard schema={schema2} name={"Schema 2"}/></Layout>} />
            </Routes>
      </Router>
    </div>
  )
}
export default App;