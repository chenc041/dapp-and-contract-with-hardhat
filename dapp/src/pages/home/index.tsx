import React from 'react';
import styles from '~/pages/home/index.scss';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

export const Home = () => {
  const { activate, library, account } = useWeb3React<Web3Provider>();
  const injected = new InjectedConnector({});
  const nftContractAddress = '0xbAcF1a6e9e9fc0a5753A8091A90d17cbd1DE2070';
  const ethereumChainId = 1;

  const connect = async () => {
    await activate(injected);
  };

  const mint = async () => {
    if (!library || !account) {
      await connect();
    }
    if (!library || !account) return;
    const { chainId } = await library.getNetwork();
    const { ethereum } = window;
    if (chainId != ethereumChainId) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(ethereumChainId) }],
      });
    }
    const nftContract = new ethers.Contract(nftContractAddress, {} as any, library.getSigner());
    console.log(nftContract);
    const transaction = await nftContract.mint();
    console.log(transaction);
  };

  return (
    <div className={styles.home} onClick={mint}>
      home
    </div>
  );
};
