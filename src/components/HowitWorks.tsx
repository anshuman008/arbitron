'use client'
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto md:px-8 ">
      <HoverEffect items={howItWorks} />
    </div>
  );
}


const howItWorks = [
    { title: "Submit Dispute", description: "Users submit their case details and evidence through our secure platform." },
    { title: "AI Analysis", description: "Our advanced GPT model analyzes the submitted information, considering legal precedents and principles." },
    { title: "Evidence Authentication", description: "Web3 and Reclaim Protocol verify and secure all submitted evidence, ensuring tamper-proof integrity." },
    { title: "Generate Judgment", description: "The AI generates an impartial judgment based on the analysis and authenticated evidence." },
    { title: "Review and Finalize", description: "Parties can review the judgment, with the option for human expert oversight if needed." },
  ]

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
