import { useState, useCallback } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/lure-logo.png";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { SplashScreen } from "@/components/effects/SplashScreen";
import brand14 from "@/assets/brand-14.png";
import brand15 from "@/assets/brand-15.png";
import brand16 from "@/assets/brand-16.png";
import brand17 from "@/assets/brand-17.png";
import brand18 from "@/assets/brand-18.png";
import brand19 from "@/assets/brand-19.png";
import brand20 from "@/assets/brand-20.png";
import brand21 from "@/assets/brand-21.png";
import brand22 from "@/assets/brand-22.png";

const brands = [brand14, brand15, brand16, brand17, brand18, brand19, brand20, brand21, brand22];

const WEBHOOK_URL = "https://hook.us1.make.com/msos7xoccrjh4xulvjnii7lsi28pghsf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calculadora de Custo/Hora — Lure Digital" },
      { name: "description", content: "Descubra quanto sua oficina precisa cobrar por hora para proteger margem e bater meta." },
      { property: "og:title", content: "Calculadora de Custo/Hora — Lure Digital" },
      { property: "og:description", content: "Ferramenta da Lure Digital para precificar a hora da sua oficina com clareza." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [investimento, setInvestimento] = useState("");
  const [faturamento, setFaturamento] = useState("");
  const [parceiro, setParceiro] = useState("");

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="relative min-h-screen overflow-hidden text-foreground" style={{ background: "var(--gradient-bg)" }}>
        <GoldParticles />

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:py-16">
        <header className="flex flex-col items-center text-center">
          <AnimatedSection delay={0}>
            <img
              src={logo}
              alt="Lure Digital"
              className="h-20 w-auto drop-shadow-[0_4px_20px_oklch(0.82_0.16_82/0.25)]"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--gold)] animate-pulse" />
              Ferramenta 100% gratuita
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h1 className="mt-8 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Descubra quanto sua oficina precisa{" "}
              <span
                className="bg-clip-text text-transparent shimmer-text"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                cobrar por hora
              </span>{" "}
              para vender com mais segurança, proteger sua margem e bater sua meta de faturamento.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Uma ferramenta desenvolvida pela{" "}
              <span className="font-semibold text-primary">Lure</span>, a maior máquina de aceleração de
              resultados do mercado automotivo da América Latina, para ajudar donos de oficina a entender seus
              custos, precificar com mais clareza e tomar decisões com base em números.
            </p>
          </AnimatedSection>
        </header>

        <AnimatedSection delay={0.6}>
          <section className="mx-auto mt-12 max-w-xl">
            <div
              className="spotlight-card glow-card-wrap rounded-2xl border border-border bg-card/40 p-6 shadow-2xl backdrop-blur sm:p-8"
              onMouseMove={handleCardMouseMove}
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                  Antes de começar, preencha seus dados
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Leva 30 segundos. Depois liberamos sua planilha.
                </p>
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch(WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain;charset=UTF-8" },
                    body: JSON.stringify({
                      nome,
                      email,
                      telefone,
                      empresa,
                      investimento,
                      faturamento,
                      parceiro,
                      enviado_em: new Date().toISOString(),
                    }),
                    keepalive: true,
                  }).catch(() => {});
                  navigate({ to: "/planilha" });
                }}
              >
                <Input
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="h-12 rounded-xl border-border bg-secondary/60 px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-1 focus-visible:ring-primary hover:bg-secondary/80"
                />
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-border bg-secondary/60 px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-1 focus-visible:ring-primary hover:bg-secondary/80"
                />

                <div className="flex h-12 overflow-hidden rounded-xl border border-border bg-secondary/60 transition-all duration-300 hover:bg-secondary/80 focus-within:ring-1 focus-within:ring-primary">
                  <div className="flex items-center border-r border-border bg-card/60 px-3 text-sm text-muted-foreground">
                    +55
                  </div>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="h-full flex-1 border-0 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>

                <Input
                  placeholder="Nome da sua empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="h-12 rounded-xl border-border bg-secondary/60 px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-1 focus-visible:ring-primary hover:bg-secondary/80"
                />

                <Select value={investimento} onValueChange={setInvestimento}>
                  <SelectTrigger className="h-12 rounded-xl border-border bg-secondary/60 px-4 text-sm text-foreground transition-all duration-300 hover:bg-secondary/80 focus:ring-1 focus:ring-primary data-[placeholder]:text-muted-foreground">
                    <SelectValue placeholder="Qual é o seu investimento em marketing por mês?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-popover text-popover-foreground">
                    <SelectItem value="0-600">0 a 600 reais por mês</SelectItem>
                    <SelectItem value="601-1200">601 a 1.200 reais por mês</SelectItem>
                    <SelectItem value="1201-2500">1.201 a 2.500 reais por mês</SelectItem>
                    <SelectItem value="2501-4000">2.501 a 4.000 reais por mês</SelectItem>
                    <SelectItem value="4001-10000">4.001 a 10.000 reais por mês</SelectItem>
                    <SelectItem value="10k+">Mais de 10 mil por mês</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={faturamento} onValueChange={setFaturamento}>
                  <SelectTrigger className="h-12 rounded-xl border-border bg-secondary/60 px-4 text-sm text-foreground transition-all duration-300 hover:bg-secondary/80 focus:ring-1 focus:ring-primary data-[placeholder]:text-muted-foreground">
                    <SelectValue placeholder="Qual o seu faturamento mensal?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-popover text-popover-foreground">
                    <SelectItem value="ate-20k">Até 20 mil</SelectItem>
                    <SelectItem value="20-40k">De 20 mil até 40 mil</SelectItem>
                    <SelectItem value="40-60k">De 40 mil até 60 mil</SelectItem>
                    <SelectItem value="60-80k">De 60 mil até 80 mil</SelectItem>
                    <SelectItem value="80-100k">De 80 mil até 100 mil</SelectItem>
                    <SelectItem value="100-150k">De 100 mil até 150 mil</SelectItem>
                    <SelectItem value="150-250k">De 150 mil até 250 mil</SelectItem>
                    <SelectItem value="250-400k">De 250 mil até 400 mil</SelectItem>
                    <SelectItem value="400-600k">De 400 mil até 600 mil</SelectItem>
                    <SelectItem value="600k-1m">De 600 mil até 1 milhão</SelectItem>
                    <SelectItem value="1m+">Mais de 1 milhão</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={parceiro} onValueChange={setParceiro}>
                  <SelectTrigger className="h-12 rounded-xl border-border bg-secondary/60 px-4 text-sm text-foreground transition-all duration-300 hover:bg-secondary/80 focus:ring-1 focus:ring-primary data-[placeholder]:text-muted-foreground">
                    <SelectValue placeholder="Você já é parceiro da Lure Digital?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-popover text-popover-foreground">
                    <SelectItem value="sim">Sim, já sou parceiro</SelectItem>
                    <SelectItem value="nao">Não, ainda não sou</SelectItem>
                    <SelectItem value="ja-fui">Já fui parceiro</SelectItem>
                    <SelectItem value="nao-sei">Não sei / Não tenho certeza</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="submit"
                  className="btn-cta group mt-2 h-12 w-full rounded-xl text-base font-semibold text-primary-foreground"
                >
                  Acesse sua planilha
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Clique para abrir sua planilha no Google Sheets
                </p>
              </form>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section className="relative z-10 mx-auto mt-20 w-full max-w-6xl overflow-hidden px-4 pb-16 pt-10">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Marcas que confiam no nosso trabalho
            </p>
            <div className="group relative w-full overflow-hidden">
              <div className="flex w-max animate-marquee gap-12 will-change-transform group-hover:[animation-play-state:paused]">
                {[...brands, ...brands].map((b, i) => (
                  <img
                    key={i}
                    src={b}
                    alt="Marca parceira"
                    className="h-12 w-auto max-w-none shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100 sm:h-16"
                  />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
    </>
  );
}
