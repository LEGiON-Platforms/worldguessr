import mongoose from 'mongoose';
import MapModel from '@/models/Map'; // Assuming MapModel is in models/Map.js

export default async function handler(req, res) {
  const { slug } = req.query; 

  try {
    await mongoose.connect(process.env.MONGODB); 
    const map = await MapModel.findOne({ slug }).cache(10000); 

    if (!map) {
      return res.status(404).json({ message: 'Map not found' });
    }

    res.json({
      ready: true,
      locations: map.data,
      name: map.name,
      official: map.official,
      maxDist: map.maxDist
    });
  } catch (error) {
    console.error('Error fetching mapLocations:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await mongoose.disconnect(); 
  }
}