/*
 Этот компонент — универсальная секция для страницы.
 Он задаёт правильные отступы и выравнивает контент по центру.
 Фон задаётся на уровне страницы (в app layout или css модуля страницы).
*/

import { type CSSProperties, type ReactNode, type ElementType } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = {
    className?: string;
    children: ReactNode;

    // Заголовок и подзаголовок секции (опционально)
    title?: string;
    subtitle?: ReactNode;
    // Тег для заголовка (по умолчанию h2, но может быть h1 для Hero)
    titleAs?: ElementType;

    // ID для якорных ссылок
    id?: string;

    // Семантический тег самой секции (например, main)
    as?: ElementType;

    // Принудительно включить "тёмный режим" (белый текст)
    inverse?: boolean;

    // Дополнительные стили
    style?: CSSProperties;
};

export function Section({
    className,
    children,
    title,
    subtitle,
    titleAs: TitleComponent = "h2",
    id,
    as: Component = "section",
    inverse = false,
    style,
}: SectionProps) {

    const combinedClasses = [
        "section",
        className
    ].filter(Boolean).join(" ");

    // Определяем, тёмный ли фон (для белого текста)
    const isDark = inverse;

    return (
        <Component className={combinedClasses} id={id} style={style}>
            <Container>
                {(title || subtitle) && (
                    <div className={`section-head ${isDark ? "section-head--on-dark" : ""}`}>
                        {title && (
                            <TitleComponent className={`h2 ${!isDark ? "h2--blue" : ""}`}>
                                {title}
                            </TitleComponent>
                        )}
                        {subtitle && (
                            <p className={isDark ? "muted-on-dark" : "muted"}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </Container>
        </Component>
    );
}
