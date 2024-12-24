import React, { useState } from 'react';
import axios from '../axiosConfig'; // Use the configured Axios instance

const PriorityScheduling = () => {
  const [processes, setProcesses] = useState([{ processId: '', priority: '', burstTime: '', arrivalTime: '' }]);
  const [result, setResult] = useState(null);

  const handleProcessChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = value;
    setProcesses(newProcesses);
  };

  const addProcess = () => {
    setProcesses([...processes, { processId: '', priority: '', burstTime: '', arrivalTime: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = processes.map(process => ({
      processId: process.processId,
      priority: Number(process.priority),
      burstTime: Number(process.burstTime),
      arrivalTime: Number(process.arrivalTime),
    }));

    console.log("Submitting data:", formattedData);

    try {
      const response = await axios.post('/priority_scheduling', { processes: formattedData });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the data.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Priority Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <h3>Enter Process Details</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Priority</th>
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
                    value={process.priority}
                    onChange={(e) => handleProcessChange(index, 'priority', e.target.value)}
                    placeholder="Enter priority"
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

export default PriorityScheduling;
 