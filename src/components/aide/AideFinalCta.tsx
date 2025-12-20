/* 
 Этот файл содержит финальный блок с призывом написать нам на странице “Aide / Помощь”.
 Он показывает короткую фразу “готовы начать?” и кнопку перехода к странице контактов.
 Человек нажимает кнопку и описывает ситуацию через форму на странице contact.
*/

import Link from "next/link";
import { Container } from "@/components/ui/Container";

type AideFinalCtaProps = {
  locale: "ru" | "fr";
};

// Финальный блок: аккуратно напоминает “напишите нам” и не добавляет личных контактов.
export function AideFinalCta({ locale }: AideFinalCtaProps) {
  const text =
    locale === "fr"
      ? "Prêt à commencer ? Écrivez-nous — on répond par e-mail."
      : "Готовы начать? Напишите нам — ответим по e-mail.";
  const buttonLabel = locale === "fr" ? "Nous contacter" : "Написать";

  return (
    <section className="section section--yellow" id="contact">
      <Container>
        {/* Простой CTA: один текст и одна кнопка, чтобы человеку не нужно было искать следующий шаг. */}
        <div className="card card--paper card--highlight">
          <h2 className="h2 h2--blue">{text}</h2>
          <div style={{ marginTop: 14 }}>
            <Link className="btn btn--pill btn--blue" href={`/${locale}/contact`}>
              {buttonLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


