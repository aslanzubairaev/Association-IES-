/*
 This file defines a reusable list component for Association IES.
 It replaces default bullets with slim vertical pills.
*/

import type { HTMLAttributes, LiHTMLAttributes } from "react";

import styles from "./IesList.module.css";

const joinClassNames = (...names: Array<string | undefined>) =>
  names.filter(Boolean).join(" ");

export function IesList({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={joinClassNames(styles.iesList, "ies-list", className)}
      {...props}
    />
  );
}

export function IesListItem({
  className,
  ...props
}: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={joinClassNames(styles.iesListItem, "ies-list-item", className)}
      {...props}
    />
  );
}
