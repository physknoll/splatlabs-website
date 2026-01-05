'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'
import { TESTIMONIALS } from '@/lib/constants'

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-light-bg-subtle relative overflow-hidden">
      <div className="container-custom relative">
        <SectionHeader
          badge="Testimonials"
          title="Trusted by industry leaders"
          description="See what professionals across industries are saying about Splat Labs."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 3xl:gap-10 4xl:gap-12">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card variant="default" className="h-full relative 3xl:p-8 4xl:p-10">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2 w-10 h-10 3xl:w-12 3xl:h-12 rounded-full bg-rock-orange/10 border border-rock-orange/20 flex items-center justify-center">
                  <Quote className="w-4 h-4 3xl:w-5 3xl:h-5 text-rock-orange" />
                </div>

                {/* Quote */}
                <blockquote className="text-content-secondary text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed mb-6 3xl:mb-8 pt-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-light-border">
                  <div className="w-12 h-12 3xl:w-14 3xl:h-14 rounded-full bg-light-bg-subtle flex items-center justify-center text-rock-orange font-bold 3xl:text-lg">
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary 3xl:text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-sm 3xl:text-base text-content-muted">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
