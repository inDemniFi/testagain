import React, { useState } from "react"
import { HashRouter, Routes, Route, Link} from "react-router-dom"
import { Input, Menu, Switch } from 'antd'
import './App.css'
import { TokenBalances, ERC20Transfers, TokenHolders, Transactions, ChainSelector} from '@covalenthq/web3-components'

const { Search } = Input

const FormControl = ({placeholder, onSearch}) => {
  return (
    <Search placeholder={placeholder} onSearch={onSearch}
      style={{
        width: 500,
      }}
    />
  )
}

const items = [
  {
    label: (
      <Link to="/">Token Balances</Link>
    ),
    key: 'tokenBalances',
  },
  {
    label: (
      <Link to="/erc20Transfers">ERC20 Transfers</Link>
    ),
    key: 'erc20Transfers'
  },
  {
    label: (
      <Link to="/tokenHolders">Token Holders</Link>
    ),
    key: 'tokenHolders'
  },
  {
    label: (
      <Link to="/transactions">Transactions</Link>
    ),
    key: 'transactions'
  }
]

const SearchTokenBalances = () => {
  const [address, setAddress] = useState(null)
  const [chainName, setChainName] = useState('eth-mainnet')

  const onSearch = (value) => setAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <div>
        <ChainSelector setChainName={setChainName} />
        <FormControl placeholder="Enter a wallet address or ENS domain (only if Ethereum selected)" onSearch={onSearch} />
      </div>
      <div>
        <br></br>
        <p><b>Provided Address:</b> {address}</p>
        <p><b>Chain:</b> {chainName}</p>
        <TokenBalances address={address} chainId={chainName} />
      </div>
    </div>
  )
}

const SearchTokenHolders = () => {
  const [tokenAddress, setTokenAddress] = useState(null)
  const [chainName, setChainName] = useState('eth-mainnet')

  const onSearch = (value) => setTokenAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <div>
        <ChainSelector setChainName={setChainName} />
        <FormControl placeholder="Enter a token (ERC20 or NFT) contract address" onSearch={onSearch} />
      </div>
      <div>
        <br></br>
        <p><b>Provided Address:</b> {tokenAddress}</p>
        <p><b>Chain:</b> {chainName}</p>
        <TokenHolders tokenAddress={tokenAddress} chainId={chainName} />
      </div>
    </div>
  )
}

const SearchERC20Transfers = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [chainName, setChainName] = useState('eth-mainnet')

  const onSearch = (value) => setWalletAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <div>
        <ChainSelector setChainName={setChainName} />
        <FormControl placeholder="Enter a wallet address or ENS domain (only if Ethereum selected)" onSearch={onSearch} />
      </div>
      <div>
        <br></br>
        <p><b>Provided Address:</b> {walletAddress}</p>
        <p><b>Chain:</b> {chainName}</p>
        <ERC20Transfers address={walletAddress} chainId={chainName} />
      </div>
    </div>
  )
}

const SearchTransactions = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [chainName, setChainName] = useState('eth-mainnet')

  const onSearch = (value) => setWalletAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <div>
        <ChainSelector setChainName={setChainName} />
        <FormControl placeholder="Enter a wallet address or ENS domain (only if Ethereum selected)" onSearch={onSearch} />
      </div>
      <div>
        <br></br>
        <p><b>Provided Address:</b> {walletAddress}</p>
        <p><b>Chain:</b> {chainName}</p>
        <Transactions address={walletAddress} chainId={chainName} />
      </div>
    </div>
  )
}

function App() {
  const [current, setCurrent] = useState('tokenBalances')

  const onClick = (e) => {
    setCurrent(e.key)
  }
  
  return (
    <HashRouter>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Routes>
          <Route path="/" element={<SearchTokenBalances />} />
          <Route path="/erc20Transfers" element={<SearchERC20Transfers />} />
          <Route path="/tokenHolders" element={<SearchTokenHolders />} />
          <Route path="/transactions" element={<SearchTransactions />} />
        </Routes>
    </HashRouter>
  )
}

export default App
