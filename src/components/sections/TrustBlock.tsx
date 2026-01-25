/* 
 Этот файл содержит блок доверия на главной странице.
 Он показывает короткие причины, почему организации можно доверять, и что человек получит.
 Здесь можно поменять формулировки и список пунктов, не меняя общий стиль.
*/

import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card/Card";
import { IesList, IesListItem } from "@/components/ui/IesList";
import { trustBlockCopy } from "@/content/actions";
import styles from "./TrustBlock.module.css";

type TrustBlockProps = {
  locale: "ru" | "fr";
};

// Переход секции вниз: выводим фиолетовый блок в общий фон сайта, без розовых оттенков.
const slantPinkStyle = { "--next": "var(--blue-2)" } as CSSProperties;

// Блок доверия: простой список тезисов, двуязычный.
export function TrustBlock({ locale }: TrustBlockProps) {
  const copy = trustBlockCopy[locale];

  return (
    <section className={`section section--purple trust-block ${styles.trustBlock}`} style={slantPinkStyle}>
      <Container>
        <div className="section-head section-head--on-dark">
          <h2 className="h2">{copy.title}</h2>
          <p className="muted-on-dark">{copy.subtitle}</p>
        </div>

        <div className="grid-2">
          <Card hoverable={false}>
            <h3 className="h3">{copy.benefitsTitle}</h3>
            <IesList className="list">
              {copy.points.map((p) => (
                <IesListItem key={p}>{p}</IesListItem>
              ))}
            </IesList>
          </Card>

          <Card className={styles.quoteCard} surface={false} role="note" aria-label={copy.quoteAriaLabel}>
            <p className={styles.quoteCardText}>
              {copy.quoteText}
            </p>
            <p className={styles.quoteCardSign}>{copy.quoteSignature}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}





