import en from "@/langs/en.json";
import fr from "@/langs/fr.json";
import de from "@/langs/de.json";
import ru from "@/langs/ru.json";

const dictionaries: Record<string, typeof en> = {
  en,
  fr,
  de,
  ru,
};

export function getDictionary(locale: string = "en") {
  return dictionaries[locale] || dictionaries.en;
}

export type Dictionary = typeof en;
