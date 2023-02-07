import React from 'react'
import { getAndHydrateBlock, getBlock } from "@/api/consensus/getSlot";
import ClientTabs from './clientTabs';

interface ConsensusBlockParams {
	params: {
		slot: string;
	}
}

const ConsensusBlock = async ({params}: ConsensusBlockParams) => {
	const slot = params.slot as string
	const blk = await getAndHydrateBlock(Number(slot))

	return (
		<ClientTabs block={blk} />
	)
}

export default ConsensusBlock