import { CRYPTO_DONATION_URL, KO_FI_URL } from "../../content/links";

export function SupportFooter() {
  return (
    <footer className="border-t border-white/8 px-6 py-8 text-sm text-white/52 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div>GARDA governed workflows for AI coding agents.</div>
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
