export default function PrivacyPolicy() {
  return (
    <section className="page-section interior-hero">
      <p className="eyebrow">Privacy policy</p>
      <h1>We protect data with care.</h1>
      <p className="lede">
        This placeholder policy is intended for your final legal wording. Replace it with your approved copy before public launch.
      </p>

      <div className="about-text" style={{ maxWidth: '760px', marginTop: '2rem' }}>
        <p>
          We collect only the information necessary to provide our services, support account access, and improve the experience for users.
          This may include basic profile information, contact details, and technical usage data needed to maintain security and reliability.
        </p>
        <p>
          Passwords are stored using strong one-way hashing with bcrypt, and access to personal data is restricted to authorised personnel only.
          We do not sell personal data and we do not use user information for unrelated marketing activity without your consent.
        </p>
        <p>
          If you have questions about your data, your rights, or how information is handled, contact the organisation directly at hello@lewedi.org.
        </p>
      </div>
    </section>
  );
}
