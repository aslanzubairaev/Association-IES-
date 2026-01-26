/*
 Универсальная информационная карточка.
 Подходит для отображения списка преимуществ, тем или краткой информации с кнопкой.
*/

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent, CardFooter, CardHeader } from "./Card";
import { IesList, IesListItem } from "@/components/ui/IesList";

type InfoCardProps = {
    title: string;
    className?: string;

    // Контент
    items?: string[]; // Список буллитов
    text?: string | string[]; // Текст (один абзац или массив)
    children?: ReactNode; // Произвольный контент

    // Подвал
    footerText?: string;
    ctaLabel?: string;
    ctaHref?: string;
    ctaVariant?: "primary" | "secondary" | "accent" | "pill"; // pill is custom

    // Настройки стиля
    hoverable?: boolean;
    surface?: boolean;
};

export function InfoCard({
    title,
    className,
    items,
    text,
    children,
    footerText,
    ctaLabel,
    ctaHref,
    ctaVariant = "pill",
    hoverable = true,
    surface = true,
}: InfoCardProps) {
    return (
        <Card className={className} hoverable={hoverable} surface={surface} as="article">
            <CardHeader>
                <h3 className="h3 h3--blue">{title}</h3>
            </CardHeader>

            <CardContent>
                {text && (
                    Array.isArray(text) ? (
                        text.map((t, i) => <p key={i} className="p" style={{ marginBottom: 10 }}>{t}</p>)
                    ) : (
                        <p className="p">{text}</p>
                    )
                )}

                {items && items.length > 0 && (
                    <IesList className="list">
                        {items.map((item) => (
                            <IesListItem key={item}>{item}</IesListItem>
                        ))}
                    </IesList>
                )}

                {children}
            </CardContent>

            {(footerText || (ctaLabel && ctaHref)) && (
                <CardFooter>
                    {footerText && (
                        <p className="fineprint muted" style={{ marginBottom: ctaLabel ? 12 : 0 }}>
                            {footerText}
                        </p>
                    )}

                    {ctaLabel && ctaHref && (
                        <div style={{ marginTop: 8 }}>
                            {ctaVariant === "pill" ? (
                                // Fallback to direct Link for pill style if Button doesn't support it strictly
                                // OR assuming Button doesn't have "pill" variant in typings yet.
                                // Let's check Button typings. It has primary/secondary/accent.
                                // We'll keep the Link implementation for "pill" to ensure backward compat.
                                <a className="btn btn--pill btn--blue" href={ctaHref}>
                                    {ctaLabel}
                                </a>
                            ) : (
                                <Button variant={ctaVariant} href={ctaHref}>
                                    {ctaLabel}
                                </Button>
                            )}
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
