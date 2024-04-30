

import { LinkButton } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen m-7">
      <header className="flex items-center justify-between w-full p-5 border-b-[0.5px] border-[#22c55e]">
        <Link href="/"
          className="flex items-center gap-2 text-lg font-bold"
        >
          NutriBlend
          <FontAwesomeIcon icon={faAppleAlt} className="text-primary animate-slideInRight" width={20} height={20} />
        </Link>

        <nav className="animate-fadeIn">
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/#about">About</Link>
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


      <section  className=" flex flex-col lg:flex-row items-center justify-between gap-8 max-lg:justify-center w-full px-[30px] mt-[10vh] py-10 xl:px-[10vw] ">
        <div className="py-6 lg:py-12 animate-slideIn">
          <h6 className="text-sm text-primary py-4 font-medium">
            ACT HEALTHY. BE HEALTHY. EAT HEALTHY.
          </h6>

          <h1 className="text-5xl xl:text-6xl font-bold text-left max-xl:max-w-sm xl:max-w-md ">
            Life is great, make it better with foods that don&apos;t harm you
          </h1>
          <p className=" text-xl my-3 text-gray-500 text-left  max-w-sm">
            NutriBlend is a web app that helps you create a meal plan based on your health needs and preferences. 
            It uses AI to analyze your health data and suggest the best meals for you.
          </p>

          <LinkButton href="/app" size='lg' className="mt-10 rounded-full text-base hover:border-primary border-2 border-transparent hover:bg-background hover:text-primary">
            Start Creating
          </LinkButton>
        </div>

        <div className="relative max-w-sm xl:max-w-md animate-slideInRight">
          <Image src="/assets/soup-landing-page.png" alt="health" className="w-full" width={500} height={500} />
    
          <article className="absolute text-center top-[70%] left-0 right-0 bg-red/10 backdrop-blur-lg px-4 py-8 rounded-lg transform transition-all duration-500 hover:scale-110 hover:-translate-y-16 hover:text-xl">
            <h2 className="text-3xl font-bold text-[#22c55e]" style={{ fontFamily: "'Nothing You Could Do', cursive" }}>Soup</h2>

            <div className="text-xl text-foreground">
              <p className="font-semibold text-base text-emerald-300">Nutrition </p>
              <p>Trans Fat 0.1g.</p>
              <p>16% Saturated Fat 3.lg.</p>
              <p>38% Cholesterol 113mg.</p>
              <p>22% Sodium 517mg.</p>
            </div>

          </article>
        </div>
      </section>



      <section className="flex flex-col items-center gap-[3vh] mt-[10vh] lg:py-12" id="about">
        <div className="relative w-full h-[400px]">
            <div className="absolute inset-0 bg-opacity-10 z-10" style={{backgroundImage: "url('/assets/AdobeStock_248929619_Preview.jpeg')", filter: "blur(5px)"}}></div>
            <div className="relative z-20 flex p-10 items-center">
                <div>
                    <h3 className="relative text-[100px] animate-bounce duration-6000 repeat-infinite  leading-none my-20 mx-20 font-bold text-center text-[#22c55e] " style={{ fontFamily: "'Nothing You Could Do', cursive" }}>
                    About us
                    </h3>
                </div>
                <div>
                    <p className="relative text-[20px]  text-center ml-[100px] border-l-8 border-lime-700 h-[300px] px-10 py-20 text-white ">
                    NutriBlend is a web app using the Gemini AI API that helps you create a meal plan based on your health needs and preferences.
                    It uses AI to analyze your health data and suggest the best meals for you.
                    It also allows you to create a customized health plan based on your health goals.
                    This app is built to help you live a healthier life by making it easier for you to eat healthy.
                    </p>
                </div>
                </div>
        </div>
            <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[5vw] justify-center w-full py-10">

          <article className="relative max-w-xs ">
          <Image src="/assets/salad.png" alt="health" className="w-[400px] h-[340px] " width={500} height={500} />

            <article className="absolute text-center top-[70%] left-0 right-0 bg-red/10 backdrop-blur-lg px-4 py-8 rounded-lg transform transition-all duration-500 hover:scale-110 hover:-translate-y-16 hover:text-xl">
              <h2 className="text-3xl font-extrabold text-[#22c55e]" style={{ fontFamily: "'Nothing You Could Do', cursive" }}>Salad</h2>

              <div className="text-sm text-foreground">
                <p className="font-semibold text-base text-emerald-300">Nutrition </p>
                <p>Trans Fat 0.1g.</p>
                <p>16% Saturated Fat 3.lg.</p>
                <p>38% Cholesterol 113mg.</p>
                <p>22% Sodium 517mg.</p>
              </div>

            </article>
          </article>
          <article className="relative max-w-xs">
          <Image src="/assets/rice.png" alt="health" className="w-full" width={500} height={500} />
            <article className="absolute text-center top-[70%] left-0 right-0 bg-blue/10 backdrop-blur-lg px-4 py-8 rounded-lg transform transition-all duration-500 hover:scale-110 hover:-translate-y-16 hover:text-xl">
              <h2 className="text-3xl font-extrabold text-[#22c55e]" style={{ fontFamily: "'Nothing You Could Do', cursive" }}>Jollof Rice</h2>

              <div className="text-sm text-foreground">
                <p className="font-semibold text-base text-emerald-300" >Nutrition </p>
                <p>Trans Fat 0.1g.</p>
                <p>16% Saturated Fat 3.lg.</p>
                <p>38% Cholesterol 113mg.</p>
                <p>22% Sodium 517mg.</p>
              </div>

            </article>
          </article>
          <article className="relative max-w-xs">
          <Image src="/assets/chicken.png" alt="health" className="w-[360px] h-[340px]" width={500} height={300} />
          <article className="absolute text-center top-[70%] left-0 right-0 bg-black/10 backdrop-blur-lg px-4 py-8 rounded-lg transform transition-all duration-500 hover:scale-110 hover:-translate-y-16 hover:text-xl">
                <h2 className=" text-3xl font-extrabold text-[#22c55e]" style={{ fontFamily: "'Nothing You Could Do', cursive" }}>Chicken Sauce</h2>

                <div className="text-sm text-foreground">
                    <p className="font-semibold text-base text-emerald-300">Nutrition </p>
                    <p>Trans Fat 0.1g.</p>
                    <p>16% Saturated Fat 3.lg.</p>
                    <p>38% Cholesterol 113mg.</p>
                    <p>22% Sodium 517mg.</p>
                </div>
            </article>
          </article>
        </section>
      </section>
      <footer className="my-20 h-20 bg-[#22c55e]">
        <div className="flex flex-col items-center justify-center">
        <p className="text-center text-sm py-10 text-gray-500">Copyright © 2024 NutriBlend</p>
    
        </div>
      </footer>
    </main>
  );
}
