import { useState } from 'react';
import axios from 'axios';
import './styles.css';

interface Quote {
  id: number;
  body: string;
  author: string;
}

function App() {
  const [count, setCount] = useState<number>(5);
  const [tag, setTag] = useState<string>('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchQuotes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3001/quotes', {
        params: { count, tag },
      });
      setQuotes(res.data);
    } catch (err: any) {
      setError('Failed to fetch quotes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Quotes of the Day</h1>

      <div className="form-group">
        <label htmlFor="count-input">Number of quotes</label>
        <input
          id="count-input"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tag-input">Optional tag filter (e.g. life, wisdom)</label>
        <input
          id="tag-input"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button onClick={fetchQuotes}>Get Quotes</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {quotes.map((q) => (
          <li key={q.id}>
            "{q.body}" — <strong>{q.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
