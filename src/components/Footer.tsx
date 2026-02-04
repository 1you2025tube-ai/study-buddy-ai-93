import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedPrep AI. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link 
              to="/refund" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Refund
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
