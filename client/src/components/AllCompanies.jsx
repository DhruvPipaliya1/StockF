import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function AllCompanies() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/all")
      .then(response => {
        setStocks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: '#ffc069', padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };


  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'serial',
      key: 'serial',
      render: (text, record, index) => index + 1,
      width: 70,
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      ...getColumnSearchProps('symbol'),
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      width: 120,
      align: 'center',
    },
    {
      title: 'EBIT',
      dataIndex: 'ebit',
      key: 'ebit',
      render: (value) => value?.toLocaleString(),
      sorter: (a, b) => a.ebit - b.ebit,
      align: 'right',
    },
    {
      title: 'Market Caped',
      dataIndex: 'market_cap',
      key: 'market_cap',
      render: (value) => value?.toLocaleString(),
      sorter: (a, b) => a.market_cap - b.market_cap,
      align: 'right',
    },
    {
      title: 'Capital Employed',
      dataIndex: 'capital_employed',
      key: 'capital_employed',
      render: (value) => value?.toLocaleString(),
      sorter: (a, b) => a.capital_employed - b.capital_employed,
      align: 'right',
    },
    {
      title: 'EY',
      dataIndex: 'earnings_yield',
      key: 'earnings_yield',
      render: (value) => `${(value * 100).toFixed(2)}%`,
      sorter: (a, b) => a.earnings_yield - b.earnings_yield,
      align: 'right',
    },
    {
      title: 'ROC',
      dataIndex: 'roc',
      key: 'roc',
      render: (value) => `${(value * 100).toFixed(2)}%`,
      sorter: (a, b) => a.roc - b.roc,
      align: 'right',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
      align: 'right',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={stocks}
      loading={loading}
      rowKey={record => record.symbol}
      pagination={{ pageSize: 20 }}
      bordered
      scroll={{ x: 1200 }}
      size="middle"
      sticky
    />
  );
}

export default AllCompanies;
