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

// Demo API Key
// script.js
const APIKEY = process.env.REACT_APP_COVALENT_API_KEY;



// Covalent API Endpoints
const balancesEndpoint = 'balances_v2';
const approvalsEndpoint = 'approvals_v2';

// Function to get token data for an account
async function getTokenData() {
  // Get key HTML elements and reset table content
  const ul = document.getElementById('metadata');
  const tableRef = document.getElementById('tokenTable');
  tableRef.innerHTML = `
    <thead class="thead-dark">
      <tr>
        <th></th>
        <th>Token</th>
        <th>Symbol</th>
        <th>Balance</th>
        <th>Fiat Value</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
    </tbody>`;

  // Covalent API request setup
  const tokenAddress = document.getElementById('address').value || 'demo.eth';
  const chainIdToken = document.getElementById('chain').value || '1';
  const urlToken = new URL(`https://api.covalenthq.com/v1/${chainIdToken}/address/${tokenAddress}/${balancesEndpoint}/`);
  urlToken.searchParams.append('key', APIKEY);

  // Use Fetch API to get Covalent data
  let respToken = await fetch(urlToken);
  let dataToken = await respToken.json();
  let tokens = dataToken.data.items;

  // Update wallet metadata
  ul.innerHTML =
    `<li> Wallet address: ${dataToken.data.address} </li>` +
    `<li> Last update: ${dataToken.data.updated_at} </li>` +
    `<li> Fiat currency: ${dataToken.data.quote_currency} </li>`;

  tokens.forEach(function(token) {
    let balance;
    if (token.contract_decimals > 0) {
      balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
    } else {
      balance = parseInt(token.balance);
    }
    tableRef.insertRow().innerHTML =
      `<td><img src=${token.logo_url} style=width:50px;height:50px;></td>` +
      `<td> ${token.contract_address} </td>` +
      `<td> ${token.contract_ticker_symbol} </td>` +
      `<td> ${balance.toFixed(4)} </td>` +
      `<td> $${parseFloat(token.quote).toFixed(2)} </td>` +
      `<td> ${token.type} </td>`;
  });
}


