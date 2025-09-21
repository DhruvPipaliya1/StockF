import React from 'react'
import './css/TitlePage2.css';

const features = [
  {
    icon: <i class="fa-solid fa-shield-halved" style={{ color: "#00ffff" }}></i> ,
    title: "Bank-Grade Security",
    desc: "Multi-signature wallets, cold storage, and advanced encryption protect your assets 24/7."
  },
  {
    icon: <i class="fa-solid fa-bolt" style={{ color: "#b366ff" }}></i>,
    title: "Lightning Fast Trades",
    desc: "Execute trades in milliseconds with our advanced matching engine and zero slippage."
  },
  {
    icon: <i class="fa-solid fa-brain" style={{ color: "#ff9e66" }}></i>,
    title: "AI-Powered Insights",
    desc: "Machine learning algorithms analyze market patterns to give you the edge you need."
  },
  {
    icon: <i class="fa-solid fa-dollar-sign" style={{ color: "#00ff00" }}></i>,
    title: "Zero Trading Fees",
    desc: "Trade without limits. No hidden fees, no surprises. Just pure profit potential."
  },
  {
    icon: <i class="fa-solid fa-lock" style={{ color: "#ff66cc" }}></i>,
    title: "DeFi Integration",
    desc: "Access liquidity pools, yield farming, and staking directly from your portfolio."
  },
  {
    icon: <i class="fa-solid fa-chart-simple" style={{ color: "rgba(255, 252, 102, 1)" }}></i>,
    title: "Advanced Analytics",
    desc: "Professional-grade charts, indicators, and portfolio tracking tools."
  },
];

function TitlePage2() {
  return (
    <section className="py-5 text-white mt-5 mb-5">
      <div className="container text-center">
        <h2 className="TP2-title display-5 mb-3 text-primary">Powerful Features</h2>
        <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: "600px" }}>
          Built for traders who demand the best. Experience the future of cryptocurrency trading.
        </p>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div className="card bg-transparent border-0 h-100 text-start">
                <div className="card-body">
                  <div className="card-icon mb-3">{feature.icon}</div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-secondary">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TitlePage2