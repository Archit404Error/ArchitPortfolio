const buttonBaseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

export const button = {
  primary: `${buttonBaseClasses} bg-brand-600 text-white shadow-[0_8px_24px_-10px_rgb(0_82_255/0.6)] hover:bg-brand-700 hover:shadow-[0_12px_28px_-10px_rgb(0_82_255/0.7)]`,
  secondary: `${buttonBaseClasses} border border-ink-300 bg-surface text-ink-900 hover:border-brand-400 hover:text-brand-700`,
  ghost: `${buttonBaseClasses} text-ink-700 hover:bg-ink-100 hover:text-ink-900`,
  secondaryDark: `${buttonBaseClasses} border border-white/15 bg-white/5 text-paper hover:border-brand-400 hover:bg-white/10`,
  ghostDark: `${buttonBaseClasses} text-ink-300 hover:bg-white/10 hover:text-paper`,
  sizes: {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm sm:text-[15px]",
    lg: "h-12 px-6 text-base",
  },
} as const;
