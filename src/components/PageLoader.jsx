import brandLogo from '../assets/images/Bachelor Bari Bilingual Logo.png';

export default function PageLoader({ message = 'আপনার জন্য সুন্দর বাসা খুঁজে আনা হচ্ছে' }) {
  return (
    <div className="grid min-h-[65vh] place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_#ecfdf5_0%,_#fafaf9_56%,_#f5f5f4_100%)] px-5 py-16">
      <div role="status" aria-live="polite" className="flex flex-col items-center text-center">
        <div className="relative mb-8 grid h-28 w-28 place-items-center">
          <span className="absolute inset-0 rounded-full border border-emerald-200/80" />
          <span className="absolute inset-1 rounded-full border-[3px] border-emerald-100 border-t-emerald-700 animate-spin" />
          <span className="absolute inset-3 rounded-full bg-white/80 shadow-[0_12px_35px_-18px_rgba(6,78,59,0.55)]" />
          <img
            src={brandLogo.src}
            alt=""
            className="relative z-10 h-14 w-14 rounded-xl object-cover object-left shadow-sm"
          />
          <span className="absolute -right-1 top-3 h-2.5 w-2.5 animate-ping rounded-full bg-amber-400" />
          <span className="absolute -right-1 top-3 h-2.5 w-2.5 rounded-full bg-amber-500" />
        </div>

        <p className="text-lg font-bold tracking-tight text-emerald-950 sm:text-xl">{message}</p>
        <p className="mt-2 text-sm text-stone-500">BachelorBari প্রস্তুত হচ্ছে</p>

        <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-700"
              style={{ animationDelay: `${dot * 140}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
