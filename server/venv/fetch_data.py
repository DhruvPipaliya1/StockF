import yfinance as yf
import pandas as pd
import sqlite3
from concurrent.futures import ThreadPoolExecutor, as_completed

# Connect to SQLite (creates file if it doesn't exist)
conn = sqlite3.connect("data.db")
cur = conn.cursor()

# Create table
cur.execute("""
CREATE TABLE IF NOT EXISTS magic_formula (
    symbol TEXT PRIMARY KEY,
    ebit INTEGER,
    market_cap INTEGER,
    capital_employed INTEGER,
    earnings_yield REAL,
    roc REAL,
    ey_rank INTEGER,
    roc_rank INTEGER,
    score INTEGER
)
""")
conn.commit()

# Load and clean CSV
df = pd.read_csv(r"C:\Users\HP\Desktop\Magic Formula\nifty500.csv")
df.columns = df.columns.str.strip()
df['SYMBOL'] = df['SYMBOL'].str.strip()
tickers = [symbol + ".NS" for symbol in df['SYMBOL']]

print(f"📈 Fetching financials for {len(tickers)} companies in parallel...\n")

results = []

# Function to fetch data for one symbol
def fetch(symbol):
    try:
        stock = yf.Ticker(symbol)
        financials = stock.financials
        balance_sheet = stock.balance_sheet
        info = stock.info

        if financials.empty or balance_sheet.empty or not info:
            return None

        ebit = financials.loc['EBIT'].iloc[0] if 'EBIT' in financials.index else None
        market_cap = info.get('marketCap')
        total_assets = balance_sheet.loc['Total Assets'].iloc[0] if 'Total Assets' in balance_sheet.index else None
        current_liabilities = balance_sheet.loc['Current Liabilities'].iloc[0] if 'Current Liabilities' in balance_sheet.index else None
        cash = balance_sheet.loc['Cash'].iloc[0] if 'Cash' in balance_sheet.index else 0

        if None in (ebit, market_cap, total_assets, current_liabilities):
            return None

        capital_employed = total_assets - current_liabilities - cash
        if capital_employed <= 0:
            return None

        earnings_yield = ebit / market_cap
        roc = ebit / capital_employed

        print(f"{symbol}: ✅ EY={earnings_yield:.4f}, ROC={roc:.4f}")

        return {
            'symbol': symbol,
            'ebit': int(ebit),
            'market_cap': int(market_cap),
            'capital_employed': int(capital_employed),
            'earnings_yield': earnings_yield,
            'roc': roc
        }

    except Exception as e:
        print(f"{symbol}: ⚠️ Error → {e}")
        return None

# Use ThreadPoolExecutor to fetch data in parallel
with ThreadPoolExecutor(max_workers=20) as executor:
    future_to_symbol = {executor.submit(fetch, symbol): symbol for symbol in tickers}
    for future in as_completed(future_to_symbol):
        data = future.result()
        if data:
            results.append(data)

# Convert to DataFrame
df_result = pd.DataFrame(results)
df_result.dropna(subset=['earnings_yield', 'roc'], inplace=True)

# Rank and score
df_result['ey_rank'] = df_result['earnings_yield'].rank(ascending=False, method='min')
df_result['roc_rank'] = df_result['roc'].rank(ascending=False, method='min')
df_result['score'] = df_result['ey_rank'] + df_result['roc_rank']
df_result.sort_values(by='score', inplace=True)

# Save to SQLite
cur.execute("DELETE FROM magic_formula")
conn.commit()

df_result.to_sql('magic_formula', conn, if_exists='append', index=False)

print(f"\n✅ Done! {len(df_result)} valid companies saved to SQLite: data.db")
conn.close()
