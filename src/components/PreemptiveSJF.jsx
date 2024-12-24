import React, { useState } from 'react';
import axios from '../axiosConfig'; // Use the configured Axios instance

const PreemptiveSJF = () => {
  const [result, setResult] = useState(null);
  const [processes, setProcesses] = useState([{ processId: '', burstTime: '', arrivalTime: '' }]);

  // Handle process data change
  const handleProcessChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = value;
    setProcesses(newProcesses);
  };

  // Add a new process
  const addProcess = () => {
    setProcesses([...processes, { processId: '', burstTime: '', arrivalTime: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled and burstTime and arrivalTime are numbers
    const isValid = processes.every(
      (process) =>
        process.processId &&
        process.burstTime &&
        process.arrivalTime &&
        !isNaN(process.burstTime) &&
        !isNaN(process.arrivalTime)
    );

    if (!isValid) {
      alert('Error: All fields must be filled for each process, and burstTime and arrivalTime must be numbers!');
      return;
    }

    // Format processes for backend
    const formattedProcesses = processes.map(process => ({
      arrival: Number(process.arrivalTime), // Ensure it's a number
      burst: Number(process.burstTime),     // Ensure it's a number
    }));

    try {
      // Send the formatted process data to the backend
      console.log('Form Data:', formattedProcesses); // Log data being sent to backend

      const response = await axios.post('/preemptive_sjf', { processes: formattedProcesses });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the data. Please check the console for details.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Preemptive SJF Scheduling</h2>
      
      <form onSubmit={handleSubmit}>
        <h3>Process Details</h3>
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
                    onChange={(e) =>
                      handleProcessChange(index, 'processId', e.target.value)
                    }
                    placeholder="Enter process ID"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={process.burstTime}
                    onChange={(e) =>
                      handleProcessChange(index, 'burstTime', e.target.value)
                    }
                    placeholder="Enter burst time"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={process.arrivalTime}
                    onChange={(e) =>
                      handleProcessChange(index, 'arrivalTime', e.target.value)
                    }
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
          <button type="button" onClick={addProcess} className="btn btn-success">
            Add Process
          </button>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

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

export default PreemptiveSJF;
