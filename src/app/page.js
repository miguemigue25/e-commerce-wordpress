import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders
          subHeader={"Our Story"}
          mainHeader={"About Us"}
        />
        <div className="text-primary max-w-3xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Nestled in the heart of San Diego, California, Carnitas offers a genuine taste of
            Mexico right at your doorstep or our few locales. Our restaurant is named after the beloved Mexican dish &quot;Carnitas&quot;
          </p>

          <p>
            At Carnitas, we pride ourselves on using only the freshest ingredients and authentic
            recipes passed down through generations. Each dish is a tribute to Mexico&apos;s diverse
            culinary heritage and spices.
          </p>
          <p>
            Beyond our delectable food, Carnitas is a place where community and culture come together.
            Our vibrant, colorful decor and warm, welcoming atmosphere provide the perfect setting for
            family gatherings, casual dinners, and celebrations.
          </p>
          <p>
            Join us at Carnitas and experience the true flavors of Mexico, prepared with love and
            served with a smile. ¡Bienvenidos!
          </p>
        </div>
      </section>
      <section className="text-center my-16">
        <SectionHeaders
          subHeader={"Don\'t hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-4">
          <a className="text-4xl underline" href="tel:7608888888">
            (760) 888-8888
          </a>
        </div>
      </section>
    </>
  );
}
