import { useContractWrite, useWaitForTransaction } from "wagmi";
import ContractWriteResultCard from "../../../components/ContractWriteResultCard/ContractWriteResultCard_View";
import Modal from "../../../components/Modal";
import RequireWalletButton from "../../../components/RequireWalletButton/RequireWalletButton_View";
import marketContractJson from "../../../abi/Market.json";
import { BetHistory } from "../../../types";
import { ethers } from "ethers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  betData?: BetHistory;
};
const BetModal = ({ isOpen, onClose, betData }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SettleBet data={betData} />
    </Modal>
  );
};

export default BetModal;

type useSettleContractWriteArgs = {
  marketAddress?: string;
  index?: number;
  signature?: string;
};
const useSettleContractWrite = ({
  marketAddress,
  index = 0,
  signature = ""
}: useSettleContractWriteArgs) => {
  const { data, error, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: marketAddress || "",
    contractInterface: marketContractJson.abi,
    functionName: "settle",
    args: [index, signature],
    enabled: !!marketAddress && !!index && !!signature
  });

  const txHash = data?.hash;
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransaction({
      hash: txHash
    });
  return {
    write,
    error,
    isTxLoading,
    isTxSuccess,
    txHash
  };
};
const useSettleBet = (bet?: BetHistory) => {
  const {
    write: settleContractWrite,
    error: settleError,
    isTxLoading,
    isTxSuccess,
    txHash
  } = useSettleContractWrite({
    marketAddress: bet?.market,
    index: bet?.index,
    signature: bet?.signature
  });
  const contract = {
    settleContractWrite,
    errorMsg: settleError?.message
  };
  const txStatus = {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    hash: txHash
  };
  const shouldSettleButtonDisabled = !contract.settleContractWrite;

  return {
    contract,
    txStatus,
    shouldSettleButtonDisabled
  };
};

type SettlebetProps = {
  data?: BetHistory;
};
const SettleBet = ({ data }: SettlebetProps) => {
  const { contract, txStatus, shouldSettleButtonDisabled } = useSettleBet(data);
  return (
    <div className="w-96 md:w-152">
      <div className="px-10 pt-5 pb-5 rounded-md bg-white border-gray-200 sm:rounded-lg">
        <div className="text-3xl">Settle Bet</div>
        <form>
          <div className="flex flex-col">
            <label>
              <span>index</span>
              <input
                type="text"
                value={data?.index}
                readOnly
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <label>
              <span>signature</span>
              <input
                type="text"
                value={data?.signature}
                readOnly
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <br></br>
          <div className="flex flex-col">
            <RequireWalletButton
              actionButton={
                <button
                  className={
                    "px-5 py-1 hover:bg-gray-100 rounded-md border border-gray-500 shadow-md" +
                    (shouldSettleButtonDisabled
                      ? " opacity-50 cursor-not-allowed"
                      : "")
                  }
                  onClick={() => contract.settleContractWrite()}
                  disabled={shouldSettleButtonDisabled}
                >
                  {txStatus.isLoading ? "..." : "Settle"}
                </button>
              }
            />
          </div>
        </form>
      </div>
      <div className="mt-5">
        <ContractWriteResultCard
          hash={txStatus.hash}
          isSuccess={txStatus.isSuccess}
          errorMsg={contract.errorMsg}
        />
      </div>
    </div>
  );
};