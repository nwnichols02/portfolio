import React from 'react'
import { cn } from '@/lib/utils'
import Marquee from './ui/marquee'
import HyperText from './ui/hyper-text'
import WordFadeIn from './ui/word-fade-in'

interface FooterProps {
  scrollToSection: (index: number) => void
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const sections = ['home', 'about', 'projects', 'skills', 'experience', 'blog', 'contact']

  const reviews = [
    {
      name: "Jimmy",
      username: "@jimmy",
      body: "In today's episode of 'Extreme Makeover: Codebase Edition', watch @Nate turn spaghetti code into a gourmet TanStack meal. Bon appétit! #CodeChef",
      img: "https://avatar.iran.liara.run/public/39",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "@Nate's TanStack Table is so efficient, it sorted the entire Library of Congress in 3 milliseconds. Librarians worldwide are now unemployed. #TableTerminator",
      img: "https://avatar.iran.liara.run/public/47",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "In a twist of fate, @Nate's Storybook has become sentient and is now writing a novel about its components. Critics are calling it 'a compelling saga of buttons and forms.' #AIGeneratedDocs",
      img: "https://avatar.iran.liara.run/public/61",
    },
    {
      name: "John",
      username: "@john",
      body: "NASA confirms: @Nate's React hooks are so powerful, they've accidentally created a wormhole in the space-time continuum. Senior devs are now junior devs in parallel universes. #HookingReality",
      img: "https://avatar.iran.liara.run/public/38",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "Astronomers have detected @Nate's Vite dev server signals in deep space. Aliens are reportedly very impressed with the hot module replacement. #IntergalacticDX",
      img: "https://avatar.iran.liara.run/public/63",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "Overheard: @Nate doesn't use Vite to build projects. Vite uses @Nate to build itself. The resulting bundle is so fast, it finishes before it starts. #ViteInception",
      img: "https://avatar.iran.liara.run/public/86",
    },
    {
      name: "James",
      username: "@james",
      body: "Legend has it, @Nate's React components are so pure, they make distilled water look contaminated. Chemists are studying them for new purification techniques. #ReactPurity",
      img: "https://avatar.iran.liara.run/public/14",
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: string;
    name: string;
    username: string;
    body: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };

  function MarqueeDemo() {
    return (
      <div className="relative flex h-[500px] w-3/4 flex-col items-center justify-center overflow-hidden bg-background">
        <Marquee pauseOnHover className="[--duration:20s] w-full">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] w-full">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative h-32 bg-gradient-to-b from-background flex to-transparent align-center justify-center">
          <WordFadeIn words='What People Are Saying About Nate' />
        </div>
        <div className="relative flex align-center justify-center">
          <MarqueeDemo />
        </div>
        {/* <div className="relative flex align-end items-end justify-end">
          Hello world
        </div> */}
        {/* <footer className="bg-muted text-foreground py-8 flex-end">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-auto mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">Nathan Nichols</h3>
                <p className="text-sm">Senior Software Engineer</p>
              </div>
              <nav className="w-full md:w-auto">
                <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
                  {sections.map((section, index) => (
                    <li key={section}>
                      <button
                        onClick={() => scrollToSection(index)}
                        className="text-sm hover:text-secondary transition-colors capitalize"
                      >
                        {section}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>&copy; 2024 Nathan Nichols. All rights reserved.</p>
              <div className="mt-2">
                <a href="https://linkedin.com/in/nathan-nichols" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-secondary mr-4">LinkedIn</a>
                <a href="https://github.com/nathan-nichols" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-secondary">GitHub</a>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  )
}

export default Footer