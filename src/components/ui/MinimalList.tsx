import styles from "./MinimalList.module.css";

type MinimalListProps = {
  items: string[];
  className?: string;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MinimalList({ items, className }: MinimalListProps) {
  return (
    <ul className={cn(styles.list, className)}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
