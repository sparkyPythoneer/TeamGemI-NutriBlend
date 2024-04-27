import { Button } from "@/components/ui/button";
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


      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[5vw] justify-center w-full mt-[10vh]">
        <div className="py-6 lg:py-12">
          <h6>

          </h6>

          <h1 className="text-5xl font-bold text-left max-w-sm">
            Life is great, make it better with salads
          </h1>
          <p className="text-lg text-gray-500 text-left max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            malesuada, diam sit amet accumsan ultricies, turpis arcu tincidunt
            metus.
          </p>

          <Button size='lg' className="mt-10 rounded-full">
            Start Creating
          </Button>
        </div>

        <div className="relative max-w-sm">
          <img src="/assets/soup-landing-page.png" className="w-full"/>

          <article className="absolute text-center top-[70%] left-0 right-0 mx-10 bg-black/10 backdrop-blur-lg px-4 py-8 rounded-lg ">
            <h2 className="text-3xl font-bold text-white">Salads</h2>

            <div className="text-sm text-foreground">
              <p className="font-semibold text-base">Nutrition </p>
              <p>Trans Fat 0.1g.</p>
              <p>16% Saturated Fat 3.lg.</p>
              <p>38% Cholesterol 113mg.</p>
              <p>22% Sodium 517mg.</p>
            </div>

          </article>
        </div>
      </section>
    </main>
  );
}
