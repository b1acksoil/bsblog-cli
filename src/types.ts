export interface IndexFile {
  articles: Article[]
}

export interface Article {
  id: string
  title: string
  categories: string[]
  tags: string[]
  create: number
}