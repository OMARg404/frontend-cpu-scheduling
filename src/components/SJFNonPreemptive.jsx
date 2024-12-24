import React, { useState } from 'react';
import axios from '../axiosConfig'; // Use the configured Axios instance

const SJFNonPreemptive = () => {
  const [processes, setProcesses] = useState([{ processId: '', burstTime: '', arrivalTime: '' }]);
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
    if (processes.some(p => !p.burstTime || !p.arrivalTime || !p.processId)) {
      alert('Please fill all process details.');
      return;
    }
  
    // Map data to match the backend's expected structure
    const formattedData = {
      processes: processes.map((process, index) => ({
        pid: index + 1,  // Assuming PID is just the index + 1
        processId: process.processId,
        burst_time: Number(process.burstTime),  // Backend expects burst_time
        arrival_time: Number(process.arrivalTime),  // Backend expects arrival_time
      })),
    };
    
    console.log('Sending data:', formattedData);  // Log the data before sending
  
    try {
      const response = await axios.post('/sjf_non_preemptive', formattedData);
      console.log('Response:', response.data); // Log the response from the server
      setResult(response.data); // Update result with the backend response
    } catch (error) {
      console.error('Error:', error); // Log the error in case of failure
      alert('Error submitting the data.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">SJF Non-Preemptive Scheduling</h2>
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
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setProcesses(processes.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={addProcess}>Add Process</button>
        </div>

        <div>
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>

      {result && (
        <div className="mt-4">
          <h3>Results</h3>
          <div>
            <p><strong>Average Waiting Time:</strong> {result.avg_wt}</p>
            <p><strong>Average Turnaround Time:</strong> {result.avg_tat}</p>
            <p><strong>Average Response Time:</strong> {result.avg_rt}</p>
          </div>

          <h4>Processes</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Burst Time</th>
                <th>Arrival Time</th>
                <th>Waiting Time</th>
                <th>Turnaround Time</th>
              </tr>
            </thead>
            <tbody>
              {result.processes && result.processes.map((process, index) => (
                <tr key={index}>
                  <td>{process.processId}</td>
                  <td>{process.burst_time}</td>
                  <td>{process.arrival_time}</td>
                  <td>{process.waiting_time}</td>
                  <td>{process.turnaround_time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Gantt Chart</h4>
          <pre>{JSON.stringify(result.gantt_chart, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SJFNonPreemptive;
