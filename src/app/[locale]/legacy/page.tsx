/* 
 Этот файл задаёт страницу-эталон со старым лендингом.
 Он показывает LegacyLanding без изменений, чтобы можно было сравнивать с исходным HTML.
 Здесь ничего не нужно менять, кроме случая когда эталон обновится.
*/

import { LegacyLanding } from "@/components/legacy/LegacyLanding";

// Эталонная страница: только старый лендинг.
export default function LegacyPage() {
  return <LegacyLanding />;
}





