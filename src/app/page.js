"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['how-it-works', 'features', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      
      if (window.scrollY < 100) {
        current = '';
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // offset for fixed header
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  const steps = [
    { id: 1, img: '/create.png', title: 'פרטים וקישור ללקוח', desc: 'ממלאים את שם הלקוח, פרטי העסקה והסכום בטופס מהיר וחכם ושולחים ללקוח.' },
    { id: 2, img: '/sign.png', title: 'הלקוח חותם', desc: 'הלקוח קורא וחותם בקלות ישירות מהנייד שלו. עותק חתום נשלח לשניכם.' },
    { id: 3, img: '/mail.png', title: 'מסמך PDF חתום ישר למייל', desc: 'עותק סופי ורשמי של החוזה נשלח אוטומטית למייל שלך ושל הלקוח לשמירה וגיבוי.' }
  ];

  const nextStep = () => setCurrentStep(prev => prev < steps.length ? prev + 1 : prev);
  const prevStep = () => setCurrentStep(prev => prev > 0 ? prev - 1 : prev);

  return (
    <main className={styles.main}>
      {/* Background ambient glow */}
      <div className={styles.ambientBackground}></div>

      <header className={styles.header}>
        <div className={styles.logo}>חוזה בקליק <span className={styles.dot}>.</span></div>
        <nav className={styles.desktopNav}>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className={`${styles.navLink} ${activeSection === 'how-it-works' ? styles.active : ''}`}>איך זה עובד</a>
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className={`${styles.navLink} ${activeSection === 'features' ? styles.active : ''}`}>יתרונות</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`${styles.navLink} ${activeSection === 'contact' ? styles.active : ''}`}>יצירת קשר</a>
        </nav>
        <button className={styles.btnOutline}>אזור אישי</button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>חדש: חתימה דיגיטלית מתקדמת 🚀</div>
          <h1 className={styles.title}>
            ליצור חוזה מרשים,<br/>
            <span className={styles.highlight}>בלי כאב ראש טכנולוגי</span>
          </h1>
          <p className={styles.subtitle}>
            מזינים שם ומחיר – והופ! יש לכם קישור לחוזה מעוצב ומושקע שמשדר יוקרה ומקצועיות ללקוחות שלכם, ישר לוואטסאפ.
          </p>
          <div className={styles.ctaGroup}>
            <button className={styles.btnPrimary}>נסו עכשיו בחינם <span className={styles.arrow}>←</span></button>
            <button className={styles.btnSecondary}>צפו בסרטון <span className={styles.playIcon}>▶</span></button>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.glow}></div>
          <div className={styles.imageContainer}>
            <Image
              src="/mockup.jpg"
              alt="הדמיה של חוזה דיגיטלי בטלפון נייד"
              width={350}
              height={400}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>איך זה עובד? <span>ב-3 צעדים פשוטים</span></h2>
        
        {currentStep < steps.length ? (
          <div className={styles.carouselContainer}>
            <button className={styles.arrowBtn} onClick={prevStep} disabled={currentStep === 0}>
              &#9654;
            </button>
            
            <div className={styles.cardsWrapper}>
              {steps.map((step, index) => {
                let positionClass = '';
                if (index === currentStep) positionClass = styles.cardActive;
                else if (index === currentStep - 1) positionClass = styles.cardPrev;
                else if (index === currentStep + 1) positionClass = styles.cardNext;
                else positionClass = styles.cardHidden;

                return (
                  <div key={step.id} className={`${styles.carouselSlideCard} ${positionClass}`}>
                    <div className={styles.stepNumber}>{step.id}</div>
                    <div className={styles.stepImageWrapper}>
                      <Image 
                        src={step.img} 
                        alt={step.title} 
                        width={1400} 
                        height={1800} 
                        quality={100}
                        className={`${styles.stepImage} ${styles[`stepImage${step.id}`]}`} 
                      />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                );
              })}
            </div>

            <button className={styles.arrowBtn} onClick={nextStep}>
              &#9664;
            </button>
          </div>
        ) : (
          <div className={styles.summaryContainer}>
            <h3 className={styles.summaryTitle}>זהו, יש לכם חוזה מוכן! 🎉</h3>
            <div className={styles.summaryGrid}>
              {steps.map(step => (
                <div key={step.id} className={styles.summaryItem}>
                   <Image src={step.img} alt={step.title} width={200} height={300} className={styles.summaryImage} />
                   <p className={styles.summaryStepTitle}>{step.id}. {step.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>



      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>למה לבחור <span>בנו?</span></h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>✨</div>
            <h3>עיצוב פרימיום (Premium)</h3>
            <p>החוזים שלנו נראים מיליון דולר. הלקוח שלכם ירגיש שהוא בידיים הכי מקצועיות שיש, מהרגע הראשון.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>⚡</div>
            <h3>חוויה חלקה ומהירה</h3>
            <p>בלי מערכות מסובכות או הרשמות ארוכות. הכל קורה בקליק אחד פשוט ואינטואיטיבי.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>🔒</div>
            <h3>חתימה דיגיטלית תקפה</h3>
            <p>מערכת מאובטחת עומדת בתקנים מחמירים. כל חתימה נשמרת עם תיעוד משפטי קביל לחלוטין.</p>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.contactContainer}>
          <div className={styles.contactContent}>
            <h2>מוכנים להרשים את הלקוחות שלכם?</h2>
            <p>השאירו פרטים ונחזור אליכם בהקדם להדגמה קצרה.</p>
          </div>
          <form action="https://formsubmit.co/liriteck@gmail.com" method="POST" className={styles.contactForm}>
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="ליד חדש מדף הנחיתה - חוזה בקליק!" />
            <input type="hidden" name="_captcha" value="false" />
            
            <input type="text" name="name" placeholder="שם מלא" className={styles.input} required />
            <input type="text" name="contact_info" placeholder="אימייל / טלפון" className={styles.input} required />
            
            <button type="submit" className={styles.btnPrimary}>שלח פרטים</button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.logo}>חוזה בקליק <span className={styles.dot}>.</span></div>
        <p className={styles.copyright}>© {new Date().getFullYear()} כל הזכויות שמורות לחוזה בקליק.</p>
      </footer>
    </main>
  )
}
