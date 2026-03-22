import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BlueprintHeroSection from '../components/BlueprintHeroSection'
import BlueprintSkillsSection from '../components/BlueprintSkillsSection'
import BlueprintCertificationsSection from '../components/BlueprintCertificationsSection'
import BlueprintProjectsSection from '../components/BlueprintProjectsSection'
import BlueprintPipelineSection from '../components/BlueprintPipelineSection'
import BlueprintMonitoringSection from '../components/BlueprintMonitoringSection'
import BlueprintRepoStructureSection from '../components/BlueprintRepoStructureSection'
import BlueprintContactSection from '../components/BlueprintContactSection'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return

    // Smooth anchor navigation; offset is handled by scroll-margin-top.
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <div className="w-full">
      <BlueprintHeroSection />
      <BlueprintSkillsSection />
      <BlueprintCertificationsSection />
      <BlueprintProjectsSection />
      <BlueprintPipelineSection />
      <BlueprintMonitoringSection />
      <BlueprintRepoStructureSection />
      <BlueprintContactSection />
    </div>
  )
}