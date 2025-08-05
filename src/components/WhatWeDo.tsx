import { Users, GraduationCap, Briefcase, Globe } from 'lucide-react'

const targetAudiences = [
  {
    icon: Users,
    title: 'Students & Trainees',
    description: 'Aspiring tech professionals seeking comprehensive training and mentorship',
    color: 'bg-nyansa-complementary text-nyansa-accent'
  },
  {
    icon: GraduationCap,
    title: 'Educators & Innovators',
    description: 'Teachers and innovators looking to enhance their tech skills and knowledge',
    color: 'bg-nyansa-light-blue/10 text-nyansa-light-blue'
  },
  {
    icon: Briefcase,
    title: 'Hiring Partners',
    description: 'Companies seeking skilled tech talent and collaboration opportunities',
    color: 'bg-nyansa-accent/10 text-nyansa-accent'
  },
  {
    icon: Globe,
    title: 'Community Stakeholders',
    description: 'Media, parents, and community members invested in tech education',
    color: 'bg-nyansa-dark-gray/10 text-nyansa-dark-gray'
  }
]

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-padding bg-nyansa-white">
      <div className="container-max">
        {/* Mission Statement */}
        <div className="text-center responsive-margin">
          <h2 className="responsive-heading text-nyansa-dark-gray mb-4 sm:mb-6">
            What We Do
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="responsive-body text-nyansa-dark-gray/80 leading-relaxed">
              At Nyansa Tech Hub, we are dedicated to bridging the digital divide in Africa 
              by providing world-class technology education and fostering innovation. Our 
              mission is to empower individuals with the skills, knowledge, and opportunities 
              needed to thrive in the global tech ecosystem.
            </p>
          </div>
        </div>

        {/* Target Audiences */}
        <div className="responsive-card-grid">
          {targetAudiences.map((audience, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-nyansa-complementary/20"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 ${audience.color}`}>
                <audience.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-nyansa-dark-gray mb-2 sm:mb-3">
                {audience.title}
              </h3>
              <p className="text-sm sm:text-base text-nyansa-dark-gray/70 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-nyansa-complementary to-nyansa-light-blue/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="responsive-subheading text-nyansa-dark-gray mb-4">
                Why Choose Nyansa Tech Hub?
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-nyansa-light-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-nyansa-dark-gray/80">
                    Industry-aligned curriculum designed by tech professionals
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-nyansa-light-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-nyansa-dark-gray/80">
                    State-of-the-art facilities and cutting-edge technology
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-nyansa-light-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-nyansa-dark-gray/80">
                    Strong network of industry partners and mentors
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-nyansa-light-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-nyansa-dark-gray/80">
                    Proven track record of successful career placements
                  </span>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="text-2xl sm:text-3xl font-bold text-nyansa-light-blue mb-1 sm:mb-2">95%</div>
                <div className="text-sm sm:text-base text-nyansa-dark-gray/70">Success Rate</div>
                <div className="text-xs sm:text-sm text-nyansa-dark-gray/50 mt-1">
                  of our graduates secure tech positions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 