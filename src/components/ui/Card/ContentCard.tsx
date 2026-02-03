/*
  Этот компонент — универсальная карточка контента.
  Используется для стандартизации всех карточек на сайте (О нас, Поддержать, Контакты и т.д.).
  Автоматически обрабатывает: иконку, заголовок, текст, списки и кнопки.
*/

import type { ReactNode } from "react";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";

export type ContentCardAction = {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "accent" | "pill" | "mint";
    target?: string;
    rel?: string;
    icon?: ReactNode;
    className?: string;
};

type ContentCardProps = {
    // Внешний вид
    className?: string;
    highlight?: boolean; // Добавляет желтую обводку/тень (акцент)
    paper?: boolean; // Белый фон (по умолчанию true)
    hoverable?: boolean;
    id?: string;

    // Шапка
    icon?: ReactNode;
    title?: string;
    subtitle?: ReactNode;
    badges?: ReactNode;

    // Контент
    description?: string | string[] | ReactNode;
    listItems?: string[]; // Простой список строк
    children?: ReactNode; // Дополнительный кастомный контент

    // Подвал / Действия
    footerText?: string;
    actions?: ContentCardAction[]; // Массив кнопок
    actionsNode?: ReactNode; // Если нужна сложная верстка кнопок
};

export function ContentCard({
    className,
    highlight,
    paper = true,
    hoverable = true,
    icon,
    title,
    subtitle,
    badges,
    description,
    listItems,
    children,
    footerText,
    actions,
    actionsNode,
    id,
}: ContentCardProps) {

    // Собираем классы
    const classes = [
        className,
        paper && "card--paper",
        highlight && "card--highlight",
    ].filter(Boolean).join(" ");

    return (
        <Card className={classes} hoverable={hoverable} as="article" id={id}>
            {(title || icon || badges) && (
                <CardHeader className={icon ? "card-top" : ""}>
                    <div style={{ flex: 1 }}>
                        {/* Иконка и Заголовок */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            {icon && <span style={{ display: "flex" }}>{icon}</span>}
                            {title && <h3 className="h3 h3--blue">{title}</h3>}
                        </div>

                        {/* Подзаголовок */}
                        {subtitle && <p className="muted">{subtitle}</p>}
                    </div>

                    {/* Бейджи (справа сверху, если есть иконка layout) */}
                    {badges && <div className="tag-row">{badges}</div>}
                </CardHeader>
            )}

            <CardContent>
                {/* Описание (строка, массив строк или нода) */}
                {description && (
                    <div className="card-description">
                        {Array.isArray(description) ? (
                            description.map((text, i) => (
                                <p key={i} className="p" style={{ marginBottom: 10 }}>
                                    {text}
                                </p>
                            ))
                        ) : typeof description === "string" ? (
                            <p className="p">{description}</p>
                        ) : (
                            description
                        )}
                    </div>
                )}

                {/* Список */}
                {listItems && listItems.length > 0 && (
                    <IesList className="list" style={{ marginTop: description ? 12 : 0 }}>
                        {listItems.map((item) => (
                            <IesListItem key={item}>{item}</IesListItem>
                        ))}
                    </IesList>
                )}

                {/* Кастомный контент */}
                {children}
            </CardContent>

            {/* Футер: текст и кнопки */}
            {(footerText || (actions && actions.length > 0) || actionsNode) && (
                <CardFooter style={{ marginTop: 24 }}>
                    {footerText && (
                        <p className="fineprint muted" style={{ marginBottom: 16 }}>
                            {footerText}
                        </p>
                    )}

                    {/* Кнопки */}
                    {(actions || actionsNode) && (
                        <div className="btn-row">
                            {actions?.map((action, i) => (
                                <Button
                                    key={i}
                                    variant={action.variant || "primary"}
                                    href={action.href}
                                    target={action.target}
                                    rel={action.rel}
                                    className={action.className}
                                >
                                    {action.label}
                                    {action.icon}
                                </Button>
                            ))}
                            {actionsNode}
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
