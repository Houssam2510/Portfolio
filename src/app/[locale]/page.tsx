import { notFound } from "next/navigation";
import { getContent } from "@/data";
import { isLocale } from "@/i18n/config";
import HomeClient from "./HomeClient";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Le contenu est résolu côté serveur : une seule langue part dans le bundle.
  return <HomeClient content={getContent(locale)} locale={locale} />;
}
