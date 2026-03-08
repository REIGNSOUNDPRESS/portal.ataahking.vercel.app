import { getAllPress, PressRelease } from '../lib/press'

type Props = {
  year?: number
  displayLimit?: number
}

export default function PressList({ year, displayLimit = 50 }: Props) {
  const currentYear = year || new Date().getFullYear()
  let allPress: PressRelease[] = getAllPress({ year: currentYear })

  // Sort descending by date (already handled in getAllPress)
  // Limit displayed releases
  const displayPress = allPress.slice(0, displayLimit)

  if (!displayPress.length)
    return <p className="text-gray-400">No press releases yet.</p>

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Press Releases {currentYear}</h2>
      <ul className="space-y-4">
        {displayPress.map((p) => (
          <li
            key={p.slug}
            className="border border-gray-700 p-4 rounded-md hover:bg-gray-900 transition"
          >
            <p className="text-gray-400 text-sm">{p.date}</p>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-gray-300">{p.summary}</p>
            <a
              href={`/press/${p.slug}`}
              className="mt-2 inline-block text-blue-400 hover:underline"
            >
              Read Release →
            </a>
          </li>
        ))}
      </ul>

      {allPress.length > displayLimit && (
        <div className="mt-4">
          <a
            href={`/press/archive/${currentYear}`}
            className="text-blue-400 hover:underline"
          >
            Show all {currentYear} releases →
          </a>
        </div>
      )}
    </section>
  )
}