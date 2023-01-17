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
	const labels = contracts.map(contract => contract.address);
	const data: ChartData<'bar'> = {
		labels,
		datasets: contracts.map(contract => ({
			label: contract.address,
			data: contract.functions.map(f => f.count),
		}))
	}

	return (
		<Bar options={options} data={data} />
	)
}