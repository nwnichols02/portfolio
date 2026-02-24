const EXPERIENCE = [
  {
    role: 'Senior Architect @ TechCorp',
    period: '2022 - Present',
    description: 'Leading the migration to microfrontends.',
  },
  {
    role: 'Lead Developer @ StartUp Inc',
    period: '2019 - 2022',
    description: 'Scaled platform from 10k to 1M users.',
  },
  {
    role: 'Full Stack Dev @ Agency',
    period: '2016 - 2019',
    description: 'Delivered 30+ web projects.',
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#fafafa] py-32 px-6 lg:px-12 max-w-[1920px] mx-auto border-t border-gray-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-[8rem] font-bold leading-none tracking-tighter text-black mb-8 lg:-ml-2">
            about
          </h2>
        </div>
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden rounded-lg">
              <img
                src="/nathan-photo.png"
                alt="Nathan Nichols"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Product and industrial designer based in Florence, focused on creating complete
                  product experiences.
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  I believe in the minimal and essential approach, expressed through the search for
                  a balance between form, function and meaning. I create products characterized by
                  their own formal and aesthetic identity.
                </p>
                <p className="text-gray-600 mb-12 text-sm leading-relaxed">
                  With over 10 years of experience in full-stack development, I&apos;ve transitioned
                  into high-level architecture. I don&apos;t just write code; I design systems that
                  scale, endure, and perform.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6 border-b border-gray-200 pb-2">
                  Work Experience
                </h4>
                <ul className="space-y-6">
                  {EXPERIENCE.map((item) => (
                    <li key={item.role}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-medium">{item.role}</span>
                        <span className="text-xs text-gray-400 font-mono">{item.period}</span>
                      </div>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
