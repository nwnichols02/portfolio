import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'
import IconCloud from '@/components/ui/icon-cloud'
import Iphone15Pro from '@/components/ui/iphone-15-pro'

const Skills: React.FC = () => {

  const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "prisma",
    "azure",
    "postgresql",
    "firebase",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "vite",
    "webpack",
    "storybook",
    "deno",
    "bun",
    "pnpm",
    "prettier",
    "eslint",
    "mui",
    "tailwindcss",
    "mockserviceworker",
    "vitest",
    "leaflet",
    "esri",
    "framer",
    "arcgis",
    "playwright",
    "reactrouter",
    "axios",
    "github",
    "visualstudiocode",
    "figma",
    "go",
    "dotnet"
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="relative w-full max-w-3xl h-[60vh] flex items-center justify-center overflow-hidden rounded-lg">
        <IconCloud iconSlugs={slugs} />
      </div>
      {/* <Iphone15Pro
        // className="size-full"
        src="https://media.idownloadblog.com/wp-content/uploads/2022/11/Call-on-iPhone-Lock-Screen-758x1536.jpg"
      /> */}
    </div>
  )
}

export default Skills