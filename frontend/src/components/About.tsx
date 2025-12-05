export default function About() {
  return (
    <div className="hidden lg:block lg:absolute bottom-6 right-6 bg-dev-surface border border-dev-border shadow-xl rounded-xl p-4 w-72 text-sm text-dev-text-muted">
      <h3 className="text-lg font-semibold text-dev-text mb-2">About SafestCode</h3>
      <p className="mb-3 leading-relaxed">
        SafestCode is an AI-powered tool for reviewing, debugging, and securing code
        — built to help developers write better, safer software faster.
      </p>

      <div className="border-t border-dev-border pt-3 flex items-center gap-3">
        <img
          src="/zigla-avatar.png"
          alt="Zigla City"
          className="w-10 h-10 rounded-full border border-dev-border"
        />
        <div>
          <a
            href="https://github.com/ziglacity"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-dev-accent text-base hover:underline"
          >
            Zigla City
          </a>
          <p className="text-xs opacity-75">Developer & Creator</p>
        </div>
      </div>
    </div>
  );
}
