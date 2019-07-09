import * as React from 'react';
import styles from './InBoard.module.scss';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

class InBoard extends React.Component {
	state = {};

	componentDidMount() {}

	render() {
		const { object, onAddButtonClick, onAddInputChange } = this.props;
		return (
			<div className={styles.main}>
							
				<div className={styles.container}>
						<div className={styles.group}>
						<p className={styles.title}>{object.title} axis</p>
						<div className={styles.container_input}>
							<Input type="text" value={object.input.add} onChange={onAddInputChange} />
						</div>
						<Button type={'add'} onClick={onAddButtonClick} />
					</div>
				</div>
			</div>
		);
	}
}

export default InBoard;
