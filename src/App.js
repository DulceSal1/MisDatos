import React from 'react';
import styles from './App.module.scss';
import InBoard from './InBoard/InBoard';
import Board from './Board/Board';
import produce from 'immer/dist/immer';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import { es } from 'date-fns/esm/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Table from './components/Table/Table';
import SimpleBarChart from './components/Chart/SimpleBarChart';

class App extends React.PureComponent {
	state = {
	boards:[
			{
				title: 'X',
				items: [],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			},
			{
				title: 'Y1',
				items: [],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			},
			{
				title: 'Y2',
				items: [],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			}	
		],
		input: {
			add: '',
			remove: ''
		},
		date: undefined,
		arrayelem: [],
		graphic: []
	};

	componentDidMount() {
		this.init();
	}

	init = () => {		
		let array=[]; 
		let arrayelem=[]; 
		
		const nextState = produce(this.state, (draft) => {
			draft.boards.forEach((item, i) => {		
				arrayelem = arrayelem.concat(draft.boards[i].items.length);
			});
		    arrayelem=arrayelem.sort();console.log(arrayelem);	
			let maxelem = arrayelem[2] ;
			console.log(maxelem);
			for (let a = 0; a < maxelem; a++) { 
				let varx= (typeof draft.boards[0].items[a] === 'undefined') ? '0': draft.boards[0].items[a] ;
				let vary1= (typeof draft.boards[1].items[a] === 'undefined') ? '0': draft.boards[1].items[a] ;
				let vary2= (typeof draft.boards[2].items[a] === 'undefined') ? '0': draft.boards[2].items[a] ;
				const element={xaxis:varx, y1axis:vary1, y2axis:vary2};
				array = array.concat(element);		
				
			}
			draft.graphic = array;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (property) => {
		let array=[];
		let arrayelem=[];

		const nextState = produce(this.state, (draft) => {
			const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
			draft.boards[indexBoard].items = draft.boards[indexBoard].items.concat(draft.boards[indexBoard].input.add);
			draft.boards[indexBoard].input.add = '';


            draft.boards.forEach((item, i) => {		
				arrayelem = arrayelem.concat(draft.boards[i].items.length);	
			});
			arrayelem=arrayelem.sort();
			let maxelem = arrayelem[2] ;
			console.log(maxelem);
			for (let a = 0; a < maxelem; a++) { 
				let varx= (typeof draft.boards[0].items[a] === 'undefined') ? '0': draft.boards[0].items[a] ;
				let vary1= (typeof draft.boards[1].items[a] === 'undefined') ? '0': draft.boards[1].items[a] ;
				let vary2= (typeof draft.boards[2].items[a] === 'undefined') ? '0': draft.boards[2].items[a] ;
				const element={xaxis:varx, y1axis:vary1, y2axis:vary2};
				array = array.concat(element);		
				
			}
			draft.graphic = array;
		});
		this.setState(nextState);
	};

	onRemoveItem = (index, property) => {
		const nextState = produce(this.state, (draft) => {
		const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
			draft.boards[indexBoard].items.splice(index, 1);;
		});
		this.setState(nextState);
	};

	onRemoveBoardButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
		const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
		draft.boards.splice(indexBoard, 1);
		});
		this.setState(nextState);
	};

	onAddInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			const indexBoard = draft.boards.findIndex(x => x.title ===property.title);
			draft.boards[indexBoard].input.add = value;
			console.log(property);
		});
		this.setState(nextState);
	};

	onAddBoardInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input.add = value;
			console.log(this.state.input);
		});
		this.setState(nextState);
	};

	onAddBoardButtonClick = () => {
		const nextState = produce(this.state, (draft) => {
			const newBoardtitle=draft.input.add;
			const newBoard ={
				title: newBoardtitle,
				items: [ ],
				index: 0,
				input: {
					add: '',
					remove: ''
				}
			};
			draft.boards.push(newBoard);
			draft.input.add = '';			
	console.log(this.state.boards);
		});
		this.setState(nextState);
	};

	onHandleCalendar = (date) => {
		/*console.log('TCL: Date -> onHandleCalendar -> date', date);
		console.log('TCL: Date -> onHandleCalendar -> date', moment(date).format('YYYY-MM-DD'));*/
		const nextState = produce(this.state, (draft) => {
			draft.boards[0].input.add = moment(date).format('DD-MM-YYYY');
		});
		this.setState(nextState);
	};

	render() {
		const { boards, date, graphic} = this.state;
		return (
			<div className={styles.alignBoard}>
				<div className={styles.top}>
					<div className={styles.inputBoards}>
					<p className={styles.title}>MIS DATOS</p>
					{boards.map((i) => (
						<InBoard
							object={i}							
							onAddButtonClick={() => this.onAddButtonClick(i)}
							onAddInputChange={(event) => this.onAddInputChange(event, i)}
						/>
					))}	
					</div>

					<div className={styles.calendarInput}>
					<div className={styles.datepicker}>
						<Calendar locale={es} date={date} rangeColors={[ '#3861f6' ]} color={'#3861f6'} onChange={this.onHandleCalendar} />
					</div>
					</div>

					<div className={styles.fileButton}>
					<div className={styles.countBoards}>{this.state.boards.length} Elemento(s)</div>
					</div>
				</div>


				<div className={styles.top}>
				<div className={styles.container_boards}>
					{boards.map((i) => (
						<Board
							object={i}
							onRemoveBoard={() => this.onRemoveBoardButtonClick(i)}
							onAddButtonClick={() => this.onAddButtonClick(i)}
							onAddInputChange={(event) => this.onAddInputChange(event, i)}
							onRemoveItem={(index) => this.onRemoveItem(index, i)}
						/>
					))}							
				</div>

				<div className={styles.container_table}>
					<div className={styles.table}>
						<Table data={boards}  />
					</div>						
				</div>				
				</div>
				
				<div className={styles.chart}>
						<SimpleBarChart data={graphic} x={'fecha'} y1={'y1axis'} y2={'y2axis'} y1Axis={'left'} y2Axis={'right'} />
					</div>


			</div>
		);
	}
}

export default App;
