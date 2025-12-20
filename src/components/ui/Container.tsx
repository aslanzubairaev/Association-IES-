/* 
 Этот файл содержит универсальную обёртку для контента.
 Он ограничивает ширину и даёт стандартные отступы, как в текущем дизайне.
 Здесь можно поменять только внешний класс или добавить дополнительные атрибуты контейнера.
*/

import type { ReactNode } from "react";

// Общий контейнер, который повторяет ширину и отступы из legacy-стилей.
export function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}




