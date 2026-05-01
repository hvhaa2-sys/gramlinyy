export type ChecklistItem = {
  id: string
  title: string
  steps: string[]
  tip?: string
}

export type Platform = {
  id: string
  name: string
  short: string
  icon: string
  priority: boolean
  lastReviewed: string
  officialUrl?: string
  items: ChecklistItem[]
}

export type PlaybookStep = {
  title: string
  body: string
}

export type Playbook = {
  id: string
  title: string
  lead: string
  steps: PlaybookStep[]
  relatedPlatformIds?: string[]
}

export type GlossaryEntry = {
  slug: string
  term: string
  definition: string
}

export type DiagnosisOption = {
  id: string
  label: string
  weights: Record<string, number>
}

export type DiagnosisQuestion = {
  id: string
  prompt: string
  options: DiagnosisOption[]
}
