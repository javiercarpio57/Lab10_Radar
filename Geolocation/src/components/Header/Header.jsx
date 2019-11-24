import './Header.css'
import React from 'react'

export default class Header extends React.Component {
    render () {
        return (
            <div className='header headerFlex'>
                <h3 className="headerText">Laboratorio 10 - Radar</h3>
                <h3 className="headerText">Javier Carpio</h3>
            </div>
        )
    }
}