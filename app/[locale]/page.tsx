import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/content/types";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Products } from "@/components/sections/Products";
import { Path } from "@/components/sections/Path";
import { Constellation } from "@/components/sections/Constellation";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} />
      <Manifesto locale={l} />
      <Products locale={l} />
      <Path locale={l} />
      <Constellation locale={l} />
      <Contact />
    </>
  );
}
