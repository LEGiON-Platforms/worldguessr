import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('localhost:3003/allCountries.json'); 
    res.status(200).json(response.data); 
  } catch (error) {
    console.error('Error fetching allCountries.json:', error);
    res.status(500).json({ error: 'Failed to fetch data' }); 
  }
}