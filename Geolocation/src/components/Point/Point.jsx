/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prefer-stateless-function */
import './Point.css'
import React from 'react'

export default class Point extends React.Component {
	getDistance(lat1, lon1, lat2, lon2){
		const d = Math.sqrt(Math.pow(lon1 - lon2, 2) + Math.pow(lat1 - lat2, 2))

		return d * this.props.zoom
	}

	doClick(){
		this.setState({
			clicked: !this.state.clicked
		})
		console.log("clicked?: " + this.state.clicked)
	}

	getDate (date) {
		const d = new Date(date)
		const n1 = d.getMonth() + 1
		const n2 = d.getDate()
		const n3 = d.getFullYear()
		let n4 = d.getHours()
		if (n4 <= 9)
			n4 = "0" + n4
		let n5 = d.getMinutes()
		if (n5 <= 9)
			n5 = "0" + n5
		const fecha = n2 + "/" + n1 + "/" + n3 + " " + n4 + ":" + n5

		return fecha
	}

	constructor (props) {
		super(props)

		this.state = {
			clicked: false
		}
	}

	render(){
		const y = parseFloat(this.props.latitude)
		const x = parseFloat(this.props.longitude)
		const centerX = parseFloat(this.props.centerX)
		const centerY = parseFloat(this.props.centerY)

		const distance = this.getDistance(y, x, centerY, centerX)
		
		const newX = (x - centerX) * distance + centerX
		const newY = (y - centerY) * distance + centerY

		const stylePoint = {
			left: `calc(49.5vw * ${newX} / ${centerX})`,
			top: `calc(43vh * ${newY} / ${centerY})`
		}

		let show = ""
		if (this.state.clicked)
			show = "show"
		else
			show = ""

		return (
			distance <= 85.5 ? <div style={stylePoint} className='point' onClick={() => this.doClick()}>
				<span className={'popupText ' + show}>
					{this.props.name}
					<br />
					<span className="timeSize">Updated at: {this.getDate(parseInt(this.props.time))}</span>
				</span>
			</div> : null
		)
	}

}