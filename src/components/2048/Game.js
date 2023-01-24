import React, { Component } from 'react';
import './Main.css';
import Dashboard from './Dashboard';
import './swiped-event.js';
import Stats from './Stats';

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dashboard: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			score: 0,
			loading: false
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
		this.restartGame();
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress(event) {
		//Left arrow
		if (event.key === "ArrowLeft") {
			this.state.dashboard = this.movesCombinesLeft(this.state.dashboard)
		} else if (event.keyCode === 38) {
			//Up arrow
			let auxiliar_dashboard = this.transposeDashboard(this.state.dashboard);
			auxiliar_dashboard = this.movesCombinesLeft(auxiliar_dashboard);
			this.state.dashboard = this.transposeDashboard(auxiliar_dashboard)
		} else if (event.keyCode === 39) {
			//Right arrow
			this.state.dashboard = this.movesCombinesRight(this.state.dashboard)
		} else if (event.keyCode === 40) {
			//Down arrow
			let auxiliar_dashboard = this.transposeDashboard(this.state.dashboard);
			auxiliar_dashboard = this.movesCombinesRight(auxiliar_dashboard);
			this.state.dashboard = this.transposeDashboard(auxiliar_dashboard)
		}

		this.newNumber();
	}

	//Moves to the left, combine and moves to the left again
	movesCombinesLeft = (dashboard) => {
		dashboard = this.moveCellsLeft(dashboard);
		dashboard = this.combiningCells(dashboard);
		return this.moveCellsLeft(dashboard);
	};

	//Move all the zero to the Right side of the row
	moveCellsLeft = (dashboard) => {
		var auxDash = this.makeCopy(dashboard);
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (auxDash[i][j] === 0 && auxDash[i][j + 1] === 0) {
					auxDash[i].splice(j, 2); //removes 2 elements from the index j
					auxDash[i].splice(2, 0, 0, 0); //removes 0 elements from index 2 and adds two zeros
				}
				if (auxDash[i][j] === 0) {
					auxDash[i].splice(j, 1);
					auxDash[i].splice(3, 0, 0);
				}
			}
		}
		return auxDash;
	};

	//Moves to the Right, combine and moves to the Right again
	movesCombinesRight = (dashboard) => {
		dashboard = this.moveCellsRight(dashboard);
		dashboard = this.combiningCells(dashboard);
		return this.moveCellsRight(dashboard);
	};

	//Move all the zero to the left side of the row
	moveCellsRight = (dashboard) => {
		var auxDash = this.makeCopy(dashboard);
		for (let i = 3; i >= 0; i--) {
			let current = 3;
			for (let j = 3; j >= 0; j--) {
				if (auxDash[i][j] !== 0) {
					auxDash[i][current] = auxDash[i][j];
					current--;
				}
			}
			while (current >= 0) {
				auxDash[i][current] = 0;
				current--;
			}
		}
		return auxDash;
	};

	transposeDashboard = (dashboard) => {
		var auxiliar_dashboard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) auxiliar_dashboard[i][j] = dashboard[j][i];
		}
		return auxiliar_dashboard;
	};

	//Make sure the position of the cell of A and B are different
	differentPosition = (positionCellA, positionCellB, auxiliar_dashboard_length) => {
		while (positionCellA === positionCellB) positionCellB = Math.floor(Math.random() * auxiliar_dashboard_length);
		return positionCellB;
	};

	//Restart the game
	restartGame = () => {
		var auxiliar_dashboard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
		var randomNumber = Math.random() < 0.9 ? 2 : 4,
			randomNumber2 = Math.random() < 0.9 ? 2 : 4;
		var randomPosition = Math.floor(Math.random() * auxiliar_dashboard.length),
			randomPosition2 = Math.floor(Math.random() * auxiliar_dashboard.length);

		auxiliar_dashboard[randomPosition].splice(randomPosition2, 1, randomNumber);

		var randomPosition3 = Math.floor(Math.random() * auxiliar_dashboard.length),
			randomPosition4 = Math.floor(Math.random() * auxiliar_dashboard.length);

		auxiliar_dashboard[this.differentPosition(randomPosition, randomPosition3, auxiliar_dashboard.length)].splice(
			this.differentPosition(randomPosition2, randomPosition4, auxiliar_dashboard.length),
			1,
			randomNumber2
		);

		this.setState({
			dashboard: auxiliar_dashboard,
			score: 0
		});
	};

	//Combine cells
	combiningCells = (dashboard) => {
		for (let i = 0; i < 4; i++) {
			for (let j = 3; j >= 1; j--) {
				let cellA = dashboard[i][j];
				let cellB = dashboard[i][j - 1];
				if (cellA === cellB) {
					dashboard[i][j] = cellA + cellB;
					this.setState({
						score: this.state.score + dashboard[i][j]
					});
					dashboard[i][j - 1] = 0;
				}
			}
		}
		return dashboard;
	};

	//Add new number to the game
	newNumber = () => {
		var auxDash = this.state.dashboard,
			cellAvailableX = [],
			cellAvailableY = [];

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (auxDash[i][j] === 0) {
					cellAvailableX.push(i);
					cellAvailableY.push(j);
				}
			}
		}
		var randomPosition = Math.floor(Math.random() * cellAvailableX.length);

		if (cellAvailableX.length > 0) {
			var auxiliar_dashboard_2 = this.makeCopy(this.state.dashboard);
			auxiliar_dashboard_2[cellAvailableX[randomPosition]][cellAvailableY[randomPosition]] =
				Math.random() < 0.9 ? 2 : 4;
			this.setState({
				dashboard: auxiliar_dashboard_2
			});
		}

		//Checking if by adding a new number the user has won or lost the game
		if (this.gameResult()) {
			this.setState({
				loading: true
			})
		}
	};

	//Won the game or Game Over
	gameResult = () => {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.state.dashboard[i][j] === 2048) alert('YOU HAVE WON THE GAME');
				else if (
					this.state.dashboard[i][j] === 0 ||
					(i !== 3 && this.state.dashboard[i][j] === this.state.dashboard[i + 1][j]) ||
					(j !== 3 && this.state.dashboard[i][j] === this.state.dashboard[i][j + 1])
				) {
					//False in case it is possible to add a new number to the dashboard or it is possible to merge two cells
					return false;
				}
			}
		}
		return true;
	};

	makeCopy = (dashboard) => {
		var auxiliar_dashboard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) auxiliar_dashboard[i][j] = dashboard[i][j];
		}
		return auxiliar_dashboard;
	};

	render = () => {
		return (
			<div className="gameContainer">
				<Stats score={this.state.score} loading={this.state.loading}/>
				<Dashboard dashboard={this.state.dashboard} />
			</div>
		);
	};
}