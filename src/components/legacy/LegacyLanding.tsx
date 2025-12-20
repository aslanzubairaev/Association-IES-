/* 
 Этот файл содержит перенесённый лендинг из старого HTML.
 Он показывает те же секции и блоки, что и в legacy/index.html (только содержимое body).
 Человек может листать страницу, нажимать кнопки и переходить по разделам через якорные ссылки.
*/

import type { CSSProperties } from "react";
import Script from "next/script";

const slantPurpleStyle = { "--next": "var(--purple)" } as CSSProperties;
const slantPinkStyle = { "--next": "var(--pink)" } as CSSProperties;
const slantPink2Style = { "--next": "var(--pink-2)" } as CSSProperties;
const slantBlueStyle = { "--next": "var(--blue)" } as CSSProperties;
const slantYellowStyle = { "--next": "var(--yellow)" } as CSSProperties;

// Основная разметка лендинга 1-в-1 с legacy/index.html (body).
export function LegacyLanding() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Association IES">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Association IES</span>
          </a>

          <nav className="nav">
            <a href="#about">О нас</a>
            <a href="#help">Чем помогаем</a>
            <a href="#actions">Наши действия</a>
            <a href="#how">Как обратиться</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <div className="header-cta">
            <a className="btn btn--pill btn--yellow" href="#how">
              получить помощь
            </a>
            <a className="btn btn--pill btn--outline-white" href="#contacts">
              связаться
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section
          className="section section--purple slant slant--to-blue"
          style={slantPurpleStyle}
        >
          <div className="container hero-grid">
            <div className="card card--glass hero-left">
              <div className="chips">
                <span className="chip">Страсбург • Франция</span>
                <span className="chip">Локально</span>
                <span className="chip">Опыт и экспертиза</span>
              </div>

              <h1 className="h1">
                Наша цель — помочь людям
                <br />
                адаптироваться во Франции
              </h1>

              <p className="lead">
                Документы, работа, обучение и поддержка в Страсбурге — подскажем
                понятный следующий шаг и поможем пройти процесс без лишней
                бюрократии.
              </p>

              <div className="actions">
                <a className="btn btn--pill btn--yellow" href="#how">
                  получить помощь
                </a>
                <a className="btn btn--pill btn--mint" href="#how">
                  как обратиться
                </a>
                <a className="btn btn--pill btn--outline" href="#contacts">
                  контакты
                </a>
              </div>

              <div className="pill-row" aria-label="ключевые слова">
                <span className="pill">интеграция</span>
                <span className="pill">образование</span>
                <span className="pill">синергия</span>
              </div>
            </div>

            <aside className="card card--yellow hero-right">
              <div className="tag-row">
                <span className="tag tag--blue">+200 проектов</span>
                <span className="tag tag--blue">с 2019</span>
              </div>

              <h3 className="h3">быстрые контакты</h3>

              <div className="info-stack">
                <div className="info">
                  <div className="info-k">Телефон</div>
                  <div className="info-v">+33 6 32 66 07 38</div>
                </div>
                <div className="info">
                  <div className="info-k">Instagram</div>
                  <div className="info-v">@ies_info</div>
                </div>
                <div className="info">
                  <div className="info-k">Контакт</div>
                  <div className="info-v">Akhmed Susuev</div>
                </div>
              </div>

              <div className="hero-slogan" aria-label="ключевые слова">
                интеграция
                <br />
                образование
                <br />
                синергия
              </div>

              <div className="mini-actions">
                <a className="btn btn--pill btn--blue" href="#contacts">
                  написать
                </a>
                <a className="btn btn--pill btn--outline-blue" href="#help">
                  направления
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="about"
          className="section section--purple slant slant--to-pink"
          style={slantPinkStyle}
        >
          <div className="container">
            <div className="section-head section-head--on-dark">
              <h2 className="h2">о нас</h2>
              <p className="muted-on-dark">
                Коротко и по делу: кто вы, чем занимаетесь и почему вам можно
                доверять.
              </p>
            </div>

            <div className="grid-2">
              <div className="card card--glass accent-left">
                <h3 className="h3">наша цель</h3>
                <p className="p">
                  Мы помогаем людям адаптироваться во Франции: разобраться с
                  документами, учёбой, работой и поддержкой в повседневных
                  вопросах.
                </p>
                <ul className="list">
                  <li>Понятно объясняем шаги и помогаем с процессом</li>
                  <li>Работаем локально (Страсбург)</li>
                  <li>Стараемся делать всё максимально человечески</li>
                </ul>
              </div>

              <div className="card card--glass accent-left">
                <h3 className="h3">как мы работаем</h3>
                <ul className="list">
                  <li>Вы связываетесь с нами удобным способом</li>
                  <li>Коротко описываете ситуацию</li>
                  <li>
                    Мы подсказываем следующий шаг
                    (консультация/встреча/сопровождение)
                  </li>
                </ul>
                <p className="note">
                  Точные условия (по записи/бесплатно/время работы) добавим после
                  подтверждения.
                </p>

                <div className="focus">
                  <div className="focus-title">главный фокус</div>
                  <div className="focus-text">
                    Помощь беженцам и новым прибывшим — документы, работа,
                    обучение и поддержка.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="help"
          className="section section--pink slant slant--to-blue"
          style={slantPink2Style}
        >
          <div className="container">
            <div className="section-head">
              <h2 className="h2 h2--blue">чем мы помогаем</h2>
              <p className="muted">
                Основные направления. Тексты можно заменить на точные
                формулировки клиента.
              </p>
            </div>

            <div className="cards-grid">
              <article className="card card--paper accent-left accent--blue">
                <header className="card-top">
                  <h3 className="h3 h3--blue">административные вопросы</h3>
                  <span className="tag tag--red">поддержка</span>
                </header>
                <p className="p">
                  Документы, обращения, помощь в разборе шагов и сопровождение
                  (уточним список).
                </p>
              </article>

              <article className="card card--paper accent-left accent--blue">
                <header className="card-top">
                  <h3 className="h3 h3--blue">образование и мероприятия</h3>
                  <span className="tag tag--red">в течение года</span>
                </header>
                <p className="p">
                  Встречи, объяснение системы, полезные мероприятия и поддержка
                  семей.
                </p>
              </article>

              <article className="card card--paper accent-left accent--blue">
                <header className="card-top">
                  <h3 className="h3 h3--blue">поиск работы</h3>
                  <span className="tag tag--red">помощь</span>
                </header>
                <p className="p">
                  Резюме, мотивационные письма, советы по шагам и подготовке
                  (уточним формат).
                </p>
              </article>

              <article className="card card--paper accent-left accent--blue">
                <header className="card-top">
                  <h3 className="h3 h3--blue">уроки языка</h3>
                  <span className="tag tag--red">для детей</span>
                </header>
                <p className="p">
                  Возраст, группы, место и расписание добавим после уточнения.
                </p>
              </article>

              <article className="card card--paper accent-left accent--blue">
                <header className="card-top">
                  <h3 className="h3 h3--blue">межкультурные встречи</h3>
                  <span className="tag tag--red">общение</span>
                </header>
                <p className="p">Тёплые встречи, знакомство культур и поддержка.</p>
              </article>

              <article className="card card--paper accent-left accent--blue">
                <header className="card-top">
                  <h3 className="h3 h3--blue">сад в Страсбурге</h3>
                  <span className="tag tag--red">проект</span>
                </header>
                <p className="p">
                  Овощи, яблочный сок и участие в проекте сада (условия уточним).
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="actions"
          className="section section--pink-2 slant slant--to-blue"
          style={slantBlueStyle}
        >
          <div className="container">
            <div className="section-head">
              <h2 className="h2 h2--blue">наши действия</h2>
              <p className="muted">
                Программы и активности, которые развивают навыки, создают связь и
                помогают людям интегрироваться.
              </p>
            </div>

            <div className="actions-layout">
              <div className="actions-cards" aria-label="программы и направления">
                <article className="card card--paper accent-left accent--blue action-card">
                  <header className="action-head">
                    <h3 className="h3 h3--blue">сад и совместные мастер‑классы</h3>
                    <span className="badge badge--red">в течение года</span>
                  </header>
                  <p className="p">
                    Общий сад, занятия на природе и тёплые встречи для детей и
                    взрослых (условия уточним).
                  </p>
                </article>

                <article className="card card--paper accent-left accent--blue action-card">
                  <header className="action-head">
                    <h3 className="h3 h3--blue">административные консультации</h3>
                    <span className="badge badge--red">по записи</span>
                  </header>
                  <p className="p">
                    Поддержка по документам и маршрутам: что делать дальше, куда
                    обращаться, какие шаги нужны.
                  </p>
                </article>

                <article className="card card--paper accent-left accent--blue action-card">
                  <header className="action-head">
                    <h3 className="h3 h3--blue">сопровождение к работе</h3>
                    <span className="badge badge--red">по записи</span>
                  </header>
                  <p className="p">
                    Резюме, мотивационные письма, подготовка к собеседованию и
                    помощь с планом действий.
                  </p>
                </article>

                <article className="card card--paper accent-left accent--blue action-card">
                  <header className="action-head">
                    <h3 className="h3 h3--blue">языковые занятия</h3>
                    <span className="badge badge--red">1 раз в неделю</span>
                  </header>
                  <p className="p">
                    Группы и формат уточним: цель — поддержать обучение и
                    уверенность в повседневном общении.
                  </p>
                </article>

                <article className="card card--paper accent-left accent--blue action-card">
                  <header className="action-head">
                    <h3 className="h3 h3--blue">спорт и поддержка подростков</h3>
                    <span className="badge badge--red">регулярно</span>
                  </header>
                  <p className="p">
                    Активности для укрепления здоровья, дисциплины и социализации
                    (расписание уточним).
                  </p>
                </article>

                <article className="card card--paper accent-left accent--blue action-card">
                  <header className="action-head">
                    <h3 className="h3 h3--blue">культурные встречи и выезды</h3>
                    <span className="badge badge--red">в течение года</span>
                  </header>
                  <p className="p">
                    Мероприятия, экскурсии и встречи для знакомства с городом и
                    местными сообществами.
                  </p>
                </article>
              </div>

              <aside className="actions-side" aria-label="почему это работает">
                <div className="card card--paper actions-strength">
                  <h3 className="h3 h3--blue">что делает IES сильнее</h3>
                  <ul className="bullet-list">
                    <li>
                      Человеческий подход и работа “на земле”, рядом с реальными
                      потребностями
                    </li>
                    <li>Активная сеть волонтёров и экспертов</li>
                    <li>Партнёрства с местными центрами и организациями</li>
                    <li>Сильная вовлечённость в районы и сообщества</li>
                  </ul>
                </div>

                <div className="quote-card" role="note" aria-label="цитата">
                  <p className="quote-card__text">
                    “Наша миссия — открыть пути. Помочь каждому найти своё место,
                    здесь и сейчас.”
                  </p>
                  <p className="quote-card__sign">Association IES</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="how"
          className="section section--blue slant slant--to-yellow"
          style={slantYellowStyle}
        >
          <div className="container">
            <div className="section-head section-head--on-dark">
              <h2 className="h2">как обратиться за помощью</h2>
              <p className="muted-on-dark">
                Главный блок на сайте: коротко, понятно, без лишней бюрократии.
              </p>
            </div>

            <div className="grid-2">
              <article className="card card--glass accent-left">
                <div className="step">
                  <span className="step-num">1</span>
                  <h3 className="h3">свяжитесь с нами</h3>
                </div>
                <p className="p p--on-dark">
                  Телефон / WhatsApp / Instagram / форма на сайте — выберите как
                  удобно.
                </p>
              </article>

              <article className="card card--glass accent-left">
                <div className="step">
                  <span className="step-num">2</span>
                  <h3 className="h3">опишите ситуацию</h3>
                </div>
                <p className="p p--on-dark">
                  Коротко: что случилось и какая помощь нужна. Мы уточним детали.
                </p>
              </article>

              <article className="card card--glass accent-left">
                <div className="step">
                  <span className="step-num">3</span>
                  <h3 className="h3">получите следующий шаг</h3>
                </div>
                <p className="p p--on-dark">
                  Консультация, встреча или сопровождение — подскажем, что делать
                  дальше.
                </p>
              </article>

              <article className="card card--glass accent-left">
                <div className="step">
                  <span className="step-ico">!</span>
                  <h3 className="h3">важно</h3>
                </div>
                <p className="p p--on-dark">
                  Точные условия (по записи/бесплатно/время работы) добавим после
                  подтверждения.
                </p>
              </article>
            </div>

            <div className="quote card card--glass">
              <p className="quote-text">
                “Наша миссия — открыть пути. Помочь каждому найти своё место, здесь
                и сейчас.”
              </p>
              <p className="quote-sign">Akhmed Susuev</p>
            </div>
          </div>
        </section>

        <section id="contacts" className="section section--yellow">
          <div className="container">
            <div className="section-head">
              <h2 className="h2 h2--blue">контакты</h2>
              <p className="muted">
                Сделаем так, чтобы человеку было проще связаться с вами в один
                клик.
              </p>
            </div>

            <div className="grid-2">
              <div className="card card--paper">
                <div className="btn-row">
                  <a className="btn btn--pill btn--blue" href="#">
                    позвонить
                  </a>
                  <a className="btn btn--pill btn--purple" href="#">
                    instagram
                  </a>
                  <a className="btn btn--pill btn--outline-blue" href="#how">
                    как обратиться
                  </a>
                </div>

                <div className="contact-box">
                  <div>
                    <b>Телефон:</b> +33 6 32 66 07 38
                  </div>
                  <div>
                    <b>Instagram:</b> @ies_info
                  </div>
                  <div>
                    <b>Адрес / часы:</b> Уточним после ответа (можно добавить
                    район/адрес и время приёма).
                  </div>
                </div>
              </div>

              <form className="card card--paper form">
                <h3 className="h3 h3--blue">написать сообщение</h3>

                <div className="form-grid">
                  <label className="field">
                    <span>Имя</span>
                    <input type="text" placeholder="Ваше имя" />
                  </label>

                  <label className="field">
                    <span>Телефон или email</span>
                    <input type="text" placeholder="+33... или email" />
                  </label>

                  <label className="field field--full">
                    <span>Сообщение</span>
                    <textarea rows={5} placeholder="Коротко опишите ваш вопрос..." />
                  </label>
                </div>

                <button className="btn btn--pill btn--blue" type="button">
                  отправить (demo)
                </button>

                <p className="fineprint">
                  *Это демо-форма: сейчас просто показывает сообщение об “успешной
                  отправке”. Позже подключим отправку (email / WhatsApp / сервер).
                </p>
              </form>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div>© 2025 Association IES</div>
            <div className="footer-links">
              <a href="#">Mentions légales (позже)</a>
              <a href="#">Confidentialité (позже)</a>
            </div>
          </div>
        </footer>
      </main>

      <Script id="legacy-demo-submit" strategy="afterInteractive">
        {`document.querySelector('.form button')?.addEventListener('click', () => {
  alert('Демо: сообщение “отправлено”.');
});`}
      </Script>
    </>
  );
}




