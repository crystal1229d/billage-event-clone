import AboutItem from '@/components/about/AboutItem'
import { ABOUT_GUIDES } from '@/data'
import { AboutGuide } from '@/types'

export default function AboutPage() {
  return (
    <div>
      {ABOUT_GUIDES.map((about: AboutGuide) => (
        <AboutItem key={about.title} about={about} />
      ))}
    </div>
  )
}
