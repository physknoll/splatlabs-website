import Link from 'next/link'
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light-bg-subtle border-t border-light-border">
      {/* Main Footer Content */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rock-orange rounded-lg flex items-center justify-center font-heading font-bold text-white text-xl">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold text-content-primary">
                  Splat Labs
                </span>
                <span className="text-xs font-medium text-content-muted -mt-1">
                  by ROCK
                </span>
              </div>
            </Link>
            <p className="text-content-secondary text-sm max-w-xs mb-6">
              The cloud platform for hosting, sharing, and
              collaborating on Gaussian Splat models.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted hover:text-rock-orange transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-content-primary mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-sm font-semibold text-content-primary mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-content-primary mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-secondary hover:text-rock-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-content-primary mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-secondary hover:text-rock-orange transition-colors"
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
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-content-muted">
            © {currentYear} ROCK Robotic. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm text-content-muted hover:text-content-primary transition-colors"
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
