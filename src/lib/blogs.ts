export interface BlogMetadata {
  title: string;
  publishedDate: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  readTime: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

/**
 * Robust frontmatter parser extracting YAML-like frontmatter metadata
 * and separating the body markdown content.
 */
export function parseFrontmatter(rawContent: string): {
  metadata: Partial<BlogMetadata>;
  content: string;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return {
      metadata: {},
      content: rawContent.trim(),
    };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const metadata: Record<string, any> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentArrayKey: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for array item like "  - Item"
    const arrayItemMatch = line.match(/^\s*-\s+(.*)$/);
    if (arrayItemMatch && currentArrayKey) {
      if (!Array.isArray(metadata[currentArrayKey])) {
        metadata[currentArrayKey] = [];
      }
      metadata[currentArrayKey].push(cleanValue(arrayItemMatch[1]));
      continue;
    }

    // Key-value line like "key: value"
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const val = line.slice(colonIndex + 1).trim();

      if (val === "") {
        // Might be beginning of an array
        currentArrayKey = key;
        metadata[key] = [];
      } else if (val.startsWith("[") && val.endsWith("]")) {
        // Inline array: [a, b, c]
        currentArrayKey = null;
        metadata[key] = val
          .slice(1, -1)
          .split(",")
          .map((item) => cleanValue(item.trim()))
          .filter(Boolean);
      } else {
        currentArrayKey = null;
        metadata[key] = cleanValue(val);
      }
    }
  }

  // Ensure tags is always an array
  if (typeof metadata.tags === "string") {
    metadata.tags = metadata.tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
  } else if (!Array.isArray(metadata.tags)) {
    metadata.tags = [];
  }

  // Fallback read time calculation
  if (!metadata.readTime) {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    metadata.readTime = `${minutes} min read`;
  }

  return {
    metadata: metadata as Partial<BlogMetadata>,
    content,
  };
}

function cleanValue(val: string): string {
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    return val.slice(1, -1).trim();
  }
  return val.trim();
}

/**
 * Loads all markdown files from src/content/blogs
 */
export function getAllBlogPosts(): BlogPost[] {
  const modules = import.meta.glob("/src/content/blogs/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const posts: BlogPost[] = [];

  for (const path in modules) {
    const rawContent = modules[path] as string;
    const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";
    const { metadata, content } = parseFrontmatter(rawContent);

    posts.push({
      slug,
      metadata: {
        title: metadata.title || slug.replace(/-/g, " "),
        publishedDate: metadata.publishedDate || "Recently",
        description: metadata.description || "",
        thumbnail: metadata.thumbnail || "",
        tags: metadata.tags || [],
        readTime: metadata.readTime || "5 min read",
        author: metadata.author || {
          name: "Vivasvan Patel",
          avatar: "/imgs/avatar.webp",
        },
      },
      content,
    });
  }

  // Sort by published date descending (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedDate).getTime() || 0;
    const dateB = new Date(b.metadata.publishedDate).getTime() || 0;
    return dateB - dateA;
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllBlogPosts();
  return allPosts.find((p) => p.slug === slug);
}
