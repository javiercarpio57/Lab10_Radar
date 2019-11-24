import './Button.css'
import React from 'react'

export default class Button extends React.Component {

    doClick () {
        console.log('click')
        this.props.click ()
    }

	render(){

		return (
            this.props.op === '+' ? 
			<button className="circleButton colorGreen" onClick={() => this.doClick()} >{this.props.op}</button>
            :
            <button className="circleButton colorRed" onClick={() => this.doClick()} >{this.props.op + " "}</button>
		)
	}
}