// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import HomePage from './components/HomePage';
import RoundRobin from './components/RoundRobin';
import PriorityScheduling from './components/PriorityScheduling';
import FCFS from './components/FCFS';
import PreemptiveSJF from './components/PreemptiveSJF';
import SJFNonPreemptive from './components/SJFNonPreemptive';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return ( <
        Router >
        <
        AppNavbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < HomePage / > }
        /> <
        Route path = "/fcfs"
        element = { < FCFS / > }
        /> <
        Route path = "/preemptive-sjf"
        element = { < PreemptiveSJF / > }
        /> <
        Route path = "/priority-scheduling"
        element = { < PriorityScheduling / > }
        /> <
        Route path = "/round-robin"
        element = { < RoundRobin / > }
        /> <
        Route path = "/sjf-non-preemptive"
        element = { < SJFNonPreemptive / > }
        /> <
        /Routes> <
        /Router>
    );
}

export default App;