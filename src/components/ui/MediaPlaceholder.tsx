/* 
 Этот файл содержит простой “серый блок” для будущих фото или видео.
 Он показывает прямоугольник с подписью, чтобы сейчас было видно место для медиа.
 Здесь можно поменять размеры и текст подписи, когда появятся настоящие материалы.
*/

import type { CSSProperties } from "react";

type MediaPlaceholderProps = {
  title: string;
  height?: number;
};

// Простой блок-заглушка для медиа, чтобы страницы выглядели аккуратно уже сейчас.
export function MediaPlaceholder({ title, height = 220 }: MediaPlaceholderProps) {
  const boxStyle: CSSProperties = {
    width: "100%",
    height,
    borderRadius: 16,
    border: "2px dashed rgba(11,27,51,.25)",
    background: "rgba(11,27,51,.06)",
    display: "grid",
    placeItems: "center",
    padding: 16,
    color: "rgba(11,27,51,.7)",
    textAlign: "center",
    fontWeight: 700,
  };

  return <div style={boxStyle}>{title}</div>;
}





