import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-bold">404 - Intel Not Found</h1>
      <p className="mt-3 text-gray-300">This operation does not exist in BO7 records.</p>
      <Link href="/dashboard" className="btn mt-5 inline-block">Return to Dashboard</Link>
    </div>
  );
}
