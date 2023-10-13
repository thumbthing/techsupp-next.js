import Link from 'next/link';

require('dotenv').config();

export default function Home() {
  const path = {
    product: 'product?scope=0&page=0&order=ASC',
    feedback: 'feedback',
  };

  return (
    <main>
      <div>techsupp next js version</div>
      <div>
        <Link href="product?scope=0&page=0&order=ASC">
          <button type="button">product</button>
        </Link>
        <Link href="feedback">
          <button type="button">feedback</button>
        </Link>
      </div>
    </main>
  );
}
