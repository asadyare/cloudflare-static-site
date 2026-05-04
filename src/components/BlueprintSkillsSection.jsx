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
  ChartBarIcon,
  CircleStackIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

// Aggregated from portfolio case studies: portfolio-ci-cd-security, frontend, k8s-security,
// daily-security, threat-model, bank-app case study (slug secure-banking-app), Healthcare_Apps — see caseStudies.js.
const skills = [
  {
    label: 'GitHub Actions & OIDC',
    desc: 'Reusable workflows (`workflow_call`), PR + main gates, scheduled cron scans, federated AWS deploy without long-lived keys',
    icon: CodeBracketIcon,
  },
  {
    label: 'Node.js, React & Vite',
    desc: 'Portfolio SPA; bank-app demo TypeScript SPA; healthcare npm workspaces (Express + Vite apps) with CI build matrices',
    icon: CpuChipIcon,
  },
  {
    label: 'Cloudflare',
    desc: 'Pages (prod + PR previews), Wrangler deploy, Terraform for zone/DNS/DNSSEC, Pages Functions e.g. GET /metrics',
    icon: CloudIcon,
  },
  {
    label: 'AWS (patterns in repos)',
    desc: 'Bank demo: private S3, CloudFront, WAFv2. Healthcare Terraform: VPC, private EKS API, KMS, flow logs, ECR image flows',
    icon: GlobeAltIcon,
  },
  {
    label: 'Terraform & IaC policy',
    desc: 'Cloudflare + AWS providers; `terraform validate`/plan in CI; Checkov and Trivy IaC with documented suppressions where justified',
    icon: Cog6ToothIcon,
  },
  {
    label: 'Docker & registries',
    desc: 'Hardened Dockerfiles, image build in Actions; GHCR pushes; healthcare matrix builds and ECR idempotent tag pattern',
    icon: CubeIcon,
  },
  {
    label: 'Kubernetes',
    desc: 'Hardened Deployments, Ingress/TLS, NetworkPolicy, pod security contexts; EKS-aligned baseline in Healthcare_Apps; cert-manager patterns in k8s-security',
    icon: ServerStackIcon,
  },
  {
    label: 'Observability',
    desc: 'Prometheus scrape patterns, Grafana dashboards as code (ConfigMap), Falco runtime rules — plus edge `/metrics` for demos',
    icon: ChartBarIcon,
  },
  {
    label: 'DevSecOps scanning',
    desc: 'Gitleaks, TruffleHog, Semgrep (+ SARIF), npm audit, Trivy fs/image/IaC, ZAP baseline, CodeQL, Dependency Review — severity gates per repo',
    icon: ShieldCheckIcon,
  },
  {
    label: 'Supply chain & SBOM',
    desc: 'Dependabot (npm, Actions, Docker, Terraform where configured), CycloneDX SBOM uploads, scheduled rescan + Issues trail (daily-security)',
    icon: RectangleStackIcon,
  },
  {
    label: 'Data & auth (demos)',
    desc: 'Supabase (Postgres, RLS, JWT) for the bank-app demo; SQLite dev + integration APIs across Healthcare_Apps services',
    icon: CircleStackIcon,
  },
  {
    label: 'Threat modeling & evidence',
    desc: 'STRIDE matrices, risk analysis markdown, Mermaid architecture, in-repo case studies and incident logs tied to workflow proof',
    icon: DocumentTextIcon,
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
            Consolidated from every public project linked here: portfolio DevSecOps repos, the bank-app AWS demo, and
            Healthcare_Apps (EKS/Terraform monorepo)—same toolchain I highlight for platform, application, and security
            engineering roles.
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

