import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <h1 className="grad-text">404</h1>
        <p>That page doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn btn-primary">
          <span>← Back home</span>
        </Link>
      </div>
    </section>
  );
}
