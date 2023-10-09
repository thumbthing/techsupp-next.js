import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Home() {
  const path = {
    product: 'product',
    feedback: 'feedback',
  };

  return (
    <main>
      <div>techsupp next js version</div>
      <div>
        <Link href={path.product}>
          <button type="button">product</button>
        </Link>
        <Link href={path.feedback}>
          <button type="button">feedback</button>
        </Link>
      </div>
    </main>
  );
}
