import { ServiceItem, CollectionItem, TestimonialItem, NavItem } from './types';

export const BRAND_NAME = "UJ Golden Collection";
export const BRAND_ALT_NAME = "Florence Golden Empires";
export const TAGLINE = "Your Number 1 Bag Empire! 👑";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Services", href: "#services" },
  { label: "Success", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const HERO_TEXT = {
  title: "The Bag Empire",
  subtitle: "We specialize in high-quality bags for every occasion.",
  cta: "Explore Collections"
};

export const ABOUT_TEXT = {
  heading: "Who We Are",
  description: `We are Nigeria’s leading "Bag Empire," specializing in the importation and distribution of high-quality bags for every walk of life. From high-fashion luxury pieces to durable school bags, we provide premium stock at prices that guarantee profit for resellers and satisfaction for individual owners.`,
  subText: "Customer satisfaction is our priority. Thank you for choosing Florence Golden Empires! 🥂"
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    title: "Wholesale (Bulk)",
    description: "Special discounted rates for business owners looking to stock up on top-grade bags.",
    icon: "Boxes"
  },
  {
    title: "Retail Sales",
    description: "Single-piece sales for individual fashion enthusiasts looking for luxury.",
    icon: "ShoppingBag"
  },
  {
    title: "Nationwide Logistics",
    description: "Reliable Waybill and delivery services across all states in Nigeria 🇳🇬.",
    icon: "Truck"
  },
  {
    title: "Trend Sourcing",
    description: "Identifying the latest global fashion trends before they hit the local market.",
    icon: "Globe"
  },
  {
    title: "Quality Inspection",
    description: "Expert grading of leather and materials to ensure 'Top-Grade' quality.",
    icon: "CheckCircle"
  }
];

export const COLLECTIONS_LIST: CollectionItem[] = [
  {
    title: "Luxury Designer",
    category: "High Fashion",
    image: "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/handbagred.jpg"
  },
  {
    title: "Top-Grade Stock",
    category: "Resale Best-Sellers",
    image: "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/multiplebags.jpg"
  },
  {
    title: "Office & Corporate",
    category: "Professional",
    image: "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/handbagblack.jpg"
  },
  {
    title: "Travel Luggage",
    category: "Backpacks & Travel",
    image: "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/travelbagset.jpg"
  },
  {
    title: "School Bags",
    category: "All Ages",
    image: "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/smallbags.jpg"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    text: "In the last quarter, we successfully helped over 50 new resellers across Nigeria start their own mini-bag businesses with our affordable 'Stock Bag' starter packs. Many of these partners have now tripled their initial investment.",
    author: "Success Story",
    role: "Partner Program"
  }
];

export const CONTACT_INFO = {
  address: "Trade Fair Complex, New Mandilas, Lagos. Peter Obi Shop 50",
  phone1: "08083105282",
  phone2: "09035085429",
  socials: "Search 'UJ Golden Collection' on Instagram/Facebook"
};