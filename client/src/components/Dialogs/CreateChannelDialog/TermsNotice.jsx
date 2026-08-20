// Styles
import "./TermsNotice.css";

// Component
export default function TermsNotice() {
  return (
    <div className="yt-terms">

      <p>
        By clicking <strong>Create channel</strong>,
        you agree to YouTube's{" "}

        <a href="/">
          Terms of Service
        </a>
        .

      </p>

      <p>

        Changes made to your name and profile
        picture are visible only on YouTube and
        not other Google services. Learn more.

      </p>

    </div>
  );
}