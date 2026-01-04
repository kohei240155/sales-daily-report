// src/components/layouts/Footer.tsx

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} 営業日報システム. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
