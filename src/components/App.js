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
      lastIndex: 0,
      formDisplay: false
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

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  addAppointment = (apt) => {
    let tmpApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tmpApts.unshift(apt);
    this.setState({
      myAppointments: tmpApts,
      lastIndex: this.state.lastIndex + 1
    }); 
  }

  render () {
    return (
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppoinments 
                formDisplay={this.state.formDisplay}
                toggleForm={this.toggleForm}
                addAppointment={this.addAppointment}/>
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
