import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselIndicator, CarouselMainContainer, CarouselNext, CarouselPrevious, CarouselThumbsContainer, SliderMainItem } from '@/components/ui/carousel'
import AutoScroll from "embla-carousel-auto-scroll";

const projects = [
  {
    title: 'Micro-frontends at Pluralsight',
    description: 'Implemented a scalable micro-frontends architecture using Module Federation.',
    technologies: ['React', 'TypeScript', 'Webpack', 'Module Federation'],
    image: 'https://images.unsplash.com/photo-1635405050330-b0824eb1bf26?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    title: 'React Native Mobile App at Vivint',
    description: 'Developed a feature-rich mobile application for smart home control and monitoring.',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'Redux'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww'
  },
  {
    title: 'Full-stack Application',
    description: 'Built a scalable full-stack application with a GraphQL API and React front-end.',
    technologies: ['Node.js', 'Express', 'GraphQL', 'React', 'PostgreSQL'],
    image: "https://media.istockphoto.com/id/1336621601/photo/group-of-people-working-and-drinking-hot-coffee-with-latte-art-in-the-cafe.webp?a=1&s=612x612&w=0&k=20&c=a2lcDoJLb37NBfG6Aq3pHqVk2q0VoTgU6oDQFU9joko="
  }
]

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="w-full md:w-3/4 lg:w-1/2 h-[40vh]">
        <Carousel
          plugins={[
            AutoScroll({
              speed: 1,
            }),
          ]}
          carouselOptions={{
            loop: true,
          }}
          className="h-full w-full"
        >
          <CarouselMainContainer className="h-full w-full">
            {projects.map((project, index) => (
              <SliderMainItem key={index} className="bg-transparent h-full">
                <Card className="w-full h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* <div className="flex flex-wrap gap-2 mb-4"> */}
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className='mb-8'>
                        {tech}
                      </Badge>
                    ))}
                    {/* </div> */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover rounded"
                    />
                  </CardContent>
                </Card>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
        </Carousel>
      </div>
    </div>
  )
}

export default Projects