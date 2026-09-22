import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonial } from "@/components/sections/Testimonial";
import { StructuredData } from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Services />
      <Portfolio />
      <Philosophy />
      <Process />
      <Testimonial />
      <Faq />
      <Contact />
    </>
  );
}
