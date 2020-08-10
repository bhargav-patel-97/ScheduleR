import React, { Component } from 'react';
import AddAppoinments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import '../css/App.css';

import { without, findIndex } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      query: ''
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

  updateInfo = (name, value, id) => {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts
    })
  }

  searchQuery = (query) => {
    this.setState({query: query});
  }

  changeOrder = (order,dir) => {
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  };

  deleteAppointment = (appointment) => {
    let ogAppointments = this.state.myAppointments;
    ogAppointments = without(ogAppointments, appointment);
    this.setState({
      myAppointments: ogAppointments
    });
  };

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  };

  addAppointment = (apt) => {
    let tmpApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tmpApts.unshift(apt);
    this.setState({
      myAppointments: tmpApts,
      lastIndex: this.state.lastIndex + 1
    }); 
  };

  render () {

    let order;
    let filteredApts = this.state.myAppointments;
    if(this.state.orderDir === 'asc') {
      order = 1;
    } else {
      this.state.orderDir = 'dsc'
      order = -1;
    }

    filteredApts = filteredApts.sort((a,b) => {
      if (a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }

    })
    .filter(eachItem => {
      return(
        eachItem['petName']
        .toLowerCase()
        .includes(this.state.query.toLowerCase()) ||
        eachItem['ownerName']
        .toLowerCase()
        .includes(this.state.query.toLowerCase()) ||
      eachItem['aptNotes']
        .toLowerCase()
        .includes(this.state.query.toLowerCase())
      )
    });

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
              <SearchAppointments
                orderBy={this.state.orderBy}
                orderDir={this.state.orderDir} 
                changeOrder={this.changeOrder}
                searchQuery={this.searchQuery} />
              <ListAppointments 
                appointments={filteredApts} 
                deleteAppointment={this.deleteAppointment}
                updateInfo={this.updateInfo} />
            </div>
          </div>
        </div>
      </div>
    </main>
    );
  }
}

export default App;
