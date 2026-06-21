import React from "react";
import Link from "next/link";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-color bg-card text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Scale className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                IPC-BNS <span className="text-primary">Legal Mapper</span>
              </span>
            </div>
            <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
              Bridging the transition from Indian Penal Code (IPC) to Bharatiya Nyaya Sanhita (BNS). Enabling advocates, law enforcement, and citizens to map, compare, and comprehend the updated criminal justice legal framework.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Home / Analyzer
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Legal Library
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-primary uppercase">
              Official Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/70">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:support@ipcbnsmapper.in" className="hover:text-primary transition-colors">
                  support@ipcbnsmapper.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/70">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/70">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border-color pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            &copy; {currentYear} IPC-BNS Legal Mapper. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 italic">
            This platform is for informational reference. Consult legal counsel or verified Gazette publications for official court filings.
          </p>
        </div>
      </div>
    </footer>
  );
}
