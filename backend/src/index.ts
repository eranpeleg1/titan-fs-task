import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FAVQS_API_KEY = process.env.FAVQS_API_KEY || '';
const FAVQS_BASE_URL = 'https://favqs.com/api/quotes';

if (!FAVQS_API_KEY) {
  console.error('Missing FAVQS_API_KEY in .env file');
  process.exit(1);
}

const cache = new NodeCache({ stdTTL: 300 });

app.use(cors());

app.get('/quotes', async (req, res) => {
  const count = parseInt(req.query.count as string) || 5;
  const offset = parseInt(req.query.offset as string) || 0;
  const tag = (req.query.tag as string) || 'all';
  const cacheKey = `quotes:${count}:${tag}`;

  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  const headers = {
    headers: {
      Authorization: `Token token=\"${FAVQS_API_KEY}\"`,
    },
  };

  try {
    const results: any[] = [];
    const firstPage = Math.floor(offset / 25) + 1; // FAVQS API uses 25 quotes per page
    let page = firstPage; // FAVQS API uses 25 quotes per page

    while (results.length < count) {
      const url = `${FAVQS_BASE_URL}?${tag !== 'all' ? 'filter='+tag : ''}&type=tag&page=${page}`;
      const response = await axios.get(url, headers);
      const quotes = response.data.quotes;

      if (!quotes.length) break;
      if (page === firstPage) {
        const offsetIndex = offset % 25;
        results.push(...quotes.slice(offsetIndex, count));
      } else {
        const remainingCount = count - results.length;
        results.push(...quotes.slice(0, remainingCount));
      }

      page++;
    }

    cache.set(cacheKey, results);
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch quotes', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Quotes API listening on http://localhost:${PORT}`);
});
