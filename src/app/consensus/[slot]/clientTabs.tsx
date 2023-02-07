import { ConsensusBlock } from "@/types/consensus";

export interface ClientTabProps {
	block: ConsensusBlock
}

const ClientTabs: React.FC<ClientTabProps> = ({ block }) => {
	return (
		<>
			<div className="font-semibold text-lg">Block #{block.executionPayload.blockNumber} - Slot #{block.slot}</div>
			<div className="flex justify-center">
				<div className='flex-grow xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 justify-center bg-gray-800 rounded-lg p-2 gap-2'>

					{/* Consensus Info */}
					<div className="relative bg-gradient-to-tr from-sky-700 to-emerald-700 p-1 rounded-md flex flex-col col-span-1">
						<div className='p-4 rounded bg-gray-800 flex-grow'>
							{Object.keys(block).map(key => (<div key={key}>{key}</div>))}
						</div>
						<div className="absolute top-2 right-4 text-emerald-500 font-extrabold">Consensus</div>
					</div>

					{/* Execution Info */}
					<div className="relative bg-gradient-to-tr from-pink-700 to-orange-700 p-1 rounded-md flex flex-col col-span-1">
						<div className='p-4 rounded bg-gray-800 flex-grow'>
							{Object.keys(block.executionPayload).map(key => (<div key={key}>{key}</div>))}
						</div>
						<div className="absolute top-2 right-4 font-extrabold text-orange-500">Execution</div>
					</div>

					{/* Transaction Info */}
					<div className="relative bg-gradient-to-tr lg:col-span-2 from-fuchsia-600 to to-yellow-600 p-1 rounded-md flex flex-col">
						<div className="flex-grow p-4 rounded bg-gray-800 lg:max-h-96 overflow-auto">
							{block.executionPayload.transactions.map(tx => (<div key={tx.hash}>{tx.from}</div>))}
						</div>
					</div>

				</div>
			</div>
		</>
	)
}

export default ClientTabs
