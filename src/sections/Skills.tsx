import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'
import IconCloud from '@/components/ui/icon-cloud'

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
    <div className=" items-center justify-center flex flex-row">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="relative flex size-full h-100vh w-full items-center justify-center overflow-hidden rounded-lg bg-white px-20 pb-20 pt-8 ">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  )
}

export default Skills