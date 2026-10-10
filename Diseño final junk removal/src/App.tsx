import { type ChangeEvent, type FormEvent, useState } from 'react'
import './App.css'

type ThemeName = 'industrial' | 'editorial'

type BookingForm = {
  service: string
  name: string
  phone: string
  email: string
  address: string
  date: string
  notes: string
}

const initialForm: BookingForm = {
  service: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  date: '',
  notes: '',
}

const services = [
  {
    title: 'Furniture Removal',
    description: 'Couches, beds, tables, and bulky household items removed fast.',
  },
  {
    title: 'Garage & Attic Clean Outs',
    description: 'Clear out years of clutter without the heavy lifting or multiple trips.',
  },
  {
    title: 'Appliance & Hot Tub Removal',
    description: 'We haul away washers, dryers, refrigerators, and specialty items safely.',
  },
  {
    title: 'Construction Debris',
    description: 'Renovation waste, drywall, wood, tile, and other job-site debris removed.',
  },
  {
    title: 'Estate & Office Clean Outs',
    description: 'Turn empty spaces into move-ready, usable areas with our full-service team.',
  },
  {
    title: 'Yard Debris & Flood Cleanup',
    description: 'Storm debris, brush, trim, and damaged material handled with no mess left behind.',
  },
]

const steps = [
  { number: '01', title: 'Pick Your Date', text: 'Schedule online or by phone. Choose any date and a two-hour arrival window that fits your schedule.' },
  { number: '02', title: 'We Call Ahead', text: 'We call you 30–60 minutes before our crew arrives. No surprises, no waiting around all day.' },
  { number: '03', title: 'We Do the Heavy Lifting', text: 'Approve our upfront price and we handle everything — lifting, loading, hauling, and cleanup.' },
]

const pricingTiers = [
  { name: 'Small Load', price: '$99+', description: 'A few items — couch, appliances, or a compact pile of debris.', kind: 'Popular' },
  { name: 'Mid Load', price: '$199+', description: 'Garage clean outs, room clear-outs, or a mid-size residential haul.', kind: 'Most Popular' },
  { name: 'Full Load', price: '$299+', description: 'Estate clean outs, construction debris, and large property jobs.', kind: 'Best Value' },
]

const reviews = [
  { name: 'Maria R.', quote: 'They showed up on time, hauled everything away, and left the driveway spotless. Super easy and transparent.', rating: '★★★★★' },
  { name: 'James T.', quote: 'Fast communication, fair pricing, and the crew handled my garage clean out without any issues.', rating: '★★★★★' },
  { name: 'Claire M.', quote: 'I booked online and they were here the same day. No hidden fees and zero hassle.', rating: '★★★★★' },
]

const serviceAreas = [
  'Houston',
  'Cypress',
  'Pasadena',
  'Katy',
  'Sugar Land',
  'The Woodlands',
  'Pearland',
  'Friendswood',
  'Spring',
  'Tomball',
  'League City',
  'Missouri City',
  'Baytown',
  'Humble',
  'Conroe',
  'Richmond',
  'Rosenberg',
  'Stafford',
]

const beforeAfter = [
  { label: 'Before', title: 'Garage clean out', note: 'Years of clutter and boxes' },
  { label: 'After', title: 'Clean, open space', note: 'Ready for storage and use' },
  { label: 'Before', title: 'Backyard debris', note: 'Old wood, branches, and trash' },
  { label: 'After', title: 'Fresh yard', note: 'Clear and ready for use' },
]

