import * as React from 'react';
import styles from './Board.module.scss';
import List from '../components/List/List';
import { IconXMark } from '../resources/svg/Icons';

class Board extends React.Component {
	state = {};

	componentDidMount() {}

	onRemoveItem = (index) => {
		const { onRemoveItem } = this.props;
		onRemoveItem(index);
	};


	render() {
		const { object, onRemoveBoard } = this.props;
		return (
			<div className={styles.main}>
				
				<div className={styles.container_title}> 
					<p className={styles.title}>{object.title} axis</p>
					<div onClick={onRemoveBoard}>
					<IconXMark className={styles.icon} />
					</div>
				</div>
				
				<div className={styles.container}>
					<List items={object.items} onRemoveItem={(index) => this.onRemoveItem(index)} />
					<div className={styles.group}>
					</div>
				</div>


			</div>
		);
	}
}

export default Board;
