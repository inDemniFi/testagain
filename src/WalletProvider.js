import React from 'react';

function WalletProvider() {
  return (
    <div>
      <h1>Wallet Provider Page</h1>
      <p>This is the content of the Wallet Provider page.</p>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>inDemniFi</title>
        <link href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;400;600&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link href="style.css" rel="stylesheet" type="text/css" />
      </head>
      
      <body>
        <header>
          <nav>
            <a href="https://indemnifi.github.io/wallet/" class="header-link">Home</a>
            <a href="user.html" class="header-link">Wallet User</a>
          </nav>
        </header>
      
        <div class="container">
          <nav class="navbar navbar-expand-lg">
            <div class="container">
              <div class="navbar-brand">
                <img src="indemnifi-logo1.png" alt="inDemniFi Logo" style="width:100%;">
                <div class="heading-container">
                  <h1 class="heading-desktop">Wallet Insurance Model SDK</h1>
                  <h1 class="heading-mobile">Wallet</h1>
                  <h1 class="heading-mobile">Insurance</h1>
                  <h1 class="heading-mobile">Model SDK</h1>
                </div>
              </div>
            </div>
          </nav>
      
          <br><br>
      
          <h2>Choose a Network: </h2>
          <select class="input_field" name="chain" id="chain">
            <option value="1"> Ethereum Mainnet</option>
            <option value="42"> Ethereum Kovan</option>
          </select>
          <br><br><br><br>
      
          <h2>Enter a wallet address below, and hit Underwrite Your Wallet:</h2> <input type="text" size="60" id="address"
            value="Vitalik.eth">
          <button class="btn btn-primary" onclick="getWalletData()">Underwrite Your Wallet</button>
          <br><br><br><br>
      
          </ul>
          <h2>Since Implementation:</h2>
          <ul id="providerData">
            <li>Wallet age and date of first transaction: <span id="walletAge"></span></li>
            <li>Number of blocks since implementation:</li>
            <li>Number of transactions since implementation:</li>
            <li>Number of Days since implementation:</li>
            <li>Number of policies sold:</li>
            <li>Number of policies currently in effect:</li>
          </ul>
      
          <section>
            <h2>User Information:</h2>
            <ul id="providerData">
              <li>Number of unique wallets:<span id="uniqueAddresses"></span></li>
              <li>Average number of transactions per user:</li>
              <li>Average insurance pool contribution:</li>
              <li>More than 5 open token approvals: <span id="approvalsResult"></span></li>
              <li>Number of high risk open approvals: <span id="highRiskApprovals"></span></li>
              <li>Number of medium risk open approvals: <span id="mediumRiskApprovals"></span></li>
              <li>Number of low risk open approvals: <span id="lowRiskApprovals"></span></li>
              <li>Oldest open token approval more than 60 days old: <span id="oldestApprovalStatus"></span></li>
            </ul>
          </section>
      
          <section>
            <h2>Insurance Information:</h2>
            <ul id="providerData">
              <li>Average Insurance Pool Fee:</li>
              <li>Total Insurance Pool Value:</li>
              <li>Average policy limit per user:</li>
            </ul>
          </section>
      
          <section>
            <h2>Claims Information:</h2>
            <ul id="providerData">
              <li>Number of claims filed:</li>
              <li>Number of claims paid:</li>
              <li>Total claims paid:</li>
              <li>Claims Ratio:</li>
            </ul>
            <br>
            <h2>Token Approvals</h2>
            <table id="approvalTable" class="table table-striped">
              <thead class="thead-dark">
              </thead>
              <tbody>
              </tbody>
            </table>
            <br><br>
            <h2>Current Balances</h2>
            <table id="tokenTable" class="table table-striped"></table>
            <br><br>
            <div class="tokenBalances">
              <h2>Historical Token Balances</h2>
              <table>
                <thead>
                </thead>
                <tbody id="tokenBalancesTableBody">
                  <!-- Historical token balances will be added here dynamically using JavaScript -->
                </tbody>
              </table>
              <br><br>
            </div>
      
            <script src="script.js"></script>
      
            <!-- Bootstrap code -->
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
              integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
              crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
              integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
              crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
              integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
              crossorigin="anonymous"></script>
        </div>
      
        <footer>
          <div class="footer-links">
            <a href="https://github.com/inDemniFi" class="footer-link">GitHub</a>
            <a href="https://indemnifi.gitbook.io/wim-sdk/" class="footer-link">GitBook</a>
            <a href="https://twitter.com/inDemniFi" class="header-link">Twitter</a>
          </div>
        </footer>
      </body>

</html>
    </div>
  );
}

export default WalletProvider;
