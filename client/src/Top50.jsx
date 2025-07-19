// This file is a duplicate and will be removed.
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Typography, Input } from 'antd';

const { Title } = Typography;

const Top50 = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/top50")
      .then(response => {
        setStocks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  // Filtered data based on search input
  const filteredData = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'SNo.',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: 'EBIT',
      dataIndex: 'ebit',
      key: 'ebit',
      sorter: (a, b) => a.ebit - b.ebit,
      render: value => value.toLocaleString(),
    },
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
      sorter: (a, b) => a.market_cap - b.market_cap,
      render: value => value.toLocaleString(),
    },
    {
      title: 'Capital Employed',
      dataIndex: 'capital_employed',
      key: 'capital_employed',
      sorter: (a, b) => a.capital_employed - b.capital_employed,
      render: value => value.toLocaleString(),
    },
    {
      title: 'Earnings Yield (EY)',
      dataIndex: 'earnings_yield',
      key: 'earnings_yield',
      sorter: (a, b) => a.earnings_yield - b.earnings_yield,
      render: value => `${(value * 100).toFixed(2)}%`,
    },
    {
      title: 'Return on Capital (ROC)',
      dataIndex: 'roc',
      key: 'roc',
      sorter: (a, b) => a.roc - b.roc,
      render: value => `${(value * 100).toFixed(2)}%`,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Top 50 Magic Formula Stocks</Title>

      <Input.Search
        placeholder="Search by Symbol"
        onChange={e => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />

      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="symbol"
          pagination={{ pageSize: 10 }}
          bordered
        />
      )}
    </div>
  );
};

export default Top50;
