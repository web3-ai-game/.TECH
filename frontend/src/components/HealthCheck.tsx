import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';

const HealthCheck = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/health');
      setStatus(`Status: ${response.data.status}, Timestamp: ${response.data.timestamp}`);
    } catch (error) {
      setStatus('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Backend Health Check</h2>
      <Button onClick={checkHealth} disabled={loading}>
        {loading ? 'Checking...' : 'Check Health'}
      </Button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default HealthCheck;