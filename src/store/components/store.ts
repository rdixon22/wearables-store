import { getUserAccount } from "@decentraland/EthereumController";
import { getProvider, Provider } from "@decentraland/web3-provider";
import * as dclTx from "decentraland-transactions";
import * as eth from "eth-connect";
import { Providers } from "../index";

export function createStoreComponent({
  provider,
  requestManager,
  metaProvider,
  metaRequestManager,
  fromAddress,
}: Providers) {
  async function getContract() {
    const storeConfig = dclTx.getContract(dclTx.ContractName.CollectionStore, 80001);
    let contract: any = await new eth.ContractFactory(metaRequestManager, storeConfig.abi).at(storeConfig.address);

    return {
      storeConfig,
      contract,
    };
  }

  async function buy(collectionId: string, blockchainId: string, price: string) {
    const { contract, storeConfig } = await getContract();
    const functionSignature = contract.buy.toPayload([[collectionId, [blockchainId], [price], [fromAddress]]]);
    log(functionSignature);

    dclTx
      .sendMetaTransaction(requestManager as any, metaRequestManager as any, functionSignature.data, storeConfig)
      .then((tx) => {
        log(tx);
      })
      .catch((e) => {
        log(e);
      });
  }
  return { buy };
}
