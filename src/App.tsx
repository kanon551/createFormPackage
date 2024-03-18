import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './utils/Layout';
import { FormField } from './utils/useValidation';
import FormCard from './pages/FormCard';
import TestCard from './pages/TestCard';


const App = () => {

  const schema1: FormField[] = [
    {
      type: 'text',
      label: 'Hello',
      validation: 'number',
      min: 0,
      max: 100,
    },
    {
      type: 'checkbox',
      mode: 'single',
      label: 'Gender',
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
        min: 2,
        max: 50,
    },
    {
        type: 'email',
        label: 'Email Address',
        validation: 'number',
        min: 2,
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
            {/* <Route path="/" element={<Layout><Home schema={schema}/></Layout>} /> */}
            {/* <Route path="/" element={<Layout><FormCard/></Layout>} /> */}
            <Route path="/" element={<Layout><TestCard/></Layout>} />
            </Routes>
      </Router>
    </div>
  )
}
export default App;