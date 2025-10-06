import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} 🎓.TECH. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {/* Add social links here later */}
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Twitter
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}