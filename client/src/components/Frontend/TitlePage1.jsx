import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/TitlePage1.css';

function TitlePage1() {
  const [stocks, setStocks] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/top3')
    .then(response => {
      setStocks(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Failed to fetch data. Please try again Later.');
      setLoading(false);
    })
  }, []);
  return (
    <>
    <div className="container">
      <div className="row">
          <div className="col-lg-6 first-future-title">
              <div className="titlepage-title1">The Future of</div>
              <div className="titlepage-title2">Smart Investing</div>
              <p className="titlepage-title-description">Discover winning stocks with Magic Formula insights, real-time rankings, and a seamless investing experience.</p>
              
          </div>
          <div className="col-lg-6">
            <div className="container py-4 dark-background">
              <div className="row align-items-center mb-4">
                <div className="col">
                  <h4 className="text-white mb-0">Top Stocks</h4>
                </div>
              </div>

              <div className="row">
                {!Loading && !error && stocks.map((stock, index) => (
                  <div className="col-12 mb-3" key={index}>
                  <div className="card dark-card rounded-4 p-3 d-flex justify-content-between">
                    <div className="row">
                      <div className="col-lg-6 d-flex">
                        <div className="crypto-icon me-3 bg-primary text-white d-flex flex-shrink-0 justify-content-center rounded-circle">{stock.symbol ? stock.symbol[0] : "?"}</div>
                        <div>
                          <h6 className="text-white mb-0">{stock.symbol}</h6>
                          <small className="text-secondary">{stock.name}</small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="text-end">
                          <h6 className="text-white mb-0">${stock.price}</h6>
                          <small className={stock.change >=0 ? "text-success" : "text-danger"}>{stock.change}%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}

              </div>
            </div>
          </div>
      </div>
    </div>
    
    </>
  )
}

export default TitlePage1