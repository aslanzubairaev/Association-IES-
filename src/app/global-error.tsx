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
  return (
    <html>
      <body style={{ padding: 24 }}>
        <h2>Application error</h2>
        <p>{error?.message}</p>
        {/* По нажатию снова запускаем отрисовку приложения после критической ошибки. */}
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
