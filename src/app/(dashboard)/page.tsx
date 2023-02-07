import { getLatestBlocks } from '@/api/consensus/getSlot'
import Dropdown, { DropdownItem } from '@/components/Dropdown';
import LinkButton from '@/components/LinkButton';
import {ConsensusBlock} from '@/types/consensus';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';
import Link from 'next/link';

interface DashboardComponentProps {
	searchParams: {
		page?: string
		size?: string;
	}
}

const pageSizes: DropdownItem[] = [
	{ href: { pathname: '/', query: { size: 10, page: 0 } }, text: '10' },
	{ href: { pathname: '/', query: { size: 25, page: 0 } }, text: '25' },
	{ href: { pathname: '/', query: { size: 50, page: 0 } }, text: '50' },

]

const Dashboard = async ({searchParams}: DashboardComponentProps) => {
	const page = Number(searchParams.page) || 0;
	const size = Number(searchParams.size) || 10;
	const blocks = await getLatestBlocks(page, size);

	return (
		<div className="p-4 bg-slate-800 rounded-xl">
			<table className="w-full border-collapse">
				<thead className="text-left">
					<tr className="">
						<th>Slot</th>
						<th>Block</th>
						<th>Age</th>
						<th>Txn</th>
						<th>Fee Recipient</th>
						<th>Gas Used</th>
						<th>Gas Limit</th>
						<th>Base Fee</th>
						<th>Reward</th>
						<th>Burnt Fees</th>
					</tr>
				</thead>
				<tbody>
					{blocks.map(renderSlot)}
				</tbody>
			</table>
			<div className="flex justify-between">
				<div>
					<Dropdown items={pageSizes} name="Page Size"></Dropdown>
				</div>
				<div className="flex">
					<LinkButton disabled={page === 0} className="mr-2" href={{query: {page: 0, size: size}}}><ChevronDoubleLeftIcon height={20} />First Page</LinkButton>
					<LinkButton disabled={page === 0} className="mr-2" href={{query: {page: page-1, size: size}}}><ChevronLeftIcon width={20} />Prev</LinkButton>
					<LinkButton className={page === 0 ? 'disabled' : ''} href={{query: {page: page+1, size: size}}}>Next<ChevronRightIcon width={20}/></LinkButton>
				</div>
			</div>
		</div>
	)
}

const renderSlot = (block: ConsensusBlock, index: number) => {
	return (
		<tr key={index} className="hover:bg-slate-600 transition-colors border-b-2 border-gray-900 last:border-b-transparent first:border-t-2 border-t-gray-900">
			<td className='py-2'><Link className="text-blue-400 underline" href={`/consensus/${block.slot}`}>#{block.slot}</Link></td>
			<td>#{block.executionPayload.blockNumber}</td>
			<td>{getAge(block.executionPayload.timestamp)}</td>
			<td>{block.executionPayload.transactions.length}</td>
			<td>{block.executionPayload.feeRecipient}</td>
			<td>{renderGasUsed(Number(block.executionPayload.gasUsed), Number(block.executionPayload.gasLimit))}</td>
			<td>{Number(block.executionPayload.gasLimit).toLocaleString()}</td>
			<td>{ethers.utils.parseUnits(block.executionPayload.baseFeePerGas.toString()!, 'wei').toString()}</td>
			<td>0.05</td>
			<td>foo</td>
		</tr>
	)
}

const renderGasUsed = (gasUsed: number, gasLimit: number) => {
	const isFull = gasUsed > gasLimit;

	return (
		<div className="w-24">
			<div className='text-center'>
				{gasUsed.toLocaleString()}
			</div>
			{isFull ? (
				<div className='w-full h-2 bg-green-600 rounded-full'>
					<div className='h-2 border-r-red-700 border-r-4 rounded-full' style={{width: `${gasLimit/gasUsed*100}%`}} />
				</div>
			) : (
				<div className='w-full h-2 bg-gray-900 rounded-full'>
					<div className="h-2 bg-blue-600 rounded-full" style={{width: `${gasUsed/gasLimit*100}%`}} />
				</div>
			)}
		</div>
	)
}

const getAge = (date: number) => {
	const diff = new Date().getTime() - new Date(date*1000).getTime();
	const second = 1;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	if (diff > day) {
		const days = Math.floor(diff/day)
		const hours = Math.floor((diff - (days * day))/hour)
		return `${days}d ${hours}h`
	} else if (diff > hour) {
		const hours = Math.floor(diff/hour)
		const minutes = Math.floor((diff - (hours * hour))/minute)
		return `${hours}h ${minutes}m`
	} else if (diff > minute) {
		const minutes = Math.floor(diff/minute)
		const seconds = Math.floor((diff - (minutes * minute))/second);
		return `${minutes}m ${seconds}s`;
	} else {
		return `${Math.floor(diff/second)}s`
	}
}

export default Dashboard