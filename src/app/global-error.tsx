/*
 Этот файл определяет общий экран ошибки для всего приложения.
 Он показывает текст критической ошибки и кнопку повторной попытки.
 Человек может нажать кнопку, чтобы заново запустить отрисовку приложения.
*/

"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isProd = process.env.NODE_ENV === "production";
  const message = isProd
    ? "Произошла критическая ошибка приложения. Попробуйте ещё раз."
    : error?.message;

  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 24,
          background: "#f8fafc",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "40px auto",
            padding: 24,
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            background: "#ffffff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Application error</h2>
          <p role="alert" aria-live="polite">
            {message}
          </p>
          {/* По нажатию снова запускаем отрисовку приложения после критической ошибки. */}
          <button
            onClick={() => reset()}
            type="button"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
