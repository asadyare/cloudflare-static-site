import { motion } from 'framer-motion'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  CubeIcon,
  ShieldCheckIcon,
  BeakerIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

// Matches portfolio-frontend/.github/workflows/CI.yml + portfolio-ci-cd-security shared-security.yml (order of steps in the reusable job).
const stages = [
  {
    label: 'frontend-ci → shared-security',
    desc: 'Push/PR to main runs frontend-ci; the shared-security job calls portfolio-ci-cd-security reusable workflow with Node 20 and Dockerfile from portfolio-k8s-security.',
    icon: CodeBracketIcon,
    status: 'complete',
  },
  {
    label: 'npm audit',
    desc: 'npm audit --audit-level=high in the shared-security job (after npm ci).',
    icon: BeakerIcon,
    status: 'complete',
  },
  {
    label: 'Gitleaks',
    desc: 'Secret scanning with SARIF report (gitleaks.sarif).',
    icon: ShieldCheckIcon,
    status: 'complete',
  },
  {
    label: 'Semgrep',
    desc: 'SAST with config p/javascript (returntocorp/semgrep-action).',
    icon: ShieldCheckIcon,
    status: 'complete',
  },
  {
    label: 'npm run build',
    desc: 'Production build runs in shared-security before the container image is built.',
    icon: BeakerIcon,
    status: 'complete',
  },
  {
    label: 'Docker build',
    desc: 'Image built from portfolio-k8s-security docker/Dockerfile; tagged as portfolio-frontend with the commit SHA.',
    icon: CubeIcon,
    status: 'complete',
  },
  {
    label: 'Trivy image scan',
    desc: 'aquasecurity/trivy-action on the built image; HIGH/CRITICAL with exit-code 1; ignore-unfixed enabled.',
    icon: ShieldCheckIcon,
    status: 'complete',
  },
  {
    label: 'Cloudflare Pages',
    desc: 'After shared-security: PRs and main use npx wrangler pages deploy dist (bundles ./functions with assets—GET /metrics works in prod).',
    icon: ArrowRightIcon,
    status: 'active',
  },
  {
    label: 'GHCR image push',
    desc: 'On main, push-image job rebuilds from the same Dockerfile, logs in to ghcr.io, pushes asadyare/portfolio-frontend:sha and :latest.',
    icon: CloudArrowUpIcon,
    status: 'complete',
  },
  {
    label: 'Terraform apply (manual)',
    desc: 'Only on workflow_dispatch: terraform fmt/init/validate/apply in terraform/ with Cloudflare credentials — not part of every push.',
    icon: Cog6ToothIcon,
    status: 'complete',
  },
]

export default function BlueprintPipelineSection() {
  return (
    <section id="pipeline" className="py-24 scroll-mt-24 relative bg-secondary/30">
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Architecture</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            CI/CD <span className="text-gradient-neon">Security Pipeline</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            Same order as <code className="text-xs bg-secondary px-1 py-0.5 rounded">shared-security.yml</code>: audit
            → secret &amp; SAST scans → build → image → Trivy; then Cloudflare Pages (
            <code className="text-xs bg-secondary px-1 rounded">wrangler</code>, bundles{' '}
            <code className="text-xs bg-secondary px-1 rounded">functions/</code>) and GHCR on main; Terraform only on
            manual dispatch.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-6">
              {stages.map((stage, i) => {
                const Icon = stage.icon
                const active = stage.status === 'active'
                return (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div
                      className={`relative z-10 flex-shrink-0 w-12 md:w-16 h-12 md:h-16 rounded-xl flex items-center justify-center border transition-all ${
                        active
                          ? 'bg-primary/20 border-primary border-2 glow-pulse'
                          : 'bg-card border-border'
                      }`}
                    >
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>

                    <div
                      className={`flex-1 card-gradient rounded-xl border p-5 transition-all ${
                        active ? 'border-2 border-glow' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-foreground">{stage.label}</h3>
                        {stage.status === 'complete' && (
                          <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mt-1">{stage.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

