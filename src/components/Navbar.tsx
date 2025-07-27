import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: t.nav.home, path: "/", icon: <img src="/pin-signs-svgrepo-com.svg" alt="Home" className="mr-1 h-4 w-4" /> },
    { name: t.nav.explore, path: "/explore", icon: <img src="/compass-tool-svgrepo-com.svg" alt="Explore" className="mr-1 h-4 w-4" /> },
    { name: t.nav.lists, path: "/lists", icon: <img src="/compass-tool-svgrepo-com(1).svg" alt="Lists" className="mr-1 h-4 w-4" /> },
    { name: t.nav.contact, path: "/contact", icon: <img src="/contact-email-mail-svgrepo-com.svg" alt="Contact" className="mr-1 h-4 w-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  return <header className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
    scrolled ? 
      "bg-teal-600/90 dark:bg-teal-800/90 backdrop-blur-lg py-4 shadow-md" : 
      "bg-transparent py-6"
  )}>
      <nav className="container flex items-center">
        <Link to="/" className="flex-shrink-0 flex items-center">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-white mr-2">Shoof</span>
            <img src="/pin-signs-svgrepo-com.svg" alt="Shoof logo" className="h-6 w-6 text-white" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-10 mx-auto pl-24">
          {navLinks.map(link => (
            <li key={link.name} className="relative">
              <Link 
                to={link.path} 
                className="text-lg font-medium text-white/90 transition-colors hover:text-white flex items-center
                          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 
                          after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Button asChild className="bg-white text-teal-700 hover:bg-white/90 text-base py-2 px-4">
            <Link to="/create-list" className="flex items-center">
              <img src="/plus-icon-svgrepo-com.svg" alt="Create List" className="mr-2 h-5 w-5" />
              <span>{t.nav.createList || "Create List"}</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-white border border-white/30 hover:bg-white/10 text-base py-2 px-4">
            <Link to="/profile" className="flex items-center">
              <img src="/user-icon-svgrepo-com.svg" alt="Profile" className="mr-2 h-5 w-5" />
              <span>{t.nav.profile || "Profile"}</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full text-white">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn("fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300", mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <div className={cn("fixed inset-y-0 right-0 w-3/4 max-w-sm bg-teal-700 shadow-xl p-6 transition-transform duration-300 ease-in-out", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between mb-8">
                <div className="flex items-center">
                  <span className="font-bold text-2xl text-white mr-2">Shoof</span>
                  <img src="/pin-signs-svgrepo-com.svg" alt="Shoof logo" className="h-6 w-6 text-white" />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full text-white">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-6">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-xl font-medium text-white/90 hover:text-white flex items-center" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4 mt-6">
              <Button asChild className="w-full bg-white text-teal-700 hover:bg-white/90 text-base py-2">
                <Link to="/create-list" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center">
                  <img src="/plus-icon-svgrepo-com.svg" alt="Create List" className="mr-2 h-5 w-5" />
                  <span>{t.nav.createList || "Create List"}</span>
                </Link>
              </Button>
              
              <Button asChild variant="ghost" className="w-full text-white border border-white/30 hover:bg-white/10 text-base py-2">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center">
                  <img src="/user-icon-svgrepo-com.svg" alt="Profile" className="mr-2 h-5 w-5" />
                  <span>{t.nav.profile || "Profile"}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>;
}