function App() {
  const [theme, setTheme] = useState<ThemeName>('industrial')
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitted(false)
  }

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof BookingForm, string>> = {}

    if (!form.service) nextErrors.service = 'Please select a service.'
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (!form.email.trim()) nextErrors.email = 'Please enter your email.'
    if (!form.address.trim()) nextErrors.address = 'Please enter your address or ZIP.'
    if (!form.date) nextErrors.date = 'Please choose a date.'

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  return (
    <div className={`app ${theme}`}>
      <header className="topbar">
        <div className="shell nav-shell">
          <div className="brand-wrap">
            <div className="brand-mark">OS</div>
            <div>
              <div className="brand-name">One Stop</div>
              <small>Junk Removal</small>
            </div>
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#how-it-works">How it Works</a>
            <a href="#services">Services</a>
            <a href="#reviews">Reviews</a>
            <a href="#pricing">Pricing</a>
            <a href="#booking">Book</a>
          </nav>

          <div className="theme-switcher" aria-label="Theme selector">
            <button
              type="button"
              className={theme === 'industrial' ? 'theme active' : 'theme'}
              onClick={() => setTheme('industrial')}
            >
              Design 1
            </button>
            <button
              type="button"
              className={theme === 'editorial' ? 'theme active' : 'theme'}
              onClick={() => setTheme('editorial')}
            >
              Design 2
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <span className="eyebrow">Houston • Same Day Service</span>
            <h1>Houston’s Junk Removal Experts.</h1>
            <p>
              One Stop Junk Removal hauls away furniture, appliances, debris, and clutter with upfront pricing and a team that handles all the heavy lifting.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#booking">Book Now</a>
              <a className="secondary-btn" href="tel:7138069955">Call (713) 806-9955</a>
            </div>

            <div className="hero-quick-links">
              <a href="sms:7138069955">Text a Photo</a>
              <span>•</span>
              <a href="#pricing">View Pricing</a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-header">
              <span className="tag">Google Rating</span>
              <strong>4.9</strong>
            </div>
            <div className="mini-stats">
              <div>
                <span>162+</span>
                <small>Reviews</small>
              </div>
              <div>
                <span>Same Day</span>
                <small>Available</small>
              </div>
            </div>
            <div className="service-chip-list">
              <span>Furniture</span>
              <span>Appliances</span>
              <span>Construction Debris</span>
              <span>Yard Waste</span>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="shell trust-row">
            <span>Trusted by Houston homeowners and businesses</span>
            <div className="logos">
              <span>Google</span>
              <span>BBB</span>
              <span>Thumbtack</span>
              <span>Nextdoor</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="how-it-works">
          <div className="section-heading centered">
            <span className="eyebrow">How it works</span>
            <h2>Three easy steps.</h2>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <article key={step.number} className="info-card">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="services">
          <div className="section-heading centered">
            <span className="eyebrow">Houston Services</span>
            <h2>We haul away just about anything.</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <div className="service-icon" aria-hidden="true">✦</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell showcase">
          <div className="section-heading left">
            <span className="eyebrow">Before &amp; After</span>
            <h2>Real job results. Cleaner spaces, faster turnarounds.</h2>
          </div>

          <div className="showcase-grid">
            {beforeAfter.map((item, index) => (
              <article key={`${item.title}-${index}`} className="showcase-card">
                <div className="showcase-visual">
                  <span className="visual-badge">{item.label}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="reviews">
          <div className="section-heading centered">
            <span className="eyebrow">What Houston says</span>
            <h2>5-star service with transparent pricing.</h2>
          </div>

          <div className="review-grid">
            {reviews.map((review) => (
              <article key={review.name} className="review-card">
                <div className="review-head">
                  <div className="avatar">{review.name.charAt(0)}</div>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p>“{review.quote}”</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell pricing-section" id="pricing">
          <div className="section-heading centered">
            <span className="eyebrow">Simple pricing</span>
            <h2>Upfront pricing. No hidden fees.</h2>
          </div>

          <div className="pricing-grid">
            {pricingTiers.map((tier) => (
              <article key={tier.name} className="pricing-card">
                <span className="price-tag">{tier.kind}</span>
                <h3>{tier.name}</h3>
                <div className="price">{tier.price}</div>
                <p>{tier.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell coverage">
          <div className="coverage-copy">
            <span className="eyebrow">We come to you</span>
            <h2>Serving the Greater Houston metro and surrounding areas.</h2>
            <p>
              Not sure if we cover your area? Give us a call — chances are, we do. We help homeowners, landlords, and property managers across Houston and nearby communities.
            </p>
            <div className="phone-row">
              <a href="tel:7138069955">(713) 806-9955</a>
              <span>Mon–Fri 7am–7pm • Sat 7am–2pm</span>
            </div>
          </div>

          <div className="zones-wrap">
            <div className="zones-grid">
              {serviceAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell booking-section" id="booking">
          <div className="booking-copy">
            <span className="eyebrow">Book a pickup</span>
            <h2>Tell us what you need removed.</h2>
            <p>
              Pick a date and time that works for you. We’ll confirm your appointment and call 30–60 minutes before arrival.
            </p>
            <ul className="booking-points">
              <li>Same-day availability in many Houston ZIP codes</li>
              <li>Text a photo for a written estimate</li>
              <li>No payment surprises after the job</li>
            </ul>
          </div>

          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="field-grid">
              <label className="field">
                <span>Service</span>
                <select name="service" value={form.service} onChange={handleFieldChange}>
                  <option value="">Select service</option>
                  <option value="Furniture removal">Furniture removal</option>
                  <option value="Junk removal">Junk removal</option>
                  <option value="Garage clean out">Garage clean out</option>
                  <option value="Appliance removal">Appliance removal</option>
                  <option value="Construction debris">Construction debris</option>
                  <option value="Estate clean out">Estate clean out</option>
                </select>
                {errors.service && <small>{errors.service}</small>}
              </label>

              <label className="field">
                <span>Name</span>
                <input name="name" value={form.name} onChange={handleFieldChange} placeholder="Your full name" />
                {errors.name && <small>{errors.name}</small>}
              </label>

              <label className="field">
                <span>Phone</span>
                <input name="phone" value={form.phone} onChange={handleFieldChange} placeholder="(713) 555-0123" />
                {errors.phone && <small>{errors.phone}</small>}
              </label>

              <label className="field">
                <span>Email</span>
                <input type="email" name="email" value={form.email} onChange={handleFieldChange} placeholder="you@example.com" />
                {errors.email && <small>{errors.email}</small>}
              </label>

              <label className="field wide">
                <span>Address or ZIP</span>
                <input name="address" value={form.address} onChange={handleFieldChange} placeholder="123 Main St, Houston, TX or ZIP code" />
                {errors.address && <small>{errors.address}</small>}
              </label>

              <label className="field">
                <span>Preferred date</span>
                <input type="date" name="date" value={form.date} onChange={handleFieldChange} />
                {errors.date && <small>{errors.date}</small>}
              </label>

              <label className="field wide">
                <span>Project details</span>
                <textarea name="notes" value={form.notes} onChange={handleFieldChange} placeholder="Tell us what needs to be removed, the size of the pile, and any access notes." rows={4} />
              </label>
            </div>

            <button type="submit" className="primary-btn form-submit">Request My Pickup</button>

            {submitted && (
              <div className="success-box" role="status">
                Thanks! Your booking request has been prepared for review. We’ll contact you to confirm the date and time.
              </div>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-shell">
          <div>
            <div className="brand-name">One Stop Junk Removal</div>
            <p>Houston’s trusted choice for thoughtful, no-hassle junk removal.</p>
          </div>

          <div className="footer-links">
            <a href="tel:7138069955">Call</a>
            <a href="sms:7138069955">Text</a>
            <a href="#booking">Book</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
