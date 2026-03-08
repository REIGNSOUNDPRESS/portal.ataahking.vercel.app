return (
  <div className="space-y-6">

    {events.map((event) => (
      <div
        key={event.id}
        className="border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition"
      >

        <h3 className="text-lg font-medium text-white">
          {event.summary}
        </h3>

        <p className="text-sm text-neutral-400 mt-1">
          {formatDate(event.start)}
        </p>

        <p className="text-sm text-neutral-500">
          {formatTime(event.start)} – {formatTime(event.end)}
        </p>

        {event.description && (
          <p className="text-neutral-300 mt-4 leading-relaxed">
            {event.description}
          </p>
        )}

      </div>
    ))}

  </div>
)
