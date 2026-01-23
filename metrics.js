// metrics.js
const client = require('prom-client');
const express = require('express');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(9100, () => console.log('Metrics server running on port 9100'));
