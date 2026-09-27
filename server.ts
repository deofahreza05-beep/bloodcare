import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  getAllBloodRequests, 
  createBloodRequest, 
  updateBloodRequestBags, 
  deleteBloodRequest,
  getAllHealthFacilities,
  getBloodStocksByFacility,
  updateOrInsertBloodStock,
  getAllDonors,
  createDonor,
  getAllSchedules,
  createSchedule
} from './src/db/queries.ts';

const app = express();
const port = 3000;

app.use(express.json());

// 1. API Permintaan Darah (blood_requests)
app.get('/api/blood-requests', async (_req, res) => {
  try {
    const data = await getAllBloodRequests();
    res.json(data);
  } catch (error: any) {
    console.error("GET /api/blood-requests error:", error);
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

app.post('/api/blood-requests', async (req, res) => {
  try {
    const newRequest = await createBloodRequest(req.body);
    res.status(201).json(newRequest);
  } catch (error: any) {
    console.error("POST /api/blood-requests error:", error);
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

app.patch('/api/blood-requests/:id/fulfill', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { bagsFulfilled, status } = req.body;
    const updated = await updateBloodRequestBags(id, bagsFulfilled, status);
    res.json(updated);
  } catch (error: any) {
    console.error("PATCH /api/blood-requests fulfill error:", error);
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

app.delete('/api/blood-requests/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await deleteBloodRequest(id);
    res.json({ success: true, deleted });
  } catch (error: any) {
    console.error("DELETE /api/blood-requests error:", error);
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

// 2. API Faskes (health_facilities)
app.get('/api/health-facilities', async (_req, res) => {
  try {
    const data = await getAllHealthFacilities();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

// 3. API Stok Darah (blood_stocks)
app.get('/api/stocks/:facilityId', async (req, res) => {
  try {
    const facilityId = parseInt(req.params.facilityId, 10);
    const data = await getBloodStocksByFacility(facilityId);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

app.post('/api/stocks', async (req, res) => {
  try {
    const { facilityId, bloodGroup, rhesus, bags } = req.body;
    const updated = await updateOrInsertBloodStock(Number(facilityId), bloodGroup, rhesus, Number(bags));
    res.json({ success: true, updated });
  } catch (error: any) {
    console.error("POST /api/stocks error:", error);
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

// 4. API Donors (donors)
app.get('/api/donors', async (_req, res) => {
  try {
    const data = await getAllDonors();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

app.post('/api/donors', async (req, res) => {
  try {
    const created = await createDonor(req.body);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

// 5. API Jadwal Donor & Bus (donation_schedules)
app.get('/api/schedules', async (_req, res) => {
  try {
    const data = await getAllSchedules();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

app.post('/api/schedules', async (req, res) => {
  try {
    const created = await createSchedule(req.body);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

// Vite middleware for frontend development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  // Fallback to transform and serve index.html for SPA routes
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith('/api')) {
      return next();
    }
    try {
      let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`BloodCare Full-Stack Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
