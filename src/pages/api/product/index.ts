import dbConnect from '@/lib/mongoose/dbConnect';
import Product from '@/lib/product/product.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const data = await Product.find({});

      return res.status(200).json(data);
    } catch (error) {
      console.error('DB handler error occurred', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
