import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "All Products", href: "#" },
      { name: "New Arrivals", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Sale Items", href: "#" }
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-brand-primary text-white">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-white/80 mb-8 text-lg">
              Subscribe to our newsletter for exclusive offers, new product announcements, and style tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-brand-secondary"
              />
              <Button className="bg-brand-secondary hover:bg-brand-secondary/90 text-brand-primary font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Info */}
            <div className="lg:col-span-2">
              <img src={logo} alt="Logo" className="h-12 w-auto mb-6 brightness-0 invert" />
              <p className="text-white/80 mb-6 leading-relaxed">
                Your trusted partner for premium products and exceptional shopping experiences. 
                We're committed to quality, customer satisfaction, and building lasting relationships.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-brand-secondary" />
                  <span className="text-white/80">support@yourstore.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-brand-secondary" />
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-brand-secondary" />
                  <span className="text-white/80">123 Commerce St, City, State 12345</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/80 hover:text-brand-secondary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/80 hover:text-brand-secondary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/80 hover:text-brand-secondary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-brand-secondary hover:bg-white/10"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              © 2025 Your Store. All rights reserved. Built with ❤️ for amazing customers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;