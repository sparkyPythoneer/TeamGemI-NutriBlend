import { LinkButton } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-12">
      <header className="flex items-center justify-between w-full ">
        <Link href="/"
          className="flex items-center gap-2 text-lg font-bold"
        >
          Nutriblend
          <FontAwesomeIcon icon={faAppleAlt} className="text-primary" width={20} height={20} />
        </Link>

        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link className="border-2 border-primary rounded-full px-6 py-1.5 text-primary hover:bg-primary hover:text-background transition-all" href="/auth/signup">Join Us</Link>
            </li>

          </ul>
        </nav>
      </header>


      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 max-lg:justify-center w-full mt-[10vh] py-10 xl:px-[10vw]">
        <div className="py-6 lg:py-12">
          <h6 className="text-sm text-primary py-4 font-medium">
            ACT HEALTHY. BE HEALTHY. EAT HEALTHY.
          </h6>

          <h1 className="text-5xl xl:text-6xl font-bold text-left max-xl:max-w-sm xl:max-w-md">
            Life is great, make it better with foods that don&apos;t harm you
          </h1>
          <p className="text-base my-3 text-gray-500 text-left  max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            malesuada, diam sit amet accumsan ultricies, turpis arcu tincidunt
            metus.
          </p>

          <LinkButton href="/app" size='lg' className="mt-10 rounded-full text-base hover:border-primary border-2 border-transparent hover:bg-background hover:text-primary">
            Start Creating
          </LinkButton>
        </div>

        <div className="relative max-w-sm xl:max-w-md">
          <img src="/assets/soup-landing-page.png" className="w-full" />

          <article className="absolute text-center top-[70%] left-0 right-0 mx-10 xl:mx-16 bg-black/10 backdrop-blur-lg px-4 py-8 rounded-lg ">
            <h2 className="text-xl font-bold text-white">Salads</h2>

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



      <section className="flex flex-col items-center gap-[3vh] mt-[10vh] lg:py-12">
        <h3 className="text-3xl font-bold text-center max-w-md">
          We use AI to satisfy your need to eat better and healthier.
        </h3>

        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[5vw] justify-center w-full py-10">

          <article className="relative max-w-xs">
            <img src="/assets/soup-landing-page.png" className="w-full max-w-[200px]" />

            <article className="absolute text-center top-[70%] left-0 right-0 bg-red/10 backdrop-blur-lg px-4 py-8 rounded-lg ">
              <h2 className="text-xl font-bold text-white">Salads</h2>

              <div className="text-sm text-foreground">
                <p className="font-semibold text-base">Nutrition </p>
                <p>Trans Fat 0.1g.</p>
                <p>16% Saturated Fat 3.lg.</p>
                <p>38% Cholesterol 113mg.</p>
                <p>22% Sodium 517mg.</p>
              </div>

            </article>
          </article>
          <article className="relative max-w-xs">
            <img src="/assets/soup-landing-page.png" className="w-full max-w-[200px]" />

            <article className="absolute text-center top-[70%] left-0 right-0 bg-blue/10 backdrop-blur-lg px-4 py-8 rounded-lg ">
              <h2 className="text-xl font-bold text-white">Salads</h2>

              <div className="text-sm text-foreground">
                <p className="font-semibold text-base">Nutrition </p>
                <p>Trans Fat 0.1g.</p>
                <p>16% Saturated Fat 3.lg.</p>
                <p>38% Cholesterol 113mg.</p>
                <p>22% Sodium 517mg.</p>
              </div>

            </article>
          </article>
          <article className="relative max-w-xs">
            <img src="/assets/soup-landing-page.png" className="w-full max-w-[200px]" />

            <article className="absolute text-center top-[70%] left-0 right-0 bg-black/10 backdrop-blur-lg px-4 py-8 rounded-lg ">
              <h2 className="text-xl font-bold text-white">Salads</h2>

              <div className="text-sm text-foreground">
                <p className="font-semibold text-base">Nutrition </p>
                <p>Trans Fat 0.1g.</p>
                <p>16% Saturated Fat 3.lg.</p>
                <p>38% Cholesterol 113mg.</p>
                <p>22% Sodium 517mg.</p>
              </div>

            </article>
          </article>
        </section>
      </section>

    </main>
  );
}
