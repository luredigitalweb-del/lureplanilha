import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileSpreadsheet, ArrowRight, Check } from "lucide-react";
import logo from "@/assets/lure-logo.png";
import { GoldParticles } from "@/components/effects/GoldParticles";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1YMadcn6XaXxGXfb1EpCeSBmvgYk9mQLf/edit?pli=1&gid=645027229#gid=645027229";

const REDIRECT_MS = 4200;

const STEPS = [
  "Validando seus dados",
  "Gerando sua planilha",
  "Abrindo o Google Sheets",
];

export const Route = createFileRoute("/planilha")({
  head: () => ({
    meta: [
      { title: "Abrindo sua planilha — Lure Digital" },
      {
        name: "description",
        content: "Estamos preparando sua planilha. Você será redirecionado em instantes.",
      },
    ],
  }),
  component: Planilha,
});

function Planilha() {
  const [count, setCount] = useState(Math.ceil(REDIRECT_MS / 1000));
  const [step, setStep] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, REDIRECT_MS - elapsed);
      setCount(Math.ceil(remaining / 1000));
      setStep(Math.min(STEPS.length - 1, Math.floor((elapsed / REDIRECT_MS) * STEPS.length)));
    }, 200);

    const go = window.setTimeout(() => {
      window.location.href = SHEET_URL;
    }, REDIRECT_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(go);
    };
  }, []);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 text-foreground"
      style={{ background: "var(--gradient-bg)" }}
    >
      <GoldParticles />

      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-gold)", opacity: 0.16 }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <img
          src={logo}
          alt="Lure Digital"
          className="h-14 w-auto animate-redirect-float drop-shadow-[0_4px_20px_oklch(0.82_0.16_82/0.25)]"
        />

        {/* Spinning ring with spreadsheet icon */}
        <div className="relative mt-12 flex h-44 w-44 items-center justify-center">
          {/* outer pulse halo */}
          <div
            className="absolute inset-2 animate-redirect-halo rounded-full"
            style={{ boxShadow: "0 0 60px -10px var(--gold)" }}
          />

          {/* conic gold ring */}
          <div
            className="absolute inset-0 animate-redirect-spin rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, var(--gold) 300deg, transparent 360deg)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 7px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 7px))",
            }}
          />

          {/* inner disc */}
          <div className="relative flex h-28 w-28 animate-redirect-pop items-center justify-center rounded-full border border-border bg-card/60 shadow-[0_0_50px_-10px_var(--gold)] backdrop-blur">
            <FileSpreadsheet className="h-12 w-12 animate-redirect-float text-primary" />
          </div>
        </div>

        <h1 className="mt-10 text-2xl font-bold leading-tight sm:text-3xl">
          Preparando sua{" "}
          <span
            className="bg-clip-text text-transparent shimmer-text"
            style={{ backgroundImage: "var(--gradient-gold)" }}
          >
            planilha
          </span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tudo certo! Estamos te levando ao Google Sheets.
        </p>

        {/* Steps */}
        <ul className="mt-7 flex w-full flex-col gap-2.5 text-left">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className="flex items-center gap-3 text-sm transition-all duration-500"
                style={{ opacity: i <= step ? 1 : 0.4 }}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : active ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                  )}
                </span>
                <span className={done || active ? "text-foreground/90" : "text-muted-foreground"}>
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Progress bar */}
        <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
          <div
            className="h-full animate-redirect-progress rounded-full"
            style={{ background: "var(--gradient-gold)", animationDuration: `${REDIRECT_MS}ms` }}
          />
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Redirecionando em {count}s
        </p>

        <a
          href={SHEET_URL}
          className="btn-cta group mt-8 inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-semibold text-primary-foreground"
        >
          Abrir planilha agora
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        <p className="mt-4 text-xs text-muted-foreground">
          Não abriu?{" "}
          <a href={SHEET_URL} className="text-primary underline-offset-4 hover:underline">
            Clique aqui
          </a>
        </p>
      </div>
    </div>
  );
}
