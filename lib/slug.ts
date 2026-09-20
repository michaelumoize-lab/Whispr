import { PersonalLink } from "@/database/models/PersonalLink";
import { getDb } from "@/lib/db";

/**
 * Normalizes a display name into a clean, URL-safe alphanumeric slug.
 * Example: "Randy Mike" -> "randymike"
 * Example: "André O'Connor" -> "andreoconnor"
 */
export function formatBaseSlug(name?: string | null): string {
  if (!name?.trim()) return "user";

  const clean = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // strip all non-alphanumeric chars

  if (clean.length < 2) {
    return `user${Math.floor(100 + Math.random() * 900)}`;
  }

  return clean.slice(0, 24);
}

/**
 * Returns the existing slug for a user, or generates a unique vanity slug
 * based on their name with collision handling (e.g. randymike, randymike1).
 */
export async function getOrCreateUserSlug(
  userId: string,
  userName?: string | null
): Promise<string> {
  await getDb();

  // 1. Check if user already has an assigned slug
  const existing = await PersonalLink.findOne({ userId }).lean();
  if (existing?.slug) {
    return existing.slug;
  }

  // 2. Generate clean base slug from name
  const baseSlug = formatBaseSlug(userName);

  // 3. Find an untaken unique slug (checking for collisions)
  let candidate = baseSlug;
  let counter = 1;

  while (await PersonalLink.exists({ slug: candidate })) {
    candidate = `${baseSlug}${counter}`;
    counter++;

    if (counter > 100) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      candidate = `${baseSlug}${randomSuffix}`;
      break;
    }
  }

  // 4. Save and return the slug
  try {
    const created = await PersonalLink.create({
      userId,
      slug: candidate,
    });
    return created.slug;
  } catch (error: unknown) {
    // If a concurrent insert occurred, return the stored slug
    const fallback = await PersonalLink.findOne({ userId }).lean();
    if (fallback?.slug) return fallback.slug;
    console.error("Slug generation error:", error);
    return userId; // Fallback to raw ID if DB write fails
  }
}
