const COLUMNS = [
  {
    heading: "Explore",
    links: ["Missions", "Discoveries", "Technology", "Aeronautics"],
  },
  {
    heading: "Learn",
    links: ["For Students", "For Educators", "STEM Engagement", "Image Gallery"],
  },
  {
    heading: "About",
    links: ["Organization", "Leadership", "Careers", "Contact NASA"],
  },
  {
    heading: "Follow",
    links: ["X / Twitter", "Instagram", "YouTube", "Facebook"],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">NASA</p>
          <p className="footer__tagline">
            National Aeronautics and Space Administration
          </p>
        </div>
        <nav className="footer__nav">
          {COLUMNS.map((col) => (
            <div className="footer__col" key={col.heading}>
              <h4 className="footer__heading">{col.heading}</h4>
              <ul className="footer__links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="/">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer__bottom">
          <p>&copy; 2026 NASA. All rights reserved.</p>
          <p>
            <a href="/">Privacy Policy</a>
            <span className="footer__dot">&middot;</span>
            <a href="/">Accessibility</a>
            <span className="footer__dot">&middot;</span>
            <a href="/">FOIA</a>
            <span className="footer__dot">&middot;</span>
            <a href="/">No Fear Act</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
