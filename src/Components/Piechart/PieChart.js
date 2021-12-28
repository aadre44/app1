import React, { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

function PieChart({ coins, coinList }) {
  coins = [
    { symbol: "ADA", amount: 200, color: "#0033ad", inUSD: 1.48 },
    { symbol: "SOL", amount: 5, color: "#00ffbd", inUSD: 37.6 },
    { symbol: "BTC", amount: 0.005, color: "#F7931A", inUSD: 37363 },
    { symbol: "Strong", amount: 56.005, color: "purple", inUSD: 63 },
  ];

    coinList.map((coin) => {
      coins.push({
        symbol: coin[1].symbol,
        amount: coin[0].balance,
        color: coin[0].color,
        inUSD: coin[1].market_data.current_price.usd * coins[0][1],
      });
    });
 

  const [active, setActive] = useState(null);
  const width = 200;
  const half = width / 2;
  return (
    <div>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={coins}
            pieValue={(data) => data.amount * data.inUSD}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.symbol == data.symbol ? 12 : 8;
              return half - size;
            }}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          {active ? (
            <>
              <Text textAnchor="middle" fill="black" fontSize={20} dy={-10}>
                ${active.amount * active.inUSD}
              </Text>
              <Text textAnchor="middle" fill="black" dy={10} fontSize={10}>
                {`${active.amount} ${active.symbol}`}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor="middle" fill="black" fontSize={20} dy={-10}>
                $
                {coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)}
              </Text>
              <Text textAnchor="middle" fill="black" dy={10} fontSize={10}>
                {`${coins.length} Assets `}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </div>
  );
}

export default PieChart;
