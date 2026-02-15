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
  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong</h2>
      <p>{error?.message}</p>
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
