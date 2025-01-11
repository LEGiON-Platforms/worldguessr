export default async function handler(req, res) {
    const { slug } = req.query; 
    // Implement logic to increment the play count for the map in the database
    // (e.g., update the MapModel document)
    res.status(200).json({ message: 'Play recorded' });
  }