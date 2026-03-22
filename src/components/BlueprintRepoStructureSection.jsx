import { motion } from 'framer-motion'
import { CubeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

const structure = [
  {
    type: 'folder',
    name: 'portfolio-frontend/',
    indent: 0,
    items: [
      { type: 'folder', name: 'src/', indent: 1 },
      { type: 'folder', name: 'terraform/', indent: 1 },
      { type: 'file', name: '.github/workflows/CI.yml', indent: 1 },
    ],
  },
  {
    type: 'folder',
    name: 'portfolio-ci-cd-security/',
    indent: 0,
    items: [
      { type: 'file', name: '.github/workflows/shared-security.yml', indent: 1 },
      { type: 'file', name: '.github/workflows/ci-security.yml', indent: 1 },
    ],
  },
  {
    type: 'folder',
    name: 'portfolio-k8s-security/',
    indent: 0,
    items: [
      { type: 'file', name: 'docker/Dockerfile', indent: 1 },
      { type: 'folder', name: 'k8s/', indent: 1 },
      { type: 'folder', name: 'scripts/', indent: 1 },
    ],
  },
  {
    type: 'folder',
    name: 'portfolio-daily-security/',
    indent: 0,
    items: [{ type: 'file', name: '.github/workflows/security-alerting-and-reporting.yml', indent: 1 }],
  },
  {
    type: 'folder',
    name: 'portfolio-threat-model/',
    indent: 0,
    items: [
      { type: 'folder', name: 'risk-register/', indent: 1 },
      { type: 'folder', name: 'ci-pipeline-threats/', indent: 1 },
      { type: 'folder', name: 'kubernetes-threats/', indent: 1 },
      { type: 'folder', name: 'frontend-threats/', indent: 1 },
      { type: 'folder', name: 'diagrams/', indent: 1 },
    ],
  },
  {
    type: 'folder',
    name: 'devsecops-portfolio-asad/',
    indent: 0,
    items: [{ type: 'folder', name: 'diagrams/', indent: 1 }],
  },
]

const TreeNode = ({ item }) => (
  <>
    <div className="flex items-center gap-2 py-1" style={{ paddingLeft: `${item.indent * 20}px` }}>
      {item.items ? (
        <CubeIcon className="w-4 h-4 text-primary flex-shrink-0" />
      ) : (
        <DocumentArrowDownIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      )}
      <span className={item.items ? 'text-primary font-medium' : 'text-muted-foreground text-sm'}>
        {item.name}
      </span>
    </div>
    {item.items?.map((child) => (
      <TreeNode key={`${item.name}-${child.name}`} item={child} />
    ))}
  </>
)

export default function BlueprintRepoStructureSection() {
  return (
    <section id="repo" className="py-24 scroll-mt-24 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Structure</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            Repository <span className="text-gradient-neon">Layout</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto card-gradient rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground font-medium ml-2">my-portfolio-development/</span>
          </div>

          <div className="space-y-0.5">
            {structure.map((item) => (
              <TreeNode key={item.name} item={item} />
            ))}
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            This section summarizes the security lifecycle evidence across repositories (CI security workflows, Kubernetes hardening, runtime detection, and threat model docs).
          </div>
        </motion.div>
      </div>
    </section>
  )
}

