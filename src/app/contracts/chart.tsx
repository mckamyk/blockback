'use client'
import { Bar } from "react-chartjs-2";
import {type ContractByFunctions} from '../../api/elastic/contracts/contracts'
import {Chart as Chartjs, BarElement, LinearScale, Tooltip, CategoryScale, ChartOptions, ChartData} from 'chart.js';
Chartjs.register(BarElement, Tooltip, LinearScale, CategoryScale)

interface Props {
	contracts: ContractByFunctions[]
}

const options: ChartOptions<'bar'> = {
	indexAxis: 'y',
	color: 'white',
	maintainAspectRatio: false,
	scales: {
		x: {
			stacked: true,
			display: false
		},
		y: {
			stacked: true,
			display: false,
		}
	},
}


export default function ContractBars({contracts}: Props) {
	const nums = contracts.map(con => con.functions.map(fn => fn.count))
	const totals = nums.map(n => n.reduce((prev, curr) => prev+curr))
	const total = Math.max(...totals);
	options.scales!.x!.max = total

	const colors = ['green', 'blue', 'yellow', 'red']

	const configs: ChartData<'bar'>[] = contracts.map(contract => {
		return {
			labels: [contract.address],
			datasets: contract.functions.map((func, index) => {
				return {
					label: func.name,
					backgroundColor: colors[index%4],
					data: [func.count],
				}
			})
		}
	})

	return (
		<>
		{configs.map(conf => (
			<div key={conf.labels![0] as string} className='h-24 w-full'>
				<Bar height='100%' width={1000} key={conf.labels![0]! as string} options={options} data={conf} />
			</div>
		))}
		</>
	)
}