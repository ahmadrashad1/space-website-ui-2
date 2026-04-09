export default function About() {
  return (
    <section className="about">
      <div className="about__inner">
        <div className="about__text">
          <p className="about__eyebrow">About NASA</p>
          <h2 className="about__title">
            Pioneering the future in space exploration, scientific discovery,
            and aeronautics research.
          </h2>
          <p className="about__copy">
            The National Aeronautics and Space Administration was established
            in 1958 with a distinctly civilian orientation, encouraging peaceful
            applications in space science. Since then, NASA has led the charge
            in understanding our universe — from placing the first humans on
            the Moon during the Apollo program to operating the International
            Space Station, the largest structure ever built in orbit.
          </p>
          <p className="about__copy">
            Today, NASA is pushing the boundaries of what&apos;s possible with
            the Artemis program, aiming to return humans to the lunar surface
            and eventually send astronauts to Mars. Through its missions,
            research, and technology development, NASA continues to inspire the
            world and drive innovation that benefits life on Earth.
          </p>
        </div>
        <div className="about__aside">
          <div className="about__fact">
            <span className="about__fact-icon">☽</span>
            <h3>Moon &amp; Beyond</h3>
            <p>
              The Artemis program will land the first woman and first person of
              color on the Moon, building a long-term presence for deep space
              missions.
            </p>
          </div>
          <div className="about__fact">
            <span className="about__fact-icon">☼</span>
            <h3>Sun &amp; Heliosphere</h3>
            <p>
              Parker Solar Probe has become the closest human-made object to
              the Sun, traveling at speeds exceeding 430,000 mph.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
