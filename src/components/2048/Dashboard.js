import React, { Component } from 'react';
import Numbers from './Numbers';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dashboard: null,
			n: 'n'
		};
	}

	createDashboard = () => {
		let table = [];

		for (let i = 0; i < 4; i++) {
			let children = []
			for (let j = 0; j < 4; j++) {
				children.push(<td className="cell" key={i + "" + j}>
					<div className="number">
						<Numbers
							numberName={this.state.n.concat(this.props.dashboard[i][j])}
							numberNamePrint={this.props.dashboard[i][j]}
						/>
					</div>
				</td>)
			}
			table.push(<tr key={i}>{children}</tr>)
		}
		return table
	}

	render = () => {
		return (
			<table cellSpacing="4" className="dashboard">
				<tbody>
					{this.createDashboard()}
				</tbody>
			</table>
		);
	};
}