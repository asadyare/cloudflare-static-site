import { motion } from 'framer-motion'
import {
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  CodeBracketIcon,
  ServerStackIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

const projects = [
  {
    id: 'secure-ci-cd',
    title: 'portfolio-ci-cd-security',
    goal: 'Reusable workflows: secret scan, SAST, npm audit, Docker build, Trivy image scan',
    tech: ['GitHub Actions', 'Gitleaks', 'Semgrep', 'npm audit', 'Trivy', 'Docker'],
    concepts: ['workflow_call to app repos', 'SARIF to Security tab', 'Fail on HIGH/CRITICAL (Trivy)'],
    icon: ShieldCheckIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-ci-cd-security',
    accent: 'primary',
  },
  {
    id: 'terraform-iac',
    title: 'portfolio-frontend',
    goal: 'React (Vite) app, Cloudflare Pages deploy, and Terraform for Cloudflare DNS / zone',
    tech: ['React', 'Vite', 'Cloudflare Pages', 'Terraform', 'Cloudflare provider'],
    concepts: ['PR previews + prod Pages', 'IaC in-repo', 'CI consumes shared-security'],
    icon: CodeBracketIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-frontend',
    accent: 'secondary',
  },
  {
    id: 'k8s-security',
    title: 'portfolio-k8s-security',
    goal: 'Kubernetes manifests: hardened Deployment, ingress/TLS, NetworkPolicy, Falco, Grafana dashboard ConfigMap',
    tech: ['Kubernetes', 'Docker', 'Ingress', 'NetworkPolicy', 'Falco', 'Grafana (as code)'],
    concepts: ['Non-root workloads', 'Runtime detection', 'Observability YAML in repo'],
    icon: ServerStackIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-k8s-security',
    accent: 'primary',
  },
  {
    id: 'daily-security',
    title: 'portfolio-daily-security',
    goal: 'Scheduled scans (daily + weekly) for CVEs and drift when no PRs run — SBOM, SARIF, GitHub Issues',
    tech: ['GitHub Actions (cron)', 'Gitleaks', 'Trivy FS', 'SBOM', 'SARIF upload'],
    concepts: ['Post-merge assurance', 'Weekly report issue', 'Links to workflow evidence'],
    icon: CalendarDaysIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-daily-security',
    accent: 'secondary',
  },
  {
    id: 'threat-model',
    title: 'portfolio-threat-model',
    goal:
      'Threat modeling and risk analysis for the portfolio: STRIDE, trust boundaries, mitigations mapped to CI and K8s',
    tech: ['Markdown', 'STRIDE', 'Risk register', 'Diagrams', 'frontend / CI / K8s lanes'],
    concepts: ['Assets & boundaries', 'Threats with mitigations', 'Aligned with Cloudflare + cluster controls'],
    icon: ShieldExclamationIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-threat-model',
    accent: 'primary',
  },
]

export default function BlueprintProjectsSection() {
  return (
    <section id="projects" className="py-24 scroll-mt-24 relative bg-background">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Core <span className="text-gradient-neon">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Repositories behind this portfolio: CI, app and IaC, Kubernetes, scheduled security, and threat modeling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-gradient rounded-xl border border-border p-8 hover:border-glow transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  </div>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-glow hover:bg-primary/10 transition-colors text-sm text-foreground"
                    aria-label={`Open ${project.title} repository`}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    Repo
                  </a>
                </div>

                <p className="text-sm text-muted-foreground font-medium mb-5">{project.goal}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-lg bg-secondary/60 text-secondary-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  {project.concepts.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {c}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

