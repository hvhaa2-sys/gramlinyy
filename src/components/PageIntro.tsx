import type { ReactNode } from 'react'

type PageIntroProps = {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageIntro({ title, subtitle, children }: PageIntroProps) {
  return (
    <header className="page-intro">
      <h1 className="page-title">{title}</h1>
      {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      {children}
    </header>
  )
}
