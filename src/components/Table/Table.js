import * as React from 'react';
import styles from './Table.module.scss';

export default (class Table extends React.PureComponent {
    render() {
		const { data } = this.props;
		return (
			<div className={styles.main}>
				<table className={styles.table}>
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{data.map((header, i) => {
								return (
									<th key={i} className={styles.header_item}>
										{header.title}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						<tr className={styles.row}>
							{data.map((header, i) => {
								return (
								<td key={i} className={styles.row_item}>
									{header.items.map((index, a) => {
									return (<div key={a}>{index}</div>);
									})}
								</td>	
								);
							})}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});