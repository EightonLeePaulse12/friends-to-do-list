import { NextApiHandler } from 'next';

const middleware: NextApiHandler = (req, res) => {
  res.setHeader('X-Custom-Header', 'My Custom Value');
  // continue processing the request
  return undefined;
};

export default middleware;