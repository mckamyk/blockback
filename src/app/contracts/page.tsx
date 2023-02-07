import { getContractsByFunctions } from "@/api/elastic/contracts/contracts"
import ContractBars from './chart';

export default async function Contracts() {
	const contracts = await getContractsByFunctions();

	return (
		(
			<>
				<ContractBars contracts={contracts} />
				<pre>{JSON.stringify(contracts, undefined, 2)}</pre>
			</>
		)
	)
}