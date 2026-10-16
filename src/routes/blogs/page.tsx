import { CardDescription, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/blogs";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {};

function Blogs({}: Props) {
  const posts = getAllBlogPosts();

  return (
    <div className="py-10">
      <div className="py-10 text-center">
        <CardTitle>Blogs & Thoughts</CardTitle>
        <CardDescription className="mt-1">
          Deep dives on software engineering, AI architecture, and systems in production.
        </CardDescription>
      </div>

      <div className="flex flex-col gap-6 p-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card p-5 transition-all duration-200 hover:border-foreground/30 hover:shadow-md sm:p-6"
          >
            {post.metadata.thumbnail && (
              <div className="mb-4 overflow-hidden rounded-lg border border-border/50 bg-muted">
                <img
                  src={post.metadata.thumbnail}
                  alt={post.metadata.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-56"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-2">
              {post.metadata.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border bg-muted/60 px-2 py-0.5 text-xs font-medium text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {post.metadata.title}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {post.metadata.description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.metadata.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.metadata.readTime}
                </span>
              </div>

              <span className="flex items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-0.5">
                Read article
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            No blog posts published yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
