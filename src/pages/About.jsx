import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Main Content */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.Hero}
          alt="Ghana Marketplace"
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to <span className="font-semibold">Ghana Market Place</span>
            , your premier destination for authentic Ghanaian arts, crafts, and
            cultural treasures. We are more than just a marketplace – we are a
            bridge connecting the rich heritage of Ghana to the world.
          </p>
          <p>
            Founded with a passion for preserving and promoting traditional
            Ghanaian craftsmanship, we work directly with skilled artisans from
            across Ghana. From the master weavers of Kente cloth in Bonwire to
            the talented basket makers in Bolgatanga, every product in our
            collection tells a story of tradition, skill, and cultural pride.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower local artisans by providing them with a
            global platform to showcase their work. We believe that by
            connecting these talented craftspeople with customers worldwide, we
            can help preserve traditional techniques, create sustainable
            livelihoods, and share the beauty of Ghanaian culture with the
            world.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Authentic Craftsmanship:</b>
          <p className="text-gray-600">
            Every item is handcrafted by skilled Ghanaian artisans using
            traditional techniques passed down through generations. We guarantee
            100% authentic, original products – no mass-produced imitations.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Direct from Artisans:</b>
          <p className="text-gray-600">
            We work directly with craftspeople across Ghana, ensuring fair
            prices for artisans and authentic products for you. Your purchase
            directly supports local communities and helps preserve cultural
            heritage.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Guaranteed:</b>
          <p className="text-gray-600">
            Each product is carefully inspected to meet our high standards of
            quality and craftsmanship. We stand behind every item we sell with
            our satisfaction guarantee and dedicated customer support.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="text-xl py-4">
        <Title text1={"OUR"} text2={"STORY"} />
      </div>

      <div className="flex flex-col gap-4 text-gray-600 mb-20">
        <p>
          Ghana Market Place was born from a simple observation: the world
          needed easier access to authentic Ghanaian crafts, and talented
          artisans needed a better way to reach global markets. What started as
          a small initiative to help a few local craftspeople has grown into a
          thriving marketplace representing artisans from all regions of Ghana.
        </p>
        <p>
          Today, we're proud to partner with over 100 artisans, from the
          sandal-makers of Kumasi to the wood carvers of Aburi, the bead-makers
          of Krobo to the textile artists of Accra. Each purchase you make
          contributes to sustainable livelihoods, supports traditional crafts,
          and helps keep Ghana's rich cultural heritage alive for future
          generations.
        </p>
        <p>
          Whether you're looking for a stunning piece of Kente cloth, an
          authentic Bolga basket, handcrafted jewelry, or unique home decor,
          you're not just buying a product – you're investing in a story, a
          tradition, and a community.
        </p>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
