/* 
 Этот файл содержит блок доверия на главной странице.
 Он показывает коротлые причины, почему организации можно доверять, и что человек получит.
 Здесь можно поменять формулировки и список пунктов, не меняя общий стиль.
*/

import { Section } from "@/components/ui/Section/Section";
import { InfoCard } from "@/components/ui/Card/InfoCard";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { trustBlockCopy } from "@/content/actions";
import styles from "./TrustBlock.module.css";

type TrustBlockProps = {
  locale: "ru" | "fr";
};

// Блок доверения: простой список тезисов, двуязычный.
export function TrustBlock({ locale }: TrustBlockProps) {
  const copy = trustBlockCopy[locale];

  return (
    <Section
      className="trust-block"
      id="trust"
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div className="grid-2">
        <InfoCard
          title={copy.benefitsTitle}
          items={copy.points}
          hoverable={false}
        // Default surface=true match typical card behavior
        />

        <Card className={styles.quoteCard} surface={false} role="note" aria-label={copy.quoteAriaLabel}>
          <CardContent>
            <p className={styles.quoteCardText}>
              {copy.quoteText}
            </p>
            <p className={styles.quoteCardSign}>{copy.quoteSignature}</p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
