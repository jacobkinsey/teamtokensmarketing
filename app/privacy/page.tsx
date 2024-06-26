import styles from "./privacy.module.css";

export default function Privacy() {
  return (
    <div className={styles.privacyContainer}>
      <h1>Privacy Policy for TeamTokens</h1>
      <p>
        <strong>Effective Date:</strong> September 30th, 2023
      </p>

      <h2>Introduction and Overview</h2>
      <p>
        Welcome to TeamTokens, the mobile application developed by TeamTokens.
        This Privacy Policy outlines how we collect, use, store, and protect
        your personal information. We are committed to safeguarding your privacy
        while providing you with a seamless and secure experience.
      </p>

      <h2>Data Collection</h2>
      <p>We collect the following personal information from users:</p>
      <ul>
        <li>Email address</li>
        <li>First name</li>
        <li>Last name</li>
      </ul>

      <h2>Use of Personal Information</h2>
      <p>
        We collect and process your personal information for the sole purpose of
        enabling you to log in and use the TeamTokens app.
      </p>

      <h2>Data Storage and Security</h2>
      <p>
        Your data is stored on a database hosted by a major cloud service
        provider, where sensitive information is encrypted to ensure security.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We do not share your data with any third-party services or partners.
        Your information remains confidential and is used exclusively for the
        operation of TeamTokens.
      </p>

      <h2>User Rights</h2>
      <p>
        You have the right to access, update, and delete your personal
        information through the app. The process for exercising these rights is
        straightforward, and your data will be handled in accordance with your
        requests.
      </p>

      <p>
        We retain your data for the duration of your use of TeamTokens and as
        long as necessary to comply with legal obligations.
      </p>

      <h2>Cookies and Tracking</h2>
      <p>TeamTokens does not use cookies or tracking technologies.</p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        TeamTokens is not intended for use by children under 13 years of age. We
        do not knowingly collect personal information from minors without
        parental consent.
      </p>

      <h2>Updates to the Privacy Policy</h2>

      <p>
        Users will be informed of any changes to this Privacy Policy via email.
        The effective date of the current privacy policy is September 30th,
        2023.
      </p>

      <h2>Contact Information</h2>
      <p>
        If you have any questions, concerns, or requests regarding your privacy
        or this Privacy Policy, please contact us at:
      </p>
      <p className={styles.contactInfo}>TeamTokens jake@teamtokens.dev</p>
    </div>
  );
}
