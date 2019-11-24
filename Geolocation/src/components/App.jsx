/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './Header/Header.jsx'
import Scanner from './Scanner/Scanner.jsx'
import Point from './Point/Point.jsx'
import Button from './Button/Button.jsx'

import './App.css'

import axios from 'axios'

export default class App extends React.Component {

    getGeolocation () {
        if ('geolocation' in navigator) {   // Lo primero que deben hacer es validar si el dispositivo soporta geolocacion

			const success = position => {   // Esta funcion va a ser un callback que va a recibir la posición del dispositivo

				this.setState({
					myLatitude: position.coords.latitude,
					myLongitude: position.coords.longitude,
					myHeading: position.coords.heading
				})

				// console.table(position.coords)

				/*
					Position acá es un objeto con las siguientes propiedades:
	
					latitude : la latitud
					longitude : la longitud
					altitude : la altitud en metros sobre el nivel del mar
					accuracy : el radio, en metros que indica la incertidumbre de la medida de la posición
					altitudeAccuracy : el radio, en metros que indica la incertidumbre de la medida de la altitud
					heading : indica la direccion en la que este dispositivo se esta moviendo (con relacion al norte absoluto)
					speed : la velocidad a la que se mueve en metros sobre segundo
				*/
			}
	
			const error = err => {
				console.log('error', err)
	
				/*
					El error tiene dos valores, un código de error y un texto
	
					el codigo puede ser
					- 0 si es un error generico
					- 1 si el usuario respondio que "no" al prompt de "This webpage wants to know your location"
					- 2 si no se pudo determinar la ubicacion, por ejemplo, si no tiene acceso a los satelites de GPS ni a wifi
					- 3 si no se pudo acceder al sensor en el tiempo limite
				*/
			}
	
			// Este metodo nos da la ubicacion cada vez que el usuario se mueva
			navigator.geolocation.watchPosition(
				success,  // success se va a llamar dos veces por cada cambio de ubicacion
				error,
				{
					maximumAge: 0,
					enableHighAccurancy: true
				}
			)
	
			// Para debuggear, usen sus developer tools > el menu de los tres puntos > More tools > Sensors > geolocation
			// Pueden cambiar su ubicacion mientras desarrollan
	
		}
		else {
			console.log('doesnt have geolocation')
		}
    }

    constructor (props) {
		super(props)
		
		this.state = {
			me: 'Javier Carpio',
			myLatitude: 0,
			myLongitude: 0,
			myHeading: 0,
			users: [],
			zoom: 1000
		}
    }
    
    componentDidMount () {
        this.getGeolocation()

		this.interval = setInterval(() => {
			axios({
				url: 'https://msdeus.site/lab10',
				method: 'post',
				data: {
					query:
					`
					query {
						allUsers {
						  name
						  latitude
						  longitude
						  updatedAt
						}
					  }
					`
				}
			}).then(response => {
				// console.table(response.data.data.allUsers)
				this.setState({
					users: response.data.data.allUsers
				})
			})

			axios({
				url: 'https://msdeus.site/lab10',
				method: 'post',
				data: {
					query:
					`
					mutation {
						updateUser (name: "Javier Carpio", latitude: "${this.state.myLatitude}", longitude: "${this.state.myLongitude}") {
						  name
						}
					}
					`
				}
			}).then(() => { })

		}, 2000)
	}

	zoomIn () {
		this.setState({
			zoom: this.state.zoom + 100
		})
		console.log(this.state.zoom)
	}

	zoomOut () {
		if (this.state.zoom !== 100) {
			this.setState({
				zoom: this.state.zoom - 100
			})
		}
	}

    render () {
        return (
            <div>
                <Header />

                <div className='appBodyStyle'>
                    <Scanner />
					{
						this.state.users.map((user, index) => (
							user.name !== this.state.me ? <Point key={index} zoom={this.state.zoom} name={user.name} time={user.updatedAt} latitude={user.latitude} longitude={user.longitude} centerX={this.state.myLongitude} centerY={this.state.myLatitude} />
								: null
						))
					}

					<div className="buttonContainer">
						<Button op='+' click={() => this.zoomIn()} />
						<Button op='-' click={() => this.zoomOut()} />
					</div>
                </div>
            </div>
        )
    }
}