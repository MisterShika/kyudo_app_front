import Link from 'next/link';

export default function Home() {
  return (
    <div>
      Hello World
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
