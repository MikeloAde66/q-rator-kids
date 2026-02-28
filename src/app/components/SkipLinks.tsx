import { useAccessibility } from '../contexts/AccessibilityContext';

interface SkipLink {
  id: string;
  label: string;
  target: string;
}

const skipLinks: SkipLink[] = [
  { id: 'skip-to-main', label: 'Skip to main content', target: '#main-content' },
  { id: 'skip-to-nav', label: 'Skip to navigation', target: '#main-navigation' },
  { id: 'skip-to-search', label: 'Skip to search', target: '#search-bar' },
  { id: 'skip-to-footer', label: 'Skip to footer', target: '#footer' },
];

export function SkipLinks() {
  const { preferences } = useAccessibility();

  if (!preferences.keyboardNavigation) return null;

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the element if it's focusable
      if (element instanceof HTMLElement) {
        element.focus();
      }
    }
  };

  return (
    <nav aria-label="Skip links" className="skip-links">
      {skipLinks.map(link => (
        <a
          key={link.id}
          href={link.target}
          onClick={(e) => handleSkip(e, link.target)}
          className="skip-link"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
