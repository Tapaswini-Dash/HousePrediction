import { useState } from 'react'

function PricePredictor() {
  const [formData, setFormData] = useState({
    MedInc: '',
    HouseAge: '',
    AveRooms: '',
    AveBedrms: '',
    Population: '',
    AveOccup: '',
    Latitude: '',
    Longitude: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          MedInc: parseFloat(formData.MedInc),
          HouseAge: parseFloat(formData.HouseAge),
          AveRooms: parseFloat(formData.AveRooms),
          AveBedrms: parseFloat(formData.AveBedrms),
          Population: parseFloat(formData.Population),
          AveOccup: parseFloat(formData.AveOccup),
          Latitude: parseFloat(formData.Latitude),
          Longitude: parseFloat(formData.Longitude)
        })
      })
      const data = await response.json()
      
      if (data.predicted_price) {
        setPrediction(data.predicted_price)
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to connect. Is FastAPI running?')
    }
    setLoading(false)
  }

  const inputFields = [
    { name: 'MedInc', label: 'Median Income', placeholder: '8.3252', icon: '💰', desc: 'Income in $10,000s' },
    { name: 'HouseAge', label: 'House Age', placeholder: '41.0', icon: '🏠', desc: 'Years old' },
    { name: 'AveRooms', label: 'Average Rooms', placeholder: '6.98', icon: '🚪', desc: 'Rooms per household' },
    { name: 'AveBedrms', label: 'Average Bedrooms', placeholder: '1.02', icon: '🛏️', desc: 'Bedrooms per household' },
    { name: 'Population', label: 'Population', placeholder: '322', icon: '👥', desc: 'Block population' },
    { name: 'AveOccup', label: 'Average Occupancy', placeholder: '2.56', icon: '👨‍👩‍👧', desc: 'Members per household' },
    { name: 'Latitude', label: 'Latitude', placeholder: '37.88', icon: '📍', desc: 'Location coordinate' },
    { name: 'Longitude', label: 'Longitude', placeholder: '-122.23', icon: '📍', desc: 'Location coordinate' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl mb-6 shadow-lg shadow-emerald-500/30">
            <span className="text-4xl">🏠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            House Price <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Predictor</span>
          </h1>
          <p className="text-slate-400 text-lg">AI-Powered Real Estate Price Estimation</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">📊</span>
              Enter Property Details
            </h2>
            <p className="text-emerald-100 mt-1">Fill in the details below to get an AI-powered price estimate</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <span className="text-lg">{field.icon}</span>
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      step="0.01"
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all group-hover:border-slate-500"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500">{field.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-emerald-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Property...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <span>🔮</span>
                  Get Price Estimate
                </span>
              )}
            </button>
          </form>

          {/* Result */}
          {prediction && (
            <div className="mx-8 mb-8 p-6 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl">
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✅</span>
                </div>
                <div className="text-center">
                  <p className="text-slate-300 text-sm uppercase tracking-wider">Estimated Property Value</p>
                  <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    ${prediction.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">
                ⚠️ This is an AI estimate. Consult a professional for accurate valuations.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mx-8 mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">⚠️</span>
                <span className="text-red-400 font-medium">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500">
          <p>Powered by <span className="text-emerald-400">FastAPI</span> & <span className="text-cyan-400">Machine Learning</span></p>
        </div>
      </div>
    </div>
  )
}

export default PricePredictor