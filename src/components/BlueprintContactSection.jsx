import { motion } from 'framer-motion'
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

const GitHubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.06A9.2 9.2 0 0 1 12 6.07c.85 0 1.71.12 2.51.34 1.9-1.33 2.74-1.06 2.74-1.06.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.77 0 3.97-2.34 4.83-4.57 5.09.36.32.67.95.67 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.6.69.49A9.76 9.76 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
    />
  </svg>
)

const LinkedInIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.5 1 3.9 1 4.98 2.12 4.98 3.5ZM.24 8.25h4.52V23H.24V8.25ZM8.34 8.25h4.33v2h.06c.6-1.13 2.07-2.32 4.26-2.32 4.55 0 5.39 3 5.39 6.9V23h-4.52v-7.2c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.87-2.77 3.8V23H8.34V8.25Z"
    />
  </svg>
)

const links = [
  {
    href: 'https://github.com/asadyare',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/asad-hassan-20b540313/',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:walasaqo@gmail.com',
    label: 'Email',
    mail: true,
  },
  {
    href: 'https://github.com/asadyare/devsecops-portfolio-asad/raw/main/diagrams/DevSecOps_Architecture_Pack.pdf',
    label: 'Architecture Pack',
  },
]

export default function BlueprintContactSection() {
  return (
    <section id="contact" className="py-24 scroll-mt-24 relative bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-primary">
            <CodeBracketIcon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
            Let&apos;s <span className="text-gradient-neon">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4 mb-10 leading-relaxed max-w-lg mx-auto">
            Based in <strong className="text-foreground">Birmingham, UK</strong> · DevSecOps Apprentice at{' '}
            <strong className="text-foreground">Cyber Agoge</strong>. Open to{' '}
            <strong className="text-foreground">DevSecOps</strong>, <strong className="text-foreground">platform / SRE</strong>
            , and <strong className="text-foreground">cloud security</strong> roles (UK / remote). Same story on{' '}
            <a
              href="https://www.linkedin.com/in/asad-hassan-20b540313/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              LinkedIn
            </a>
            — reach out below.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            {links.map((l) => {
              let Icon = ArrowTopRightOnSquareIcon
              if (l.mail) Icon = EnvelopeIcon
              else if (l.label === 'GitHub') Icon = GitHubIcon
              else if (l.label === 'LinkedIn') Icon = LinkedInIcon

              let classes =
                'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200'

              if (l.label === 'GitHub') {
                classes += ' bg-primary text-primary-foreground hover:opacity-90'
              } else if (l.label === 'LinkedIn') {
                classes += ' border border-glow text-primary bg-transparent hover:bg-primary/10 shadow-[var(--shadow-neon)]'
              } else {
                classes += ' border border-border text-secondary-foreground bg-transparent hover:border-glow hover:text-primary hover:shadow-[var(--shadow-neon)]'
              }

              return (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.mail ? undefined : '_blank'}
                  rel={l.mail ? undefined : 'noopener noreferrer'}
                  className={classes}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{l.label}</span>
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

