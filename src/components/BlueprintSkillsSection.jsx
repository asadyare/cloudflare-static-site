import { motion } from 'framer-motion'
import {
  CodeBracketIcon,
  CloudIcon,
  CubeIcon,
  ServerStackIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  RectangleStackIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

// Matches tools in this portfolio’s repos (CI, Pages + Functions, deploy, IaC, K8s manifests).
const skills = [
  {
    label: 'GitHub Actions',
    desc: 'Reusable workflows: build, security gates, Pages deploy, image publish',
    icon: CodeBracketIcon,
  },
  {
    label: 'Node.js & Vite',
    desc: 'React SPA — npm ci, production build, and checks in CI',
    icon: CpuChipIcon,
  },
  {
    label: 'Cloudflare',
    desc: 'Pages (prod + PR previews), Terraform for DNS/zone, edge Functions e.g. GET /metrics',
    icon: CloudIcon,
  },
  {
    label: 'Terraform',
    desc: 'Cloudflare provider — zone, DNS, DNSSEC; validated in CI on dispatch',
    icon: Cog6ToothIcon,
  },
  {
    label: 'Docker',
    desc: 'Container image built in CI from the nginx-unprivileged Dockerfile',
    icon: CubeIcon,
  },
  {
    label: 'GHCR',
    desc: 'Images pushed to GitHub Container Registry from the pipeline',
    icon: RectangleStackIcon,
  },
  {
    label: 'Kubernetes',
    desc: 'Manifests for hardened workloads, ingress, network policy, Falco configs',
    icon: ServerStackIcon,
  },
  {
    label: 'Security scanning',
    desc: 'Gitleaks, Semgrep, npm audit, and Trivy image scan with SARIF',
    icon: ShieldCheckIcon,
  },
]

export default function BlueprintSkillsSection() {
  return (
    <section id="skills" className="py-24 scroll-mt-24 relative bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Tech Stack</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Core <span className="text-gradient-neon">Technologies</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            Tools I use in this portfolio&apos;s repos today—overlaps my public LinkedIn headline (Docker, Kubernetes,
            AWS, Terraform, CI/CD) plus Cloudflare-specific delivery for this site.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-gradient rounded-xl border border-border p-6 hover:border-glow transition-all duration-300 group"
              >
                <Icon className="w-8 h-8 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.45)] transition-all" />
                <h3 className="font-semibold text-foreground mb-2">{skill.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

