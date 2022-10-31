import Modal from "../../components/Modal";
import { FaRegShareSquare } from "react-icons/fa";
import { truncateAddress } from "../../utils/shortenHash";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  txHash?: string | undefined;
};

<a href="https://goerli.etherscan.io/tx/0x96a28552c9e219a2e204c27de62d33af2ec36f5b97f804e294b44ee7cde21468">
  {" "}
</a>;

export const FaucetModal = ({ isOpen, onClose, txHash }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-200">
        <h2>
          Tokens have been transferred.
          <br />
          It may take a few minutes to show up in your wallet.
        </h2>
        <br />
        <div className="flex flex-row">
          Tx ID: {truncateAddress(txHash)}
          <a
            href={`https://goerli.etherscan.io/tx/${txHash}`}
            target="_blank"
            className="pl-3 py-1"
          >
            <FaRegShareSquare />
          </a>
        </div>
      </div>
    </Modal>
  );
};