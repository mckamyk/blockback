import {client} from '../elastic/client'
import { ConsensusBlock, ParsedExecutionBlock, EnrichedBaseTransaction } from '@/types/consensus'

export const getBlock = async (slot: number): Promise<ConsensusBlock> => {
	const response = await client.search<ConsensusBlock>({
		index: 'consensus-*',
		query: {
			match: {
				slot
			}
		},
		size: 1
	})

	const docs: ConsensusBlock[] = response.hits.hits.map(doc => doc._source!)
	return docs[0];
}

export const getAndHydrateBlock = async(slot: number): Promise<ConsensusBlock> => {
	const blk = await getBlock(slot);
	const [exec, txns] = await Promise.all([hydrateSlots([blk]), hydrateBlocks([blk])])

	return {...blk, executionPayload: {
		...exec[0], 
		transactions: txns
	}}
}

export const getLatestBlocks = async (page = 0, size = 10): Promise<ConsensusBlock[]> => {
	const response = await client.search<ConsensusBlock>({
		index: 'consensus-1',
		sort: [
			{"slot" : "desc"}
		],
		size,
		from: page * size
	})

	const docs: ConsensusBlock[] = response.hits.hits.map(doc => doc._source!);
	const [execBlocks, txns] = await Promise.all([hydrateSlots(docs), hydrateBlocks(docs)])

	return docs.map(slot => {
		const block = execBlocks.find(blk => blk.blockHash === slot.executionPayload as unknown as string)!
		const transactions = txns.filter(txn => txn.slot === slot.slot)

		return {
			...slot,
			executionPayload: {
				...block,
				transactions,
			}
		}
	})
}

export const hydrateSlots = async (slots: ConsensusBlock[]): Promise<ParsedExecutionBlock[]> => {
	const blocks = await client.search<ConsensusBlock['executionPayload']>({
		index: 'blocks-*',
		query: {
			bool: {
				minimum_should_match: 1,
				should: slots.map(slot => ({
					term: { hash: slot.executionPayload }
				}))
			}
		},
		size: 10000
	})

	return blocks.hits.hits.map(block => block._source!);
}

export const hydrateBlocks = async (blocks: ConsensusBlock[]): Promise<EnrichedBaseTransaction[]> => {
	const txns = await client.search({
		index: 'transactions-*',
		query: {
			bool: {
				minimum_should_match: 1,
				should: blocks.map(block => ({
					term: { slot: block.slot }
				}))
			}
		},
		size: 5000

	})

	return txns.hits.hits.map(txn => txn._source as EnrichedBaseTransaction);
}