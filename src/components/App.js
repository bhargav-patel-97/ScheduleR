import React from 'react';
import AddAppoinments from './AddAppointments';
import '../css/App.css';

function App() {
  return (
    <main className="page bg-white" id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            <AddAppoinments />
            <div>Search Appointments</div>
            <div>List Appointments</div>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
