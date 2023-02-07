import { Transaction } from "ethers";

export interface EnrichedBaseTransaction extends Omit<Transaction, 'gasLimit' | 'gasPrice' | 'maxPriorityFeePerGas' | 'maxFeePerGas' | 'value'> {
  gasLimit: string;
  gasPrice?: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  value?: string;
	'@timestamp': number;
	hash: string;
	txType: 'transfer' | 'create' | 'call'
}

export interface ConsensusBlock {
	slot: number;
	proposerIndex: number;
	parentRoot: string;
	attestations: ParsedAttestations[];
	deposits: ParsedDeposit[];
	executionPayload: ParsedExecutionBlock;
	graffiti: string;
	stateRoot: string;
	attesterSlashings: AttestationSlashing[];
	proposerSlashing: ProposerSlashing[];
	randaoReveal: string;
	voluntaryExits: any[];
}

export interface ParsedDeposit {
	amount: number,
	pubkey: string;
	signature: string;
	withdrawalCredentials: string;
}
export interface ParsedAttestations {
	index: number;
	slot: number;
	beaconBlockRoot: string; // to parse
	source: {
		epoch: number;
		root: string; // to parse
	}
	target: {
		epoch: number;
		root: string; // to parse
	}
}

export interface ParsedExecutionBlock {
	baseFeePerGas: number;
	blockHash: string; // to parse
	blockNumber: number;
	extraData: string; // to parse
	feeRecipient: string; // to parse
	gasLimit: number;
	gasUsed: number;
	logsBloom: string; // to parse
	parentHash: string; // to parse
	prevRandao: string; // to parse
	receiptsRoot: string; // to parse
	stateRoot: string; // parse
	timestamp: number;
	transactions: EnrichedBaseTransaction[];
}

export interface ProposerSlashing {
	signedHeader1: {
		slot: number;
		bodyRoot: string;
		parentRoot: string;
		proposerIndex: number;
		stateRoot: string;
		signature: string;
	}
	signedHeader2: {
		slot: number;
		bodyRoot: string;
		parentRoot: string;
		proposerIndex: number;
		stateRoot: string;
		signature: string;
	}
}
export interface AttestationSlashing {
	attestation1: {
		attestingIndices: number[]
		beaconBlockRoot: string;
		index: number;
		slot: number;
		source: {
			epoch: number
			root: string;
		}
		target: {
			epoch: number;
			root: string;
		}
		signature: string;
	}
	attestation2: {
		attestingIndices: number[]
		beaconBlockRoot: string;
		index: number;
		slot: number;
		source: {
			epoch: number
			root: string;
		}
		target: {
			epoch: number;
			root: string;
		}
		signature: string;
	}
}

export type TransactionType = 'transfer' | 'create' | 'call';

export interface TypedTransaction extends Transaction {
  txType: TransactionType;
  hash: string;
  '@timestamp': number;
}

type overrides = 'gasLimit' | 'gasPrice' | 'maxPriorityFeePerGas' | 'maxFeePerGas' | 'value' | 'gasUsed' | 'baseFeePerGas' | 'transactions' | 'difficulty' | '_difficulty' | 'miner';

export interface EnrichedBaseTransaction extends Omit<TypedTransaction, overrides> {
  gasLimit: string;
  gasPrice?: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  value?: string;
  slot: number;
}