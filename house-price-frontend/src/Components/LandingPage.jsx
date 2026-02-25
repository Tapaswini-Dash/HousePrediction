import { useState, useEffect } from 'react'

function LandingPage() {
  const [formData, setFormData] = useState({
    MedInc: '', HouseAge: '', AveRooms: '', AveBedrms: '',
    Population: '', AveOccup: '', Latitude: '', Longitude: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await fetch('https://houseprediction-5-hqsz.onrender.com/predict', {
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

  const scrollToForm = () => {
    setShowForm(true)
    setTimeout(() => {
      document.getElementById('predict-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="backdrop-blur-md bg-slate-950/80 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <span className="text-xl font-bold text-white">HousePrice AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-white transition">How It Works</a>
              <button onClick={scrollToForm} className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-slate-300 text-sm">Powered by Machine Learning</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Predict House Prices with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 animate-gradient">
                Artificial Intelligence
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Get instant, accurate property price estimates using advanced machine learning algorithms. 
              Simply enter property details and get results in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToForm}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Try Free Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto">
              {[
                { value: '98%', label: 'Accuracy' },
                { value: '50K+', label: 'Predictions' },
                { value: '<1s', label: 'Response Time' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
            <p className="text-slate-400">Advanced features for accurate predictions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Instant Results', desc: 'Get predictions in milliseconds with our optimized AI model.' },
              { icon: '🎯', title: 'High Accuracy', desc: '98% accuracy rate trained on comprehensive housing data.' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and never shared with third parties.' },
              { icon: '📱', title: 'Easy to Use', desc: 'Simple form interface that anyone can use effortlessly.' },
              { icon: '🧠', title: 'ML-Powered', desc: 'Built with Random Forest algorithm for reliable predictions.' },
              { icon: '💰', title: 'Completely Free', desc: 'No hidden fees. Use it as much as you want.' }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Get your property estimate in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📝', title: 'Enter Details', desc: 'Fill in property information like location, size, and age.' },
              { step: '02', icon: '🤖', title: 'AI Analysis', desc: 'Our ML model analyzes your data instantly.' },
              { step: '03', icon: '💵', title: 'Get Estimate', desc: 'Receive your accurate property value instantly.' }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-9xl font-bold text-white/5 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative bg-slate-900/50 p-8 rounded-2xl border border-white/10">
                  <span className="text-5xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prediction Form */}
      <section id="predict-section" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className={`bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${showForm ? 'opacity-100' : 'opacity-50'}`}>
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-2xl">🔮</span>
                Get Your Property Estimate
              </h2>
              <p className="text-emerald-100 text-sm mt-1">Fill in the details below to get an instant prediction</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'MedInc', label: 'Median Income', placeholder: '8.3252' },
                  { name: 'HouseAge', label: 'House Age', placeholder: '41.0' },
                  { name: 'AveRooms', label: 'Average Rooms', placeholder: '6.98' },
                  { name: 'AveBedrms', label: 'Average Bedrooms', placeholder: '1.02' },
                  { name: 'Population', label: 'Population', placeholder: '322' },
                  { name: 'AveOccup', label: 'Average Occupancy', placeholder: '2.56' },
                  { name: 'Latitude', label: 'Latitude', placeholder: '37.88' },
                  { name: 'Longitude', label: 'Longitude', placeholder: '-122.23' }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{field.label}</label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      step="0.01"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  '🔮 Get Free Estimate'
                )}
              </button>
            </form>

            {/* Result */}
            {prediction && (
              <div className="px-8 pb-8">
                <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl text-center animate-pulse">
                  <p className="text-slate-300 text-sm uppercase tracking-wider mb-2">Estimated Property Value</p>
                  <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    ${prediction.toLocaleString()}
                  </p>
                  <p className="text-slate-500 text-xs mt-3">⚠️ This is an AI estimate. Consult a professional for accurate valuations.</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="px-8 pb-8">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center text-red-400">
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-400 text-lg mb-8">Join thousands of users who trust our AI for property valuations.</p>
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all"
            >
              Try It Now - It's Free!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <span className="text-white font-bold">HousePrice AI</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 HousePrice AI. Built with FastAPI & Machine Learning.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage