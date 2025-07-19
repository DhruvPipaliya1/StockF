from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

CORS(app)


def get_db_connection():
    conn = sqlite3.connect("data.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return "<h2>Magic Formula API Running 🚀<br>Visit <a href='/top50'>/top50</a> to see top 50 stocks.</h2>"

@app.route("/top50")
def top_50():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM magic_formula ORDER BY score ASC LIMIT 50").fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route("/all")
def all_stocks():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM magic_formula ORDER BY score ASC").fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route("/search/<symbol>")
def search(symbol):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM magic_formula WHERE symbol = ?", (symbol.upper(),)).fetchone()
    conn.close()
    if row:
        return jsonify(dict(row))
    return jsonify({"error": "Symbol not found"}), 404

@app.route("/filter")
def filter_stocks():
    min_ey = float(request.args.get("ey", 0))
    min_roc = float(request.args.get("roc", 0))

    conn = get_db_connection()
    query = "SELECT * FROM magic_formula WHERE earnings_yield >= ? AND roc >= ? ORDER BY score ASC LIMIT 100"
    rows = conn.execute(query, (min_ey, min_roc)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

if __name__ == "__main__":
    app.run(debug=True)