// Function to get token approvals for an account
async function getTokenApprovals() {
  // Get key HTML elements and reset table content
  const tableRef = document.getElementById('approvalTable');
  tableRef.innerHTML = `
    <thead class="thead-dark">
      <tr>
        <th>Token Address</th>
        <th>Token Name</th>
        <!-- ... (existing columns) ... -->
      </tr>
    </thead>
    <tbody>
    </tbody>`;

  // Covalent API request setup
  const address = document.getElementById('address').value || 'demo.eth';
  const chainId = document.getElementById('chain').value || '1';
  const url = new URL(`https://api.covalenthq.com/v1/${chainId}/approvals/${address}/`);
  url.searchParams.append('key', APIKEY);

  // Use Fetch API to get Covalent data
  let resp = await fetch(url);
  let data = await resp.json();
  let approvals = data.data.items;

  // Variables to track the oldest approval date
  let oldestApprovalDate = Infinity;

  // Count the number of open approvals
  let openApprovalsCount = 0;

  // Count the number of high-risk approvals
  let highRiskApprovalsCount = 0;

  // Count the number of low-risk approvals
  let lowRiskApprovalsCount = 0;

  // Count the number of medium-risk approvals
  let mediumRiskApprovalsCount = 0;

  // Count the number of open approvals more than 10, 30, and 90 days
  let openApprovalsCountMoreThan10Days = 0;
  let openApprovalsCountMoreThan30Days = 0;
  let openApprovalsCountMoreThan90Days = 0;


  approvals.forEach(function(approval) {
    openApprovalsCount += approval.spenders.length;

    approval.spenders.forEach(function(spender) {
      if (
        spender.risk_factor === 'HIGH RISK, REVOKE NOW'
      ) {
        highRiskApprovalsCount++;

      } else if (spender.risk_factor === 'LOW RISK') {
        lowRiskApprovalsCount++;
      } else if (spender.risk_factor === 'CONSIDER REVOKING') {
        mediumRiskApprovalsCount++;
      }
    });

    // Get the date of the oldest approval
    const approvalDate = new Date(approval.block_signed_at).getTime();
    if (!oldestApprovalDate || approvalDate < oldestApprovalDate) {
      oldestApprovalDate = approvalDate;
    }
  });

  // Calculate if the oldest approval is more than 60 days old
  const today = Date.now();
  const sixtyDaysInMilliseconds = 60 * 24 * 60 * 60 * 1000;
  const isOldestApprovalOld = today - oldestApprovalDate > sixtyDaysInMilliseconds;

  // Determine Underwriting Results based on data points
  let underwritingRisk;
  if (highRiskApprovalsCount > 10) {
    underwritingRisk = 'High';
  } else if (highRiskApprovalsCount > 0) {
    underwritingRisk = 'Medium';
  } else {
    underwritingRisk = 'Low';
  }



  const policyEligibility = highRiskApprovalsCount > 1 && !isOldestApprovalOld ? 'Low' : 'High';
  const policyLimit = policyEligibility === 'Eligible' ? '$1,000' : '$10,000';

  // Determine the deductible based on the oldest approval
  let deductible;
  if (isOldestApprovalOld) {
    const policyLimitValue = parseFloat(policyLimit.replace(/[^\d.-]/g, ''));
    deductible = policyLimitValue * 0.5; // 50% deductible as a number
    if (deductible === Math.floor(deductible)) {
      deductible = `$${deductible}`;
    } else {
      deductible = `$${deductible.toFixed(2)}`;
    }
  } else {
    deductible = '$500'; // $500 deductible
  }

  // Call the function to get wallet age or date of first transaction
  const walletAddress = document.getElementById('address').value || 'demo.eth';
  const walletData = await getWalletAge(walletAddress);

  // Display the wallet age or date and days ago of first transaction
  if (walletData) {
    const walletAgeElement = document.getElementById('walletAge');
    if (walletData.hasTransactions) {
      walletAgeElement.textContent = `${walletData.firstTransactionDate} (${walletData.daysAgo} days ago)`;
    } else {
      walletAgeElement.textContent = `${walletData.walletAge} days`;
    }
  }

  // Display the result in a new HTML element
  const approvalsResult = document.getElementById('approvalsResult');
  approvalsResult.textContent = openApprovalsCount > 5 ? 'Yes' : 'No';

  const highRiskApprovals = document.getElementById('highRiskApprovals');
  highRiskApprovals.textContent = highRiskApprovalsCount.toString();

  const mediumRiskApprovals = document.getElementById('mediumRiskApprovals');
  mediumRiskApprovals.textContent = mediumRiskApprovalsCount.toString();

  const lowRiskApprovals = document.getElementById('lowRiskApprovals');
  lowRiskApprovals.textContent = lowRiskApprovalsCount.toString();

  const oldestApprovalStatus = document.getElementById('oldestApprovalStatus');
  oldestApprovalStatus.textContent = isOldestApprovalOld ? 'Yes' : 'No';


  // Display Underwriting Results
  const policyEligibilityElement = document.getElementById('policyEligibility');
  policyEligibilityElement.textContent = policyEligibility;

  const underwritingRiskElement = document.getElementById('underwritingRisk');
  underwritingRiskElement.textContent = underwritingRisk;

  const policyLimitElement = document.getElementById('policyLimit');
  policyLimitElement.textContent = policyLimit;

  const deductibleElement = document.getElementById('deductible');
  deductibleElement.textContent = deductible;


  // Return all the data points
  return {
    openApprovalsCount,
    highRiskApprovalsCount,
    lowRiskApprovalsCount,
    mediumRiskApprovalsCount,
    isOldestApprovalOld,
    policyEligibility,
    underwritingRisk,
    policyLimit,
    deductible,
  };
}

