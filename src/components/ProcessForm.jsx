import React, { useState } from 'react';

const ProcessForm = ({ onSubmit }) => {
  const [processData, setProcessData] = useState({
    processes: [{ processId: '', burst_time: '', arrival_time: '' }],
    quantum: '',
  });

  // Handle changes in input fields
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProcesses = [...processData.processes];
    updatedProcesses[index][name] = value;
    setProcessData({ ...processData, processes: updatedProcesses });
  };

  // Handle adding a new process
  const handleAddProcess = () => {
    setProcessData((prevState) => ({
      ...prevState,
      processes: [
        ...prevState.processes,
        { processId: '', burst_time: '', arrival_time: '' },
      ],
    }));
  };

  // Handle removing a process
  const handleRemoveProcess = (index) => {
    const updatedProcesses = processData.processes.filter((_, i) => i !== index);
    setProcessData({ ...processData, processes: updatedProcesses });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(processData); // Pass process data to the parent component
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-4">
        <h4 className="mb-3">Process Details</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processData.processes.map((process, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="processId"
                    className="form-control"
                    value={process.processId}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="burst_time"
                    className="form-control"
                    value={process.burst_time}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="arrival_time"
                    className="form-control"
                    value={process.arrival_time}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveProcess(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-success mb-3" onClick={handleAddProcess}>
          Add Process
        </button>
        <div className="mb-3">
          <label htmlFor="quantum" className="form-label">
            Quantum:
          </label>
          <input
            id="quantum"
            type="number"
            name="quantum"
            className="form-control"
            value={processData.quantum}
            onChange={(e) => setProcessData({ ...processData, quantum: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;
