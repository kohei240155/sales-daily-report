import React, { type FC } from 'react'

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} 営業日報システム. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
