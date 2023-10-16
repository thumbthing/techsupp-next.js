import dbConnect from '@/lib/mongoose/dbConnect';
import Product from '@/lib/product/product.model';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const idObject = req.query;

      if (idObject.id) {
        const objectId = new ObjectId(idObject.id[0]);
        console.log(objectId);

        const data = await Product.findOne({ _id: objectId });

        return res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
