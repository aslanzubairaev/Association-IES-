/*
  This component is a universal content card.
  Used to standardize all cards across the site (About, Support, Contact, etc.).
  Automatically handles: icon, title, text, lists, and buttons.
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
    // Appearance
    className?: string;
    highlight?: boolean; // Adds a yellow border/shadow (accent)
    paper?: boolean; // White background (default true)
    hoverable?: boolean;
    id?: string;

    // Header
    icon?: ReactNode;
    title?: string;
    subtitle?: ReactNode;
    badges?: ReactNode;

    // Content
    description?: string | string[] | ReactNode;
    listItems?: string[]; // Simple list of strings
    children?: ReactNode; // Additional custom content

    // Footer / Actions
    footerText?: string;
    actions?: ContentCardAction[]; // Array of buttons
    actionsNode?: ReactNode; // For complex button layouts
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

    // Build class list
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
                        {/* Icon and Title */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            {icon && <span style={{ display: "flex" }}>{icon}</span>}
                            {title && <h3 className="h3 h3--blue">{title}</h3>}
                        </div>

                        {/* Subtitle */}
                        {subtitle && <p className="muted">{subtitle}</p>}
                    </div>

                    {/* Badges (top-right when icon layout is present) */}
                    {badges && <div className="tag-row">{badges}</div>}
                </CardHeader>
            )}

            <CardContent>
                {/* Description (string, array of strings, or ReactNode) */}
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

                {/* List */}
                {listItems && listItems.length > 0 && (
                    <IesList className="list" style={{ marginTop: description ? 12 : 0 }}>
                        {listItems.map((item) => (
                            <IesListItem key={item}>{item}</IesListItem>
                        ))}
                    </IesList>
                )}

                {/* Custom content */}
                {children}
            </CardContent>

            {/* Footer: text and buttons */}
            {(footerText || (actions && actions.length > 0) || actionsNode) && (
                <CardFooter style={{ marginTop: 24 }}>
                    {footerText && (
                        <p className="fineprint muted" style={{ marginBottom: 16 }}>
                            {footerText}
                        </p>
                    )}

                    {/* Buttons */}
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
