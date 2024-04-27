import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-12">
      <header className="flex items-center justify-between w-full ">
        <Link href="/">Nutriblend</Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>


      <section className="flex flex-col lg:flex-row-reverse items-center justify-center w-full">
        <div>
          <h6>

          </h6>
          
          <h1 className="text-4xl font-bold text-center max-w-sm">
            Life is great, make it better with salads
          </h1>
        </div>

        <div>

        </div>
      </section>
    </main>
  );
}
