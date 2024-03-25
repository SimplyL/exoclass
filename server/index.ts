import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  '/proxy',
  createProxyMiddleware({
    target: process.env.VITE_API_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '/api/v1',
    },
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    },
  }),
);

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.VITE_MOCK_USERNAME || password !== process.env.VITE_MOCK_PASSWORD) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: email }, 'secret-key', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(process.env.VITE_PROXY_PORT, () =>
  console.log(`Server is listening on port ${process.env.VITE_PROXY_PORT}...`),
);
