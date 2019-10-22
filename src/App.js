import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { withFirebase } from './Firebase/index';


function App({ firebase }) {

  const [formState, setFormState] = useState({ name: '', latitude: '', longitude: '' });
  const [findForm, setFindForm] = useState({ latitude: '', longitude: '', radius: '' });

  const handleAddLocation = event => {
    event.preventDefault();
    const { name, latitude, longitude } = formState;

    firebase.addLocation(name, parseFloat(latitude), parseFloat(longitude))
      .then(result => console.log(result));
  };

  const handleFindLocations = event => {
    event.preventDefault();
    const { latitude, longitude, radius } = findForm;

    firebase.getLocationsInRadius(parseFloat(latitude), parseFloat(longitude), parseFloat(radius));
    
  }

  return (
    <div className="App">
      <form>
        <h1>Add Location</h1>
        <p>Name</p>
        <input type="text" placeHolder="my location" value={ formState.name } onChange={ event => setFormState({ ...formState, name: event.target.value }) } />
        <p>Latitude</p>
        <input type="text" placeHolder="ex. 59.89665250379664" value={ formState.latitude } onChange={ event => setFormState({ ...formState, latitude: (event.target.value) }) } />
        <p>Longitude</p>
        <input type="text" placeHolder="ex. 30.31071137613219" value={ formState.longitude } onChange={ event => setFormState({ ...formState, longitude: (event.target.value) }) } />
        <button type="button" onClick={ handleAddLocation }>Submit</button>
        <br/>
        <br/>
        <br/>
        <h1>Find locations in radius</h1>
        <p>Radius</p>
        <input type="text" placeholder="kilometers" value={ findForm.radius } onChange={ event => setFindForm({ ...findForm, radius: event.target.value }) } />
        <h2>Center</h2>
        <p>Latitude</p>
        <input type="text" placeHolder="ex. 59.89665250379664" value={ findForm.latitude } onChange={ event => setFindForm({ ...findForm, latitude: (event.target.value) }) } />
        <p>Longitude</p>
        <input type="text" placeHolder="ex. 30.31071137613219" value={ findForm.longitude } onChange={ event => setFindForm({ ...findForm, longitude: (event.target.value) }) } />
        <button type="button" onClick={ handleFindLocations }>Submit</button>
      </form>

    </div>
  );
}

export default withFirebase(App);
