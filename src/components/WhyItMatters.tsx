import { Quote, TrendingUp, Users, Globe, Award } from 'lucide-react'

const impactStats = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Students Trained',
    description: 'Graduates equipped with in-demand tech skills'
  },
  {
    icon: Users,
    value: '95%',
    label: 'Employment Rate',
    description: 'Of our graduates secure tech positions'
  },
  {
    icon: Globe,
    value: '50+',
    label: 'Partner Companies',
    description: 'Collaborating to create opportunities'
  },
  {
    icon: Award,
    value: '15+',
    label: 'Industry Awards',
    description: 'Recognizing our excellence in tech education'
  }
]

export default function WhyItMatters() {
  return (
    <section id="about" className="section-padding bg-nyansa-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Quote and Narrative */}
          <div>
            <div className="relative mb-8">
              <Quote className="w-12 h-12 text-nyansa-light-blue mb-4" />
              <blockquote className="text-2xl md:text-3xl font-bold text-nyansa-dark-gray leading-relaxed mb-6">
                &ldquo;Africa&apos;s future is digital, and Nyansa Tech Hub is at the forefront 
                of preparing the next generation of tech leaders who will drive 
                innovation across the continent.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-nyansa-light-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NT</span>
                </div>
                <div>
                  <div className="font-semibold text-nyansa-dark-gray">Nyansa Tech Hub</div>
                  <div className="text-sm text-nyansa-dark-gray/70">Leadership Team</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-nyansa-dark-gray/80 leading-relaxed">
                In today&apos;s rapidly evolving digital landscape, access to quality technology 
                education is not just an advantage—it&apos;s a necessity. Africa&apos;s tech ecosystem 
                is growing exponentially, creating unprecedented opportunities for skilled 
                professionals who can drive innovation and digital transformation.
              </p>
              
              <p className="text-lg text-nyansa-dark-gray/80 leading-relaxed">
                At Nyansa Tech Hub, we understand that the future of Africa&apos;s economic 
                growth lies in its ability to compete in the global digital economy. 
                Our comprehensive training programs are designed to bridge the skills gap 
                and empower individuals to become catalysts for change in their communities.
              </p>

              <p className="text-lg text-nyansa-dark-gray/80 leading-relaxed">
                By investing in technology education, we&apos;re not just training individuals—we&apos;re 
                building a network of innovators, entrepreneurs, and leaders who will shape 
                the future of Africa&apos;s digital landscape and contribute to global technological advancement.
              </p>
            </div>
          </div>

          {/* Impact Stats */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-nyansa-dark-gray mb-8">
              Our Impact
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {impactStats.map((stat, index) => {
                const colors = [
                  { bg: 'bg-nyansa-light-blue/10', icon: 'text-nyansa-light-blue', text: 'text-nyansa-light-blue' },
                  { bg: 'bg-nyansa-accent/10', icon: 'text-nyansa-accent', text: 'text-nyansa-accent' },
                  { bg: 'bg-nyansa-dark-gray/10', icon: 'text-nyansa-dark-gray', text: 'text-nyansa-dark-gray' },
                  { bg: 'bg-nyansa-complementary', icon: 'text-nyansa-accent', text: 'text-nyansa-accent' }
                ]
                const colorScheme = colors[index % colors.length]
                
                return (
                  <div
                    key={index}
                    className="bg-nyansa-complementary rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className={`w-12 h-12 ${colorScheme.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <stat.icon className={`w-6 h-6 ${colorScheme.icon}`} />
                    </div>
                    <div className={`text-3xl font-bold ${colorScheme.text} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="font-semibold text-nyansa-dark-gray mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-nyansa-dark-gray/70">
                      {stat.description}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-nyansa-light-blue to-nyansa-accent rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-3">
                Join the Movement
              </h4>
              <p className="text-lg opacity-90">
                Be part of Africa&apos;s digital transformation. Whether you&apos;re a student, 
                partner, or supporter, your involvement matters.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-16 bg-nyansa-complementary rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold text-nyansa-dark-gray mb-4">
                The Digital Divide
              </h4>
              <p className="text-nyansa-dark-gray/80">
                Africa faces a significant digital skills gap. By 2030, the continent 
                will need millions of tech professionals to meet growing demand.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-nyansa-dark-gray mb-4">
                Economic Opportunity
              </h4>
              <p className="text-nyansa-dark-gray/80">
                Technology jobs offer higher wages and better career prospects. 
                Our graduates see an average 300% increase in earning potential.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-nyansa-dark-gray mb-4">
                Global Impact
              </h4>
              <p className="text-nyansa-dark-gray/80">
                African tech talent is in high demand globally. Our programs prepare 
                students for both local and international opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 