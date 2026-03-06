/*
 This file contains a universal content wrapper.
 It constrains the width and applies standard padding matching the current design.
 Only the outer class or additional container attributes need to be changed here.
*/

import type { ReactNode } from "react";

// Shared container that mirrors the width and padding from legacy styles.
export function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}





