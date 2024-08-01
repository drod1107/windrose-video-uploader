import connectToDatabase from '@/lib/mongodb';


export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const wistiaData = req.body;
    console.log(`Sending data to MongoDB: ${wistiaData}`)
    const newVideo = new WistiaVideo(wistiaData);
    await newVideo.save();

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
}
