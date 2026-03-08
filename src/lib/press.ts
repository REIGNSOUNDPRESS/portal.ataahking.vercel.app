import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PressRelease = {
  slug: string
  title: string
  date: string
  summary: string
  content: string
}

const pressDirectory = path.join(process.cwd(), 'src/press')

export function getAllPress({ year }: { year?: number } = {}): PressRelease[] {
  const fileNames = fs.readdirSync(pressDirectory).filter(f => f.endsWith('.md'))

  let allPress = fileNames.map(fileName => {
    const fullPath = path.join(pressDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      date: data.date || '1970-01-01',
      summary: data.summary || '',
      content,
    }
  })

  // Optional year filter
  if (year) {
    allPress = allPress.filter(p => new Date(p.date).getFullYear() === year)
  }

  // Sort descending by date
  return allPress.sort((a, b) => (a.date < b.date ? 1 : -1))
}