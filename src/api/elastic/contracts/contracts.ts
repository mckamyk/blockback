import {client} from '../client';

export interface ContractByFunctions {
  address: string;
  functions: {name: string, count: number}[];
}
interface AggregationResponse {
  contracts: {
    buckets: {
      key: string;
      functions: {
        buckets: {
          key: string;
          'doc_count': number;
        }[]
      }
    }[]
  }
}

export const getContractsByFunctions = async (): Promise<ContractByFunctions[]> => {
  const resp = await client.search<unknown, AggregationResponse>({
    index: 'contract-tx-*',
    aggs: {
      contracts: {
        terms: { field: "to" },
        aggs: {
          functions: {
            terms: { field: 'function', missing: "unrecognized" },
          }
        }
      }
    }
  })

  const results = resp.aggregations!.contracts.buckets.map(contractBucket => {
    return {
      address: contractBucket.key,
      functions: contractBucket.functions.buckets.map(functionBucket => ({name: functionBucket.key, count: functionBucket.doc_count} as ContractByFunctions['functions'][0]))
    }
  })

  return results;
}