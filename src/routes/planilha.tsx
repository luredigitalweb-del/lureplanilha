import { createFileRoute } from "@tanstack/react-router";
import { FileSpreadsheet, Copy, Download, Check } from "lucide-react";
import logo from "@/assets/lure-logo.png";
import { GoldParticles } from "@/components/effects/GoldParticles";

const SHEET_ID = "1YMadcn6XaXxGXfb1EpCeSBmvgYk9mQLf";
// "/copy" opens Google's "Make a copy" dialog, giving each person their own
// editable copy in their Drive (no conflicts on the shared file).
const COPY_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/copy`;
// "/export?format=xlsx" downloads the spreadsheet as an Excel file.
const EXPORT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;

export const Route = createFileRoute("/planilha")({
  head: () => ({
    meta: [
      { title: "Sua planilha está pronta — Lure Digital" },
      {
        name: "description",
        content: "Faça a sua cópia da planilha ou baixe em Excel para usar sem conflitos.",
      },
    ],
  }),
  component: Planilha,
});

function Planilha() {
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

        {/* Ring with spreadsheet icon + success check */}
        <div className="relative mt-12 flex h-44 w-44 items-center justify-center">
          <div
            className="absolute inset-2 animate-redirect-halo rounded-full"
            style={{ boxShadow: "0 0 60px -10px var(--gold)" }}
          />

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

          <div className="relative flex h-28 w-28 animate-redirect-pop items-center justify-center rounded-full border border-border bg-card/60 shadow-[0_0_50px_-10px_var(--gold)] backdrop-blur">
            <FileSpreadsheet className="h-12 w-12 text-primary" />
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-lg">
              <Check className="h-4 w-4" />
            </span>
          </div>
        </div>

        <h1 className="mt-10 text-2xl font-bold leading-tight sm:text-3xl">
          Sua{" "}
          <span
            className="bg-clip-text text-transparent shimmer-text"
            style={{ backgroundImage: "var(--gradient-gold)" }}
          >
            planilha
          </span>{" "}
          está pronta!
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Para usar sem conflitos, faça a <strong className="text-foreground/90">sua cópia</strong> —
          assim você edita só a sua, sem mexer na de outras pessoas.
        </p>

        {/* Primary: make a copy */}
        <a
          href={COPY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta group mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-base font-semibold text-primary-foreground"
        >
          <Copy className="mr-2 h-5 w-5" />
          Fazer minha cópia no Google Sheets
        </a>

        {/* Secondary: download xlsx */}
        <a
          href={EXPORT_URL}
          className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-card/40 px-6 text-base font-semibold text-foreground backdrop-blur transition-colors duration-300 hover:bg-card/70"
        >
          <Download className="mr-2 h-5 w-5 text-primary" />
          Baixar em Excel (.xlsx)
        </a>

        <p className="mt-5 text-xs text-muted-foreground">
          A opção de cópia abre no seu Google Drive (precisa estar logado numa conta Google). O Excel
          baixa direto no seu dispositivo.
        </p>
      </div>
    </div>
  );
}
