import React from 'react';
import PENGINAPAN from './Components/Penginapan';
import GoogleMapReact from 'google-map-react';
import Marker from './Components/Marker';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      penginapane: [],
      pilihPenginapan: null,
      semuaPenginapan: [],
      cari: ' '
    };
  }

  componentDidMount() {
    fetch(
      'https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json'
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          penginapane: data,
          semuaPenginapan: data
        });
      });
  }
  pilihPenginapan = inap => {
    this.setState({
      pilihPenginapan: inap
    });
  };
  cariPenginapan = event => {
    this.setState({
      cari: event.target.value,
      penginapane: this.state.semuaPenginapan.filter(inap =>
        new RegExp(event.target.value, 'i').exec(inap.nama)
      )
    });
  };
  render() {
    let center = {
      lat: -7.9768247,
      lng: 112.6567693
    };
    if (this.state.pilihPenginapan) {
      center = {
        lat: this.state.pilihPenginapan.lat,
        lng: this.state.pilihPenginapan.lng
      };
    }
    return (
      <div className='app'>
        <div className='main'>
          <div className='cari'>
            <input
              type='text'
              placeholder='Pencarian....'
              value={this.state.cari}
              onChange={this.cariPenginapan}
            />
          </div>
          <div className='Penginapan'>
            {this.state.penginapane.map(inapin => {
              return (
                <PENGINAPAN
                  key={inapin.id}
                  inap={inapin}
                  pilihPenginapan={this.pilihPenginapan}
                />
              );
            })}
          </div>
        </div>
        <div className='peta'>
          <GoogleMapReact center={center} zoom={15}>
            {this.state.penginapane.map(inapin => {
              return (
                <Marker
                  key={inapin.id}
                  lat={inapin.lat}
                  lng={inapin.lng}
                  text={inapin.harga}
                  dipilih={inapin === this.state.pilihPenginapan}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
