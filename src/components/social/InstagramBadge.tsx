/* 
 Этот файл определяет небольшой блок “Instagram”.
 Он показывает иконку и подпись “Instagram” рядом с жирным хэндлом аккаунта.
 По клику человек может открыть профиль ассоциации в новой вкладке.
*/

type InstagramBadgeProps = {
  href: string;
  handle: string;
};

// Этот блок нужен для аккуратной ссылки на Instagram внутри карточек (например, в Hero).
export function InstagramBadge({ href, handle }: InstagramBadgeProps) {
  return (
    <div className="info instagramBadge">
      <a className="instagramBadge-link" href={href} target="_blank" rel="noreferrer">
        <span className="instagramBadge-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8 3H7.2C4.88 3 3 4.88 3 7.2v9.6C3 19.12 4.88 21 7.2 21h9.6c2.32 0 4.2-1.88 4.2-4.2V7.2C21 4.88 19.12 3 16.8 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.4 6.6h.01"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="instagramBadge-text">
          <span className="instagramBadge-label">Instagram</span>
          <span className="instagramBadge-handle">{handle}</span>
        </span>
      </a>
    </div>
  );
}


