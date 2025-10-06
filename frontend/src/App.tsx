import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Web3Provider } from './context/Web3Context'

function App() {
  return (
    <Web3Provider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </Web3Provider>
  )
}

export default App
