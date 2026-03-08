export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-neutral-200 antialiased">
        <div className="min-h-screen flex flex-col">

          {/* Header */}
          <header className="border-b border-neutral-800">
            <div className="max-w-3xl mx-auto px-6 py-6">

              <h1 className="text-3xl font-semibold tracking-tight">
                ATAAH KING
              </h1>

              <p className="text-sm text-neutral-400 mt-1">
                Public Portal
              </p>

              <nav className="mt-4 flex gap-6 text-sm text-neutral-300">
                <a href="/" className="hover:text-white">Schedule</a>
                <a href="/press" className="hover:text-white">Press</a>
                <a href="/info" className="hover:text-white">Info</a>
              </nav>

            </div>
          </header>

          {/* Main */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-neutral-800 mt-20">
            <div className="max-w-3xl mx-auto px-6 py-8 text-sm text-neutral-500">
              © {new Date().getFullYear()} Reignsound Press™
            </div>
          </footer>

        </div>
      </body>
    </html>
  )
}
