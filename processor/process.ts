/**
 * Processor for The Irish Pub RD Instagram content.
 * Reads output/raw.json, assigns categories, and writes output/content.json
 *
 * Usage: npx ts-node processor/process.ts
 */

import * as fs from "fs";
import * as path from "path";

interface RawPost {
  id: string;
  type: "image" | "video";
  media: string;
  caption: string;
  date: string;
  likes: number;
  hashtags: string[];
  category: string;
}

interface RawProfile {
  username: string;
  full_name: string;
  bio: string;
  followers: number;
  post_count: number;
  avatar: string;
  external_url: string;
}

interface RawData {
  profile: RawProfile;
  posts: RawPost[];
}

interface ProcessedPost extends RawPost {
  category: string;
}

interface ContentJson {
  profile: RawProfile;
  posts: ProcessedPost[];
  categories: string[];
}

// Irish pub category keywords
const CATEGORY_RULES: Record<string, string[]> = {
  eventos: [
    "evento", "event", "live", "música", "musica", "banda", "band",
    "tribute", "tributo", "noche", "night", "show", "concierto", "concert",
    "linkin", "tool", "foo", "rock", "metal", "acoustic", "acustico",
    "party", "fiesta", "halloween", "navidad", "christmas", "new year",
    "san patrick", "st. patrick", "copa", "mundial", "superbowl", "game",
  ],
  bebidas: [
    "beer", "cerveza", "guinness", "craft", "cocktail", "coctel",
    "whiskey", "whisky", "jameson", "shots", "drink", "bebida",
    "bar", "brew", "tap", "draught", "pinta", "pint", "green beer",
  ],
  comida: [
    "food", "comida", "menu", "kitchen", "burger", "hamburguesa",
    "nachos", "fish", "chips", "shepherd", "wings", "alitas",
    "brunch", "lunch", "dinner", "cena", "almuerzo", "snack",
  ],
  marcas: [
    "guinness", "jameson", "heineken", "corona", "modelo", "budweiser",
    "stella", "ballantine", "jack daniel", "johnnie walker", "smirnoff",
    "patron", "absolut", "bacardi", "red bull", "angostura",
  ],
  deportes: [
    "futbol", "football", "soccer", "nfl", "mlb", "nba", "ufc",
    "premier", "champions", "liga", "world cup", "copa", "partido",
    "match", "game", "semifinal", "final", "playoffs",
  ],
};

function assignCategory(post: RawPost): string {
  const text = (post.caption + " " + post.hashtags.join(" ")).toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return category;
    }
  }

  return "general";
}

function process(): void {
  const rawPath = path.join("output", "raw.json");

  if (!fs.existsSync(rawPath)) {
    console.error(
      "ERROR: output/raw.json not found. Run the scraper first:\n  python scraper/download.py theirishpubrd"
    );
    process.exit(1);
  }

  const raw: RawData = JSON.parse(
    fs.readFileSync(rawPath, { encoding: "utf-8" })
  );

  const processedPosts: ProcessedPost[] = raw.posts.map((post) => ({
    ...post,
    category: assignCategory(post),
  }));

  // Collect unique categories present in data
  const categoriesSet = new Set(processedPosts.map((p) => p.category));
  const categories = Array.from(categoriesSet).sort();

  const content: ContentJson = {
    profile: raw.profile,
    posts: processedPosts,
    categories,
  };

  const outputPath = path.join("output", "content.json");
  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2), {
    encoding: "utf-8",
  });

  console.log(`[+] Processed ${processedPosts.length} posts`);
  console.log(`[+] Categories found: ${categories.join(", ")}`);
  console.log(`[+] content.json written to ${outputPath}`);
  console.log(
    `[+] Copy output/content.json and output/media/ to frontend/public/ to use in the site`
  );
}

process();
