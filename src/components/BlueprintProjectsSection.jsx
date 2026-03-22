import { motion } from 'framer-motion'
import {
  ArrowTopRightOnSquareIcon,
  CubeIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  ServerStackIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const projects = [
  {
    id: 'secure-ci-cd',
    title: 'Secure CI/CD Pipeline',
    goal: 'End-to-end secure pipeline with automated security gates',
    tech: ['GitHub Actions', 'Gitleaks', 'Semgrep', 'Trivy', 'Docker builds'],
    concepts: ['Code + dependency scanning', 'Container image scanning', 'Fail on HIGH/CRITICAL'],
    icon: ShieldCheckIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-ci-cd-security',
    accent: 'primary',
  },
  {
    id: 'terraform-iac',
    title: 'Terraform IaC Platform',
    goal: 'Cloudflare infrastructure managed with modular Terraform',
    tech: ['Terraform', 'Cloudflare Pages', 'DNS + DNSSEC', 'Validation in CI'],
    concepts: ['Environment separation', 'IaC validation', 'Reproducible deploy config'],
    icon: CodeBracketIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-frontend',
    accent: 'secondary',
  },
  {
    id: 'k8s-cluster',
    title: 'K8s Production Cluster',
    goal: 'Hardened Kubernetes deployment with runtime detection patterns',
    tech: ['Kubernetes', 'Non-root containers', 'Network policies', 'Falco'],
    concepts: ['Least privilege', 'Runtime detection', 'Ingress + TLS'],
    icon: ServerStackIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-k8s-security',
    accent: 'primary',
  },
  {
    id: 'observability',
    title: 'Observability & reporting',
    goal: 'Dashboards-as-code, runtime signals, and scheduled security reporting',
    tech: ['Grafana dashboard (ConfigMap)', 'Falco', 'Daily/weekly automation', 'SARIF from CI'],
    concepts: ['Dashboard JSON in Git', 'Runtime detection', 'Evidence from pipelines'],
    icon: ChartBarIcon,
    repoUrl: 'https://github.com/asadyare/portfolio-k8s-security',
    accent: 'secondary',
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
            Production-grade DevSecOps demonstrations: pipelines, infrastructure, runtime detection, and observability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

