import { type Policy } from "@zerodev/permissions";
import { useKernelClient, type KernelVersionType } from "@zerodev/waas";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ConnectModal from "../Modal/ConnectModal";
import PaymasterModal from "../Modal/PaymasterModal";
import SessionModal from "../Modal/SessionModal";

export function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false);

  return {
    closeModal: useCallback(() => {
      setModalOpen(false);
    }, []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), []),
  };
}

interface ModalContextValue {
  connectModalOpen: boolean;
  openConnectModal?: ({ version }: { version: KernelVersionType }) => void;
  sessionModalOpen: boolean;
  openSessionModal?: ({ policies }: { policies: Policy[] | undefined }) => void;
  paymasterModalOpen: boolean;
  openPaymasterModal?: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
  connectModalOpen: false,
  sessionModalOpen: false,
  paymasterModalOpen: false,
});

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { kernelAccount } = useKernelClient();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [kernelVersion, setKernelVersion] = useState<KernelVersionType>("v3");

  const {
    closeModal: closeConnectModal,
    isModalOpen: connectModalOpen,
    openModal: openConnectModal,
  } = useModalStateValue();
  const {
    closeModal: closeSessionModal,
    isModalOpen: sessionModalOpen,
    openModal: openSessionModal,
  } = useModalStateValue();
  const {
    closeModal: closePaymasterModal,
    isModalOpen: paymasterModalOpen,
    openModal: openPaymasterModal,
  } = useModalStateValue();

  useEffect(() => {
    if (kernelAccount) {
      closeConnectModal();
    }
  }, [kernelAccount, closeConnectModal]);

  const openSessionModalWithPolicy = useCallback(
    ({ policies }: { policies: Policy[] | undefined }) => {
      setPolicies(policies || []);
      openSessionModal();
    },
    [openSessionModal]
  );

  const openConnectModalWithVersion = useCallback(
    ({ version }: { version: KernelVersionType }) => {
      setKernelVersion(version);
      openConnectModal();
    },
    [openConnectModal]
  );

  const openPaymasterModalAction = useCallback(() => {
    openPaymasterModal();
  }, [openPaymasterModal]);

  return (
    <ModalContext.Provider
      value={useMemo(
        () => ({
          connectModalOpen,
          openConnectModal: openConnectModalWithVersion,
          sessionModalOpen,
          openSessionModal: openSessionModalWithPolicy,
          paymasterModalOpen,
          openPaymasterModal: openPaymasterModalAction,
        }),
        [
          connectModalOpen,
          openConnectModalWithVersion,
          sessionModalOpen,
          openSessionModalWithPolicy,
          paymasterModalOpen,
          openPaymasterModalAction,
        ]
      )}
    >
      {children}
      <ConnectModal
        onClose={closeConnectModal}
        open={connectModalOpen}
        version={kernelVersion}
      />
      <SessionModal
        onClose={closeSessionModal}
        open={sessionModalOpen}
        policies={policies}
      />
      <PaymasterModal onClose={closePaymasterModal} open={paymasterModalOpen} />
    </ModalContext.Provider>
  );
}
