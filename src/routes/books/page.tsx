import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

type Props = {};

const books = [
  {
    title: "Sophie's World",
    author: "Jostein Gaarder",
    cover:
      "https://m.media-amazon.com/images/I/A14CZcMfAkL._AC_UF1000,1000_QL80_DpWeblab_.jpg", // Placeholder image path
    description:
      "A philosophical journey through human history presented as a mystery novel.",
  },
  {
    title: "Chaos",
    author: "James Gleick",
    cover:
      "https://m.media-amazon.com/images/I/91RCspPB-PL._AC_UF1000,1000_QL80_.jpg", // Placeholder image path
    description:
      "Explores the emerging science of chaos, a term defining apparent randomness in nature.",
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma et al.",
    cover: "https://m.media-amazon.com/images/I/51nL96Abi1L.jpg", // Placeholder image path
    description:
      "A foundational text in computer science, introducing patterns to streamline object-oriented design and programming.",
  },
  {
    title: "Goosebumps: The Haunted Scarecrow",
    author: "R.L. Stine",
    cover:
      "https://m.media-amazon.com/images/I/7188GfXQn0L._AC_UF1000,1000_QL80_DpWeblab_.jpg", // Placeholder image path
    description:
      "A thrilling adventure in the famous Goosebumps series, featuring eerie and mysterious happenings.",
  },
  {
    title: "The Idiot",
    author: "Fyodor Dostoevsky",
    cover:
      "https://m.media-amazon.com/images/I/71f4AcK4YkL._AC_UF1000,1000_QL80_.jpg", // Placeholder image path
    description:
      "A masterful novel of one man’s tragic idiocy, mirroring the profound human struggle to understand faith and reason.",
  },
  {
    title: "Home",
    author: "Whitney Hanson",
    cover:
      "https://m.media-amazon.com/images/I/71lwMr2NRIL._AC_UF1000,1000_QL80_DpWeblab_.jpg", // Placeholder image path
    description: "A gripping tale of love, loss, and the meaning of family.",
  },
];

function Books({}: Props) {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-3 py-10 text-center">
        <CardTitle>Books I've Read</CardTitle>
        <CardDescription>
          Write to me if you have a book you'd like me to read.
        </CardDescription>
      </div>
      <div className="flex w-full flex-col gap-5 p-3 sm:grid sm:grid-cols-2">
        {books.map((book, index) => (
          <Book book={book} key={index} />
        ))}
      </div>
    </div>
  );
}

type BookProps = {
  book: (typeof books)[0];
};

function Book({ book }: BookProps) {
  return (
    <Card className="flex flex-col hover:bg-muted">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        <img
          src={book.cover}
          alt={`Cover of the book ${book.title}`}
          className="h-auto w-full object-cover"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <CardDescription className="py-3">
          <p>{book.description}</p>
        </CardDescription>
        <CardDescription className="py-3">
          <p className="text-sm text-muted-foreground">Author: {book.author}</p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default Books;
