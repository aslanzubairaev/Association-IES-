# Refactor baseline

## Контрольные маршруты (FR + RU)

- /fr
- /fr/aide
- /fr/actions
- /fr/contact
- /fr/soutenir
- /fr/privacy
- /ru
- /ru/aide
- /ru/actions
- /ru/contact
- /ru/soutenir
- /ru/privacy

## Чеклист ручной проверки (desktop + mobile)

- Header sticky (фиксированная шапка при скролле)
- Кнопки: hover/active/disabled состояния
- Формы: input/textarea/select, валидация, отправка
- Grid/карточки: сетка, выравнивание, переполнение
- Футер: расположение, ссылки, контент
- Переключение языка: корректный маршрут и контент
- Редиректы: валидные маршруты, 404 для невалидных

## Импорты стилей в `src/app/[locale]/layout.tsx`

НЕ ТРОГАТЬ без причины. Порядок imports:

1) `import { notFound } from "next/navigation";`
2) `import { Header } from "@/components/layout/Header";`
3) `import Footer from "@/components/layout/Footer";`