async function getWalletData() {
  // Use Promise.all to fetch both token data and approvals simultaneously
  const tokenDataPromise = getTokenData();
  const approvalsPromise = getTokenApprovals();

  // Wait for both promises to resolve before proceeding
  const [tokenData, approvalsData] = await Promise.all([tokenDataPromise, approvalsPromise]);

  // Update the HTML elements with the fetched data
  const ul = document.getElementById('metadata');
  ul.innerHTML =
    `<li> Wallet address: ${tokenData.data.address} </li>` +
    `<li> Last update: ${tokenData.data.updated_at} </li>` +
    `<li> Fiat currency: ${tokenData.data.quote_currency} </li>`;

  const approvalsResult = document.getElementById('approvalsResult');
  approvalsResult.textContent = approvalsData.openApprovalsCount > 5 ? 'Yes' : 'No';

  const highRiskApprovals = document.getElementById('highRiskApprovals');
  highRiskApprovals.textContent = approvalsData.highRiskApprovalsCount.toString();

  const oldestApprovalStatus = document.getElementById('oldestApprovalStatus');
  oldestApprovalStatus.textContent = approvalsData.isOldestApprovalOld ? 'Yes' : 'No';


  // Calculate Underwriting Results based on the data
  const underwritingData = calculateUnderwritingDataPoints(approvalsData);

  // Wait for the Underwriting Results to be calculated before updating the HTML elements
  await underwritingData;

    // Call the function to get the count of unique addresses
  const routerAddress = '0x...'; // Replace with the desired router address
  const uniqueAddresses = await getUniqueAddresses(routerAddress);

  // Display the count of unique addresses
  const uniqueAddressesElement = document.getElementById('uniqueAddresses');
  uniqueAddressesElement.textContent = uniqueAddresses.length.toString();
  
  // Display the Underwriting Results
  const policyEligibilityElement = document.getElementById('policyEligibility');
  policyEligibilityElement.textContent = underwritingData.policyEligibility;

  const underwritingRiskElement = document.getElementById('underwritingRisk');
  underwritingRiskElement.textContent = underwritingData.underwritingRisk;

  const policyLimitElement = document.getElementById('policyLimit');
  policyLimitElement.textContent = underwritingData.policyLimit;


  // Call the function to get wallet age or date of first transaction
  const walletAddress = document.getElementById('address').value || 'demo.eth';
  const walletData = await getWalletAge(walletAddress);

  // Display the wallet age or date and days ago of first transaction
  if (walletData) {
    const walletAgeElement = document.getElementById('walletAge');
    if (walletData.hasTransactions) {
      walletAgeElement.textContent = `${walletData.firstTransactionDate} (${walletData.daysAgo} days ago)`;
    } else {
      walletAgeElement.textContent = `${walletData.walletAge} days`;
    }
  }
}



function calculateUnderwritingDataPoints(approvalsData) {
  // Perform necessary calculations to determine the Underwriting Results based on approvalsData
  

  // Sample implementation for demonstration purposes
  let policyEligibility = 'Not Eligible';
  let underwritingRisk = 'Low';
  let policyLimit = 'N/A';

  if (approvalsData.openApprovalsCount > 5 && !approvalsData.isOldestApprovalOld) {
    policyEligibility = 'Eligible'; // Corrected the condition here

    if (approvalsData.highRiskApprovalsCount > 10) {
      underwritingRisk = 'High';
    } else if (approvalsData.highRiskApprovalsCount > 0) {
      underwritingRisk = 'Medium';
    }
    policyLimit = '$100,000';
  }

  return {
    policyEligibility,
    underwritingRisk,
    policyLimit,
  };
}

// Function to get the wallet age or date of the first transaction
async function getWalletAge(walletAddress) {
  const chainName = 'eth-mainnet'; // Replace with your desired chain name


  try {
    const resp = await fetch(url, { method: 'GET', headers });
    const data = await resp.json();
    const transactions = data.data.items;

    if (transactions.length > 0) {
      // If transactions are found, get the date of the first transaction
      const firstTransactionDate = new Date(transactions[0].block_signed_at);
      const currentDate = new Date();
      const timeDifference = currentDate - firstTransactionDate;
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return {
        hasTransactions: true,
        firstTransactionDate: firstTransactionDate.toDateString(),
        daysAgo: daysAgo
      };
    } else {
      // If no transactions are found, calculate wallet age from the creation date
      const walletAge = calculateWalletAgeFromCreation(data.data.updated_at);
      return {
        hasTransactions: false,
        walletAge: walletAge
      };
    }
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    return null;
  }
}

// Function to calculate the wallet age from the creation date
function calculateWalletAgeFromCreation(creationDateStr) {
  const creationDate = new Date(creationDateStr);
  const currentDate = new Date();
  const timeDifference = currentDate - creationDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
}

async function getHistoricalTokenBalances(walletAddress) {
  const chainName = 'eth-mainnet'; // Replace with your desired chain name



  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiKey}`);

  try {
    const resp = await fetch(url, { method: 'GET', headers });
    const data = await resp.json();

    if (data && data.data && data.data.items) {
      return data.data.items.map(item => {
        return {
          timestamp: item.timestamp,
          tokenName: item.contract_ticker_symbol,
          balance: item.balance
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching historical token balances:', error);
    return [];
  }
}



async function getUniqueAddresses(routerAddress) {
  const chainName = 'eth-mainnet'; // Replace with the desired chain name


  try {
    const resp = await fetch(url, { method: 'GET', headers });
    const data = await resp.json();

    if (data && data.data && data.data.items) {
      const uniqueAddresses = new Set();
      data.data.items.forEach(item => {
        uniqueAddresses.add(item.from_address);
      });
      return Array.from(uniqueAddresses);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching unique addresses:', error);
    return [];
  }
}
