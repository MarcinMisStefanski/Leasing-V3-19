export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("Otrzymano dane:", req.body);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
