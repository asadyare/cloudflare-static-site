export default function Footer() {
  return (
    <footer className="py-10 bg-muted/50 border-t border-border text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          Built with security in mind —{' '}
          <span className="font-semibold text-gradient-neon inline-block">DevSecOps Portfolio</span> —{' '}
          <a href="#contact" className="text-primary hover:underline">
            Get in touch
          </a>
        </p>
        <p className="text-xs text-muted-foreground/80">
          © {new Date().getFullYear()} Asad Ali ·{' '}
          <a
            href="https://github.com/asadyare"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
