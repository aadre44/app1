import React from "react";
import "./Wallet.css";

function Wallet({ coins, type = 1 }) {
  if (type == 1) {
    return (
      <div className="Container">
        <ul className="WalletList">
          {coins.map((coin) => {
            const amountValue =
              Math.round(((coin[1].market_data.current_price.usd * coins[0].balance)+Number.EPSILON)*100)/100;
            return (
              <li style={{ color: coin[0].color }}>
                {`${coin[1].symbol}  `}
                {`${coin[0].balance} `}
                {amountValue}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          {coins.map((coin) => {
            return (
              <li>
                <div>
                  {`${coin.symbol}  `}
                  {coin.amount}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Wallet;
