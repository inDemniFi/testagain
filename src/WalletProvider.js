import React from 'react'
import { HashRouter, Routes, Route, Link} from "react-router-dom"
import { Input, Menu, Switch } from 'antd'
import './App.css'
import { TokenBalances, ERC20Transfers, TokenHolders, Transactions, ChainSelector} from '@covalenthq/web3-components'

function WalletProvider() {
  return (
    <div>
      <h1>Wallet Provider Page</h1>
      <p>This is the content of the Wallet Provider page.</p>
    
    </div>
  );
}

export default WalletProvider;
