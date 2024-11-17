import AboutItem from '@/components/about/AboutItem'
import { ABOUT_GUIDES } from '@/data'
import { AboutGuide } from '@/types'
import { Fragment } from 'react'

export default function AboutPage() {
  return (
    <Fragment>
      {ABOUT_GUIDES.map((about: AboutGuide, index: number) => (
        <AboutItem key={about.title} about={about} index={index} />
      ))}
    </Fragment>
  )
}
