import React, { Component } from 'react';
import './MapResult.css'

class MapResult extends Component {

	constructor(props) {
		super(props)
		this.state = {
			style: {
				border: 'none'
			}
		}
	}

	open(scroll) {
		/*console.log('MapResult.open')*/
		this.setState({
			style: {
				border: '5px dashed red'
			}
		})
		if (scroll) this.ref.scrollIntoViewIfNeeded()
	}

	close() {
		/*console.log('MapResult.close')*/
		this.setState({
			style: {
				border: 'none'
			}
		})
	}

	getData() {
		return this.props.result
	}

	render() {
		const style = this.state.style
		const result = this.props.result
		return (
			<div
				ref={ref => {this.ref = ref}}
				style={style}
				onClick={this.props.onClick}
				className="sf-map-result-container">
				<span className="sf-map-result-title">{result.name}</span>
				<br/>
				<span className="sf-map-result-addr">{this.props.parseStreetAddress(result.location)}</span>
				<br/>
				<span className="sf-map-result-phone">{result.phones[0].number}</span>
				<br/>
				<span className="sf-map-result-bulkbill">{'Bulk Billing: ' + (!result['is_bulk_billing'] ? 'No' : 'Yes')}</span>
				<br/>
				<a href={result.web} className="sf-map-result-website">{result.web}</a>
			</div>
		)
	}
}

export default MapResult