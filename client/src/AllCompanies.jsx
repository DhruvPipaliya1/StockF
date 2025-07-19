import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllCompanies() {

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, [])

    return (
        <>
        <div className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>S.No.</th>
                    <th>Symbol</th>
                    <th>EBIT</th>
                    <th>Market Caped</th>
                    <th>Capital Employed</th>
                    <th>EY</th>
                    <th>ROC</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock,index) => (
                    <tr key={stock.symbol}>
                        <td>{index + 1}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.ebit.toLocaleString()}</td>
                        <td>{stock.market_cap.toLocaleString()}</td>
                        <td>{stock.capital_employed.toLocaleString()}</td>
                        <td>{(stock.earnings_yield * 100).toFixed(2)}%</td>
                        <td>{(stock.roc * 100).toFixed(2)}%</td>
                        <td>{stock.score}</td>
                    </tr>
                ))}
            </tbody>
        </div>
        </>
    )
}

export default AllCompanies