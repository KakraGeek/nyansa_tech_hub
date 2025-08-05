'use client'

import { useState } from 'react'
import { Code, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const initiatives = [
  {
    id: 'tech-training',
    title: 'Tech Training',
    icon: Code,
    description: 'Comprehensive technology education programs designed to build practical skills and theoretical knowledge.',
    features: [
      'Web Development & Programming',
      'Mobile App Development',
      'Data Science & Analytics',
      'Cybersecurity Fundamentals',
      'Cloud Computing & DevOps',
      'UI/UX Design Principles'
    ],
    duration: '6-12 months',
    level: 'Beginner to Advanced'
  },
  {
    id: 'career-assistance',
    title: 'Career Assistance',
    icon: Users,
    description: 'Professional development support to help graduates transition into successful tech careers.',
    features: [
      'Resume Building & Interview Prep',
      'Industry Networking Events',
      'Job Placement Support',
      'Career Counseling Sessions',
      'Portfolio Development',
      'LinkedIn Profile Optimization'
    ],
    duration: 'Ongoing Support',
    level: 'All Levels'
  },
  {
    id: 'professional-development',
    title: 'Professional Development',
    icon: TrendingUp,
    description: 'Advanced training and mentorship programs for career advancement and leadership development.',
    features: [
      'Leadership & Management Skills',
      'Project Management Training',
      'Business Development',
      'Entrepreneurship Programs',
      'Industry Certifications',
      'Mentorship Programs'
    ],
    duration: '3-6 months',
    level: 'Mid to Senior Level'
  }
]

export default function CoreInitiatives() {
  const [activeTab, setActiveTab] = useState('tech-training')

  const activeInitiative = initiatives.find(initiative => initiative.id === activeTab)

  return (
    <section id="programs" className="section-padding bg-nyansa-complementary">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-nyansa-dark-gray mb-6">
            Our Core Initiatives
          </h2>
          <p className="text-lg text-nyansa-dark-gray/80 max-w-3xl mx-auto">
            We offer three comprehensive programs designed to address every stage of your 
            tech career journey, from foundational training to professional advancement.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {initiatives.map((initiative) => (
            <Button
              key={initiative.id}
              variant={activeTab === initiative.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(initiative.id)}
              className="flex items-center gap-2 px-6 py-3"
            >
              <initiative.icon className="w-5 h-5" />
              {initiative.title}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeInitiative && (
          <div id={activeInitiative.id} className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-nyansa-light-blue/10 rounded-xl flex items-center justify-center">
                    <activeInitiative.icon className="w-8 h-8 text-nyansa-light-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-nyansa-dark-gray">
                      {activeInitiative.title}
                    </h3>
                    <p className="text-nyansa-dark-gray/70">
                      {activeInitiative.description}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-nyansa-complementary rounded-lg p-4">
                    <div className="text-sm text-nyansa-dark-gray/60 mb-1">Duration</div>
                    <div className="font-semibold text-nyansa-dark-gray">{activeInitiative.duration}</div>
                  </div>
                  <div className="bg-nyansa-complementary rounded-lg p-4">
                    <div className="text-sm text-nyansa-dark-gray/60 mb-1">Level</div>
                    <div className="font-semibold text-nyansa-dark-gray">{activeInitiative.level}</div>
                  </div>
                </div>


              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xl font-semibold text-nyansa-dark-gray mb-6">
                  What You&apos;ll Learn
                </h4>
                <div className="space-y-4">
                  {activeInitiative.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-nyansa-light-blue mt-0.5 flex-shrink-0" />
                      <span className="text-nyansa-dark-gray/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-nyansa-dark-gray/80 mb-6">
            Ready to start your tech journey?
          </p>
          <Button 
            size="lg" 
            className="px-8 py-4"
            onClick={() => {
              // Scroll to contact section
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
              // Trigger a custom event to notify the contact form after scrolling
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('setSubject', { 
                  detail: { subject: 'admissions' } 
                }));
              }, 500);
            }}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  )
} 