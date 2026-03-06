/*
 This component is a universal page section.
 It applies proper spacing and centers the content.
 The background is set at the page level (in the app layout or page CSS module).
*/

import { type CSSProperties, type ReactNode, type ElementType } from "react";
import { Container } from "@/components/ui/Container";
import styles from "./Section.module.css";

type SectionProps = {
    className?: string;
    children: ReactNode;

    // Optional eyebrow label above the title (small caps tag)
    eyebrow?: string;
    // Section title and subtitle (optional)
    title?: string;
    subtitle?: ReactNode;
    // HTML tag for the title (defaults to h2, but can be h1 for Hero)
    titleAs?: ElementType;

    // ID for anchor links
    id?: string;

    // Semantic tag for the section itself (e.g., main)
    as?: ElementType;

    // Additional styles
    style?: CSSProperties;
};

export function Section({
    className,
    children,
    eyebrow,
    title,
    subtitle,
    titleAs: TitleComponent = "h2",
    id,
    as: Component = "section",
    style,
}: SectionProps) {

    const combinedClasses = [
        "section",
        className
    ].filter(Boolean).join(" ");

    return (
        <Component className={combinedClasses} id={id} style={style}>
            <Container>
                {(eyebrow || title || subtitle) && (
                    <div className="section-head">
                        {eyebrow && (
                            <span className={styles.eyebrow}>{eyebrow}</span>
                        )}
                        {title && (
                            <TitleComponent className="h2 h2--blue">
                                {title}
                            </TitleComponent>
                        )}
                        {subtitle && (
                            <p className="muted">
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
