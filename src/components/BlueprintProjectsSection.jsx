import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { getHomePageCaseStudies, projectCasePath } from '../data/caseStudies'
import { formatRepoCreatedAt } from '../utils/formatProjectDate'

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
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            Each card links to a public GitHub repo and a{' '}
            <strong className="text-foreground">case study</strong> page with context, pipeline stages, and evidence.
            Together they span portfolio tooling, bank-app and healthcare demos: shared security workflows, AWS hosting,
            Kubernetes, post-merge assurance, and threat modeling.
          </p>
          <p className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <DocumentTextIcon className="w-5 h-5" />
              Browse all case studies
            </Link>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {getHomePageCaseStudies().map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={`${project.category}-${project.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-gradient rounded-xl border border-border p-8 hover:border-glow transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-5 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground leading-tight">{project.shortTitle}</h3>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:border-glow hover:bg-primary/10 transition-colors text-sm text-foreground"
                      aria-label={`Open ${project.shortTitle} repository`}
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Repo
                    </a>
                    <Link
                      to={projectCasePath(project.category, project.slug)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-medium text-primary"
                    >
                      <DocumentTextIcon className="w-4 h-4" />
                      Case study
                    </Link>
                  </div>
                </div>

                {formatRepoCreatedAt(project.createdAt) && (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <CalendarDaysIcon className="w-4 h-4 shrink-0 text-primary/80" aria-hidden />
                    <span>
                      Repo created{' '}
                      <time dateTime={project.createdAt}>{formatRepoCreatedAt(project.createdAt)}</time>
                    </span>
                  </p>
                )}

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

                <div className="space-y-2 flex-1">
                  {project.concepts.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
