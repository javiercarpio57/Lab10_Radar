import './Scanner.css'
import React from 'react'

export default class Scanner extends React.Component {
	render () {
		return (
			<div className='scanner'>
				<div className='scanCircle' />
				<div className='scanCircle' />
				<div className='scanCircle' />
				<div className='scanCircle' />
				<div className='scanCircle' />

				<div className='scanBox' />
			</div>
		)
	}
}
