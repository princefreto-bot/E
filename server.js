import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true,
}));

// Serve images from public/images (for GIF sequences)
app.use('/images', express.static(join(__dirname, 'public/images'), {
  maxAge: '7d',
  etag: true,
}));

// SPA fallback - serve index.html for all non-static routes
// Using middleware instead of wildcard route (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🍌 Nano Banana server running on port ${PORT}`);
  console.log(`   http://localhost:${PORT}`);
});
