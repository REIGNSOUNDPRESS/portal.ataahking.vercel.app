// src/app/press/[slug]/page.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Head from 'next/head'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const pressDir = path.join(process.cwd(), 'src/press')
  const files = fs.readdirSync(pressDir).filter(f => f.endsWith('.md'))

  return files.map(fileName => ({
    slug: fileName.replace(/\.md$/, ''),
  }))
}

export default function PressPage({ params }: Props) {
  const { slug } = params
  const filePath = path.join(process.cwd(), 'src/press', `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const url = `https://portal.ataahking.vercel.app/press/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": data.title,
    "datePublished": data.date,
    "author": {
      "@type": "Organization",
      "name": "Reignsound Press"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reignsound Press",
      "logo": {
        "@type": "ImageObject",
        "url": "https://portal.ataahking.vercel.app/logo.png"
      }
    },
    "description": data.summary,
    "mainEntityOfPage": url
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.summary} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="p-8 bg-black text-white min-h-screen">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-gray-400 mt-1">{data.date}</p>
        <div className="mt-6 prose prose-invert">{content}</div>
      </main>
    </>
  )
}