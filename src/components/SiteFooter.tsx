import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js, TypeScript and Motion</span>
      </div>
    </footer>
  );
}
