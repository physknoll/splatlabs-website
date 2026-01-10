import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light-bg-subtle border-t border-light-border">
      {/* Main Footer Content */}
      <div className="container-custom py-16 lg:py-20 3xl:py-24 4xl:py-28">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 3xl:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 3xl:mb-8">
              <img
                src="/logo/SVG/splatlabs_logo_full.svg"
                alt="Splat Labs Logo"
                className="h-9 3xl:h-11 w-auto"
              />
            </Link>
            <p className="text-content-secondary text-sm 3xl:text-base max-w-xs 3xl:max-w-sm mb-6 3xl:mb-8">
              The cloud platform for hosting, sharing, and
              collaborating on Gaussian Splat models.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 3xl:gap-5">
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 3xl:w-6 3xl:h-6" />
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 3xl:w-6 3xl:h-6" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 3xl:w-6 3xl:h-6" />
              </a>
              <a
                href={SITE_CONFIG.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 3xl:w-6 3xl:h-6" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-content-primary mb-4 3xl:mb-5">
              Product
            </h3>
            <ul className="space-y-3 3xl:space-y-4">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm 3xl:text-base text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-content-primary mb-4 3xl:mb-5">
              Solutions
            </h3>
            <ul className="space-y-3 3xl:space-y-4">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm 3xl:text-base text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-content-primary mb-4 3xl:mb-5">
              Resources
            </h3>
            <ul className="space-y-3 3xl:space-y-4">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm 3xl:text-base text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-content-primary mb-4 3xl:mb-5">
              Company
            </h3>
            <ul className="space-y-3 3xl:space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm 3xl:text-base text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-border">
        <div className="container-custom py-6 3xl:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm 3xl:text-base text-content-muted">
            © {currentYear} ROCK Robotic. All rights reserved.
          </p>

          <div className="flex items-center gap-6 3xl:gap-8">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm 3xl:text-base text-content-muted hover:text-content-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
