import express from 'express';
import dbConnect from './lib/mongodb';
import Word from './models/Word';

const app = express();

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

export const handler = app;