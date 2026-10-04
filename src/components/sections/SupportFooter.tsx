import { CRYPTO_DONATION_URL, KO_FI_URL } from "../../content/links";

export function SupportFooter() {
  return (
    <footer className="border-t border-white/8 px-6 pb-28 pt-8 text-sm text-white/52 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>GARDA governed workflows for AI coding agents.</span>
          <nav aria-label="Legal" className="flex items-center gap-2">
            <a href="https://garda-studio.com/legal-notice" className="text-cyan-100 transition hover:text-white">
              Legal notice
            </a>
            <span aria-hidden="true">·</span>
            <a href="https://garda-studio.com/privacy" className="text-cyan-100 transition hover:text-white">
              Privacy
            </a>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span>Support GARDA:</span>
          <a href={KO_FI_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-100 transition hover:text-white">
            Ko-fi
          </a>
          <span aria-hidden="true">·</span>
          <a href={CRYPTO_DONATION_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-100 transition hover:text-white">
            Crypto
          </a>
        </div>
      </div>
    </footer>
  );
}
