import { motion } from 'framer-motion'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

// Aligned with public LinkedIn profile (verify dates on Credly / issuer sites).
const certifications = [
  { name: 'CompTIA Security+', issuer: 'CompTIA', issued: 'Mar 2025', expires: 'Mar 2028' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issued: 'Apr 2025', expires: 'Apr 2028' },
  { name: 'HashiCorp Terraform Associate (003)', issuer: 'HashiCorp', issued: 'Apr 2025', expires: 'Apr 2027' },
  { name: 'GitHub Actions', issuer: 'Microsoft Learn', issued: 'Oct 2025', expires: 'Oct 2027' },
  { name: 'Certified in Cybersecurity (CC)', issuer: 'ISC2', issued: 'Jun 2024', expires: 'Jun 2027' },
  { name: 'Google Cybersecurity Specialization', issuer: 'Coursera', issued: 'Jun 2024', expires: null },
  { name: 'Mastercard Cybersecurity Job Simulation', issuer: 'Forage', issued: 'Jun 2024', expires: null },
  { name: 'DevSecOps Certified', issuer: 'Cyber Agoge', issued: 'Dec 2024', expires: null, noExpiration: true },
]

export default function BlueprintCertificationsSection() {
  return (
    <section id="credentials" className="py-20 scroll-mt-24 relative bg-secondary/20 border-y border-border/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Credentials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Certifications <span className="text-gradient-neon">&amp; learning</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            Same credentials as on{' '}
            <a
              href="https://www.linkedin.com/in/asad-hassan-20b540313/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              LinkedIn
            </a>
            — useful for recruiters verifying background quickly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-border bg-card/80 p-4 text-left hover:border-primary/30 transition-colors"
            >
              <AcademicCapIcon className="w-5 h-5 text-primary mb-2" aria-hidden />
              <h3 className="font-semibold text-foreground text-sm leading-snug">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.issuer}</p>
              <p className="text-[11px] text-muted-foreground/90 mt-2">
                Issued {c.issued}
                {c.noExpiration
                  ? ' · No expiration date'
                  : c.expires
                    ? ` · Expires ${c.expires}`
                    : ''}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
