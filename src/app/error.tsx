/*
 Этот файл определяет экран ошибки для текущего маршрута.
 Он показывает текст ошибки и кнопку повторной попытки.
 Человек может нажать кнопку, чтобы заново открыть этот же экран после сбоя.
*/

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isProd = process.env.NODE_ENV === "production";
  const message = isProd
    ? "Произошла ошибка. Попробуйте ещё раз."
    : error?.message;

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#ffffff",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
      <p role="alert" aria-live="polite">
        {message}
      </p>
      {/* По нажатию запускаем повторную попытку загрузить текущий экран после ошибки. */}
      <button
        onClick={() => reset()}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
