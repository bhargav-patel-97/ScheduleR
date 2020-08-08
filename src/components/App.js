import React, { Component } from 'react';
import AddAppoinments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import '../css/App.css';

import { without } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0
    };
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const appointments = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        })
        this.setState({
          myAppointments: appointments
        })
      });
  }

  deleteAppointment = (appointment) => {
    let ogAppointments = this.state.myAppointments;
    ogAppointments = without(ogAppointments, appointment);
    this.setState({
      myAppointments: ogAppointments
    });
  }

  render () {
    return (
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppoinments />
              <SearchAppointments />
              <ListAppointments appointments={this.state.myAppointments} deleteAppointment={this.deleteAppointment}/>
            </div>
          </div>
        </div>
      </div>
    </main>
    );
  }
}

export default App;
