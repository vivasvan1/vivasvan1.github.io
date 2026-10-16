import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/lib/blogs";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Button className="mt-6" onClick={() => navigate("/blogs")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
      </div>
    );
  }

  const { metadata, content } = post;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: metadata.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <article className="mx-auto w-full max-w-3xl py-10 px-3 sm:px-0">
      {/* Back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3 text-muted-foreground hover:text-foreground"
        >
          <Link to="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Posts
          </Link>
        </Button>
      </div>

      {/* Header Metadata */}
      <header className="space-y-4 pb-8 border-b">
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl sm:leading-tight">
          {metadata.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {metadata.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage
                src={metadata.author?.avatar || "/imgs/avatar.webp"}
                alt={metadata.author?.name || "Author"}
              />
              <AvatarFallback>VP</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">
                {metadata.author?.name || "Vivasvan Patel"}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {metadata.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {metadata.readTime}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
        </div>
      </header>

      {/* Hero Thumbnail Banner */}
      {metadata.thumbnail && (
        <div className="my-8 overflow-hidden rounded-xl border border-border/70 shadow-md">
          <img
            src={metadata.thumbnail}
            alt={metadata.title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Markdown Content Body */}
      <div className="markdown-content mt-8 space-y-6 text-[15px] sm:text-base leading-7 text-foreground/90">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="mt-10 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground border-b pb-2"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="mt-8 mb-3 text-xl sm:text-2xl font-semibold tracking-tight text-foreground"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="mt-6 mb-2 text-lg sm:text-xl font-medium tracking-tight text-foreground"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="leading-7 my-4 text-foreground/85" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/85" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/85" {...props} />
            ),
            li: ({ node, ...props }) => <li className="leading-7" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="my-6 border-l-4 border-primary/70 bg-muted/40 py-2.5 px-4 italic rounded-r text-foreground/90 font-serif"
                {...props}
              />
            ),
            hr: ({ node, ...props }) => (
              <hr className="my-8 border-border/80" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noreferrer"
                {...props}
              />
            ),
            code: ({ node, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match && !String(children).includes("\n");

              if (isInline) {
                return (
                  <code
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <div className="my-6 overflow-x-auto rounded-lg border bg-zinc-950 p-4 text-zinc-100 shadow-sm">
                  <pre className="font-mono text-xs leading-5">
                    <code {...props}>{children}</code>
                  </pre>
                </div>
              );
            },
            pre: ({ node, children, ...props }) => (
              <pre className="overflow-x-auto font-mono text-xs" {...props}>
                {children}
              </pre>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} variant="ghost">
          Back to Top ↑
        </Button>
      </div>
    </article>
  );
}
