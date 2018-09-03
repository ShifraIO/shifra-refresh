import React, { Component } from 'react';
import './MapMarker.css'

class MapMarker extends Component {
	constructor(props) {
		super(props)
		this.state = {
			style: {
				border: 'none'
			}
		}
	}
	open() {
		console.log('MapMarker.open()')
		this.setState({
			style: {
				border: '5px dashed red'
			}
		})
	}

	close() {
		console.log('MapMarker.close()')
		this.setState({
			style: {
				border: 'none'
			}
		})
	}

	render() {
		const result = this.props.result
		const style = this.state.style
		return (
			<div
				onClick={this.props.onClick}
				className={`sf-map-marker ${result['marker_type']}`}
				style={ style }
			/>
		)
	}
}

export default MapMarker