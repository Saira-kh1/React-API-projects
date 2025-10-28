import { useEffect, useState } from "react";

export default function GoldRates() {
  const [goldRates, setGoldRates] = useState({});
  const [silverRates, setSilverRates] = useState(null);
  const [time, setTime] = useState(new Date());
  const [zakatGold, setZakatGold] = useState("");
  const [zakatSilver, setZakatSilver] = useState("");
  const [zakatResult, setZakatResult] = useState(null);

  // Fetch gold & silver rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=874834cbe0e2f802cba6d5c7db77c324&base=USD&currencies=XAU,XAG,PKR`
        );
        const data = await res.json();

        if (data.success) {
          const usdToPkr = data.rates.PKR;
          const goldPerOunceUSD = 1 / data.rates.XAU;
          const silverPerOunceUSD = 1 / data.rates.XAG;

          const goldPerGramUSD = goldPerOunceUSD / 31.1035;
          const silverPerGramUSD = silverPerOunceUSD / 31.1035;

          const goldPerTolaUSD = goldPerGramUSD * 11.6638;
          const silverPerTolaUSD = silverPerGramUSD * 11.6638;

          const goldPerGramPKR = goldPerGramUSD * usdToPkr;
          const silverPerGramPKR = silverPerGramUSD * usdToPkr;

          const goldPerTolaPKR = goldPerTolaUSD * usdToPkr;
          const silverPerTolaPKR = silverPerTolaUSD * usdToPkr;

          const rates = {
            "24K": {
              gram: { usd: goldPerGramUSD, pkr: goldPerGramPKR },
              tola: { usd: goldPerTolaUSD, pkr: goldPerTolaPKR },
            },
            "22K": {
              gram: { usd: goldPerGramUSD * 0.916, pkr: goldPerGramPKR * 0.916 },
              tola: { usd: goldPerTolaUSD * 0.916, pkr: goldPerTolaPKR * 0.916 },
            },
            "21K": {
              gram: { usd: goldPerGramUSD * 0.875, pkr: goldPerGramPKR * 0.875 },
              tola: { usd: goldPerTolaUSD * 0.875, pkr: goldPerTolaPKR * 0.875 },
            },
            "18K": {
              gram: { usd: goldPerGramUSD * 0.75, pkr: goldPerGramPKR * 0.75 },
              tola: { usd: goldPerTolaUSD * 0.75, pkr: goldPerTolaPKR * 0.75 },
            },
          };

          setGoldRates(rates);
          setSilverRates({
            gram: { usd: silverPerGramUSD, pkr: silverPerGramPKR },
            tola: { usd: silverPerTolaUSD, pkr: silverPerTolaPKR },
          });
        }
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    };

    fetchRates();
  }, []);

  // Digital clock updater
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Zakat calculator
  const handleZakat = () => {
    const goldAmount = parseFloat(zakatGold) || 0;
    const silverAmount = parseFloat(zakatSilver) || 0;
    const goldZakat = goldRates["24K"] ? goldAmount * goldRates["24K"].gram.pkr * 0.025 : 0;
    const silverZakat = silverRates ? silverAmount * silverRates.gram.pkr * 0.025 : 0;
    setZakatResult(goldZakat + silverZakat);
  };

  return (
    <div className="py-6 px-4 md:px-16">
      {/* Digital Clock */}
      <div className="text-center mb-8">
        <span className="text-lg md:text-2xl font-semibold bg-white px-6 py-3 rounded-xl shadow-md">
          {time.toLocaleDateString()} | {time.toLocaleTimeString()}
        </span>
      </div>

      {/* Cards Layout */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Gold Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] border-t-4 border-yellow-500 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-4 text-yellow-800 text-center">🏆 Gold Rates</h3>
          {Object.keys(goldRates).length > 0 ? (
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Karat</th>
                  <th>Gram (USD)</th>
                  <th>Gram (PKR)</th>
                  <th>Tola (USD)</th>
                  <th>Tola (PKR)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(goldRates).map(([karat, values]) => (
                  <tr key={karat} className="border-b">
                    <td className="p-2 font-semibold">{karat}</td>
                    <td>${values.gram.usd.toFixed(2)}</td>
                    <td>{values.gram.pkr.toFixed(0)} PKR</td>
                    <td>${values.tola.usd.toFixed(2)}</td>
                    <td>{values.tola.pkr.toFixed(0)} PKR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>

        {/* Silver Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] border-t-4 border-gray-400 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">🥈 Silver Rates</h3>
          {silverRates ? (
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Unit</th>
                  <th>USD</th>
                  <th>PKR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold p-2">Gram</td>
                  <td>${silverRates.gram.usd.toFixed(2)}</td>
                  <td>{silverRates.gram.pkr.toFixed(0)} PKR</td>
                </tr>
                <tr>
                  <td className="font-semibold p-2">Tola</td>
                  <td>${silverRates.tola.usd.toFixed(2)}</td>
                  <td>{silverRates.tola.pkr.toFixed(0)} PKR</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>

      {/* Zakat Calculator */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-12 mb-12">
        <h3 className="text-xl font-bold mb-4 text-center">🕌 Zakat Calculator</h3>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Gold (grams)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={zakatGold}
            onChange={(e) => setZakatGold(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Silver (grams)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={zakatSilver}
            onChange={(e) => setZakatSilver(e.target.value)}
          />
        </div>
        <button
          onClick={handleZakat}
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Calculate Zakat
        </button>
        {zakatResult !== null && (
          <p className="mt-4 text-center text-lg font-semibold">
            Total Zakat: {zakatResult.toFixed(2)} PKR
          </p>
        )}
      </div>
    </div>
  );
}
