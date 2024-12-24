import React, { useState } from 'react';
import axios from '../axiosConfig'; // Use the configured Axios instance
import ProcessForm from './ProcessForm';

const FCFS = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = async (data) => {
    try {
      // Log data to check if it's being passed correctly
      console.log('Form Data:', data);

      // Check if all necessary fields are present
      const isValid = data.processes.every(
        (process) =>
          process.processId &&
          process.burst_time &&
          process.arrival_time
      );

      if (!isValid) {
        console.error('Error: Missing fields in process data');
        return;
      }

      const response = await axios.post('/fcfs', data);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">First-Come, First-Served Scheduling</h2>
      <ProcessForm onSubmit={handleSubmit} />

      {result && (
        <div className="mt-4">
          <h3>Scheduling Results</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Waiting Time</th>
                <th>Turnaround Time</th>
                <th>Response Time</th>
              </tr>
            </thead>
            <tbody>
              {result.processes && result.processes.map((process, index) => (
                <tr key={index}>
                  <td>{process.processId}</td>
                  <td>{process.waiting_time}</td>
                  <td>{process.turnaround_time}</td>
                  <td>{process.response_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p><strong>Average Waiting Time:</strong> {result.avg_wt}</p>
            <p><strong>Average Turnaround Time:</strong> {result.avg_tat}</p>
            <p><strong>Average Response Time:</strong> {result.avg_rt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FCFS;
