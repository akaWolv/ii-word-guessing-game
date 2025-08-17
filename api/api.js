import express from 'express';
import dbConnect from './lib/mongodb';
import Word from './models/Word';
import Setup from './models/Setup';

const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ hello: "world" });
});
app.get("/api/words/:category", async (req, res) => {
  const { category } = req.params
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await Word.find({ category });
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
app.get("/api/word-duplicates", async (req, res) => {
  const { category } = req.params
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await Word.aggregate([
          {
            $group: {
              _id: {
                text: '$text',
                category: '$category'
              }, // Group by the field you want to check for duplicates
              count: { $sum: 1 }, // Count the documents in each group
              duplicates: { $push: '$_id' } // Store the _id of duplicate documents
            }
          },
          {
            $match: {
              count: { $gt: 1 } // Filter for groups with more than one document
            }
          }
        ]);
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
app.get("/api/setup", async (req, res) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await Setup.find(null, null, { sort: { order: 1 } });
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});

export const handler = app;