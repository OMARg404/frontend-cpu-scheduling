import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured axios instance

const RoundRobin = () => {
  const [processes, setProcesses] = useState([{ processId: '', burstTime: '', arrivalTime: '' }]);
  const [quantum, setQuantum] = useState('');
  const [result, setResult] = useState(null);

  const handleProcessChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = value;
    setProcesses(newProcesses);
  };

  const addProcess = () => {
    setProcesses([...processes, { processId: '', burstTime: '', arrivalTime: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!quantum || processes.some(p => !p.burstTime || !p.arrivalTime || !p.processId)) {
      alert('Please fill all process details and quantum.');
      return;
    }

    // Map data to match the backend's expected structure
    const formattedData = {
      processes: processes.map(process => ({
        processId: process.processId,
        burstTime: Number(process.burstTime),
        arrivalTime: Number(process.arrivalTime),
      })),
      quantum: Number(quantum),
    };

    try {
      const response = await axios.post('/round_robin', formattedData);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the data.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Round Robin Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <h3>Enter Process Details</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={process.processId}
                    onChange={(e) => handleProcessChange(index, 'processId', e.target.value)}
                    placeholder="Enter process ID"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={process.burstTime}
                    onChange={(e) => handleProcessChange(index, 'burstTime', e.target.value)}
                    placeholder="Enter burst time"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={process.arrivalTime}
                    onChange={(e) => handleProcessChange(index, 'arrivalTime', e.target.value)}
                    placeholder="Enter arrival time"
                  />
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => setProcesses(processes.filter((_, i) => i !== index))}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={addProcess}>Add Process</button>

        <div className="mt-3">
          <label>Quantum Time</label>
          <input
            type="number"
            className="form-control"
            value={quantum}
            onChange={(e) => setQuantum(e.target.value)}
            placeholder="Enter quantum time"
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">Submit</button>
      </form>

      {result && (
        <div className="mt-5">
          <h3>Results</h3>
          <p><strong>Waiting Time:</strong> {JSON.stringify(result.waiting_time)}</p>
          <p><strong>Turnaround Time:</strong> {JSON.stringify(result.turnaround_time)}</p>
          <p><strong>Completion Time:</strong> {JSON.stringify(result.completion_time)}</p>
        </div>
      )}
    </div>
  );
};

export default RoundRobin;
