"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/site.config";
import { CATEGORIES, REVIEWS, FEATURES, won, minPrice, type Item } from "@/data";

/* 삼삼한꽃배달 — 프리미엄 톤(아이보리·딥그린·샴페인 골드, 명조 제목).
   상품을 누르면 '금액 상이' 안내 팝업을 먼저 띄우고, 확인 시 전화로 연결합니다. */

const SECTIONS = [
  { id: "products", label: "컬렉션" },
  { id: "about", label: "약속" },
  { id: "reviews", label: "고객 이야기" },
  { id: "contact", label: "상담" },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.3 21 3 12.7 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1.1l-2.2 2.1z" />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  if (SITE.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={SITE.logo} alt={SITE.name} className="h-[60px] sm:h-16 w-auto object-contain" />;
  }
  return (
    <span className="flex flex-col items-start leading-none">
      <span
        className={`font-serif-ko text-[22px] sm:text-[26px] font-extrabold ${
          light ? "text-white" : "text-[var(--ink)]"
        }`}
      >
        삼삼한<span className="text-[var(--gold)]">꽃</span>배달
      </span>
      <span
        className={`mt-1 text-[9px] sm:text-[10px] tracking-[0.35em] ${
          light ? "text-[var(--gold-light)]" : "text-[var(--gold)]"
        }`}
      >
        PREMIUM FLOWER
      </span>
    </span>
  );
}

/* 서비스 약속 — data.ts FEATURES 순서와 맞춘 라인 아이콘 */
const FEATURE_ICONS = [
  <svg key="clock" viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" />
  </svg>,
  <svg key="map" viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>,
  <svg key="flower" viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="9" r="2.2" />
    <path d="M12 6.8c0-3 3.5-3 3.5-.5S12 9 12 9s-3.5-.2-3.5-2.7 3.5-2.5 3.5.5z" />
    <path d="M14.2 9c3 0 3 3.5.5 3.5S12 9 12 9M9.8 9c-3 0-3 3.5-.5 3.5S12 9 12 9" />
    <path d="M12 11.5V21M12 17c-2-2.5-4.5-2.5-5.5-2M12 18c2-2.5 4.5-2.5 5.5-2" strokeLinecap="round" />
  </svg>,
];

export default function Home() {
  const [active, setActive] = useState("products");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<Item | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tel = `tel:${SITE.phoneHref}`;

  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  // 팝업이 열려 있는 동안 배경 스크롤 잠금 + ESC 로 닫기
  useEffect(() => {
    if (!notice) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNotice(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [notice]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggle = (key: string) => {
    const next = openKey === key ? null : key;
    setOpenKey(next);
    if (next) {
      window.setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }
  };

  const opened = CATEGORIES.find((c) => c.key === openKey) ?? null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--line)]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={`${SITE.name} 홈으로`}
            className="py-1.5"
          >
            <Logo />
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`relative px-4 py-3 text-sm tracking-wide transition ${
                    active === s.id
                      ? "text-[var(--ink)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {s.label}
                  <span
                    className={`absolute left-4 right-4 bottom-2 h-px bg-[var(--gold)] transition-opacity ${
                      active === s.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              </li>
            ))}
            <li>
              <a
                href={tel}
                className="ml-3 flex items-center gap-2 px-5 py-3 bg-[var(--ink)] text-white text-sm font-semibold tracking-wide hover:bg-[var(--ink-2)] transition"
              >
                <PhoneIcon className="w-4 h-4 text-[var(--gold-light)]" />
                <span className="tabular-nums">{SITE.phone}</span>
              </a>
            </li>
          </ul>

          <div className="md:hidden flex items-center gap-1">
            <a
              href={tel}
              className="flex items-center gap-1.5 px-4 py-3 bg-[var(--ink)] text-white text-sm font-semibold"
            >
              <PhoneIcon className="w-4 h-4 text-[var(--gold-light)]" />
              전화
            </a>
            <button
              className="p-3.5 -mr-1.5"
              aria-label="메뉴"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="block w-6 h-px bg-[var(--ink)] mb-1.5" />
              <span className="block w-6 h-px bg-[var(--ink)] mb-1.5" />
              <span className="block w-4 h-px bg-[var(--ink)] ml-auto" />
            </button>
          </div>
        </nav>
        {menuOpen && (
          <ul className="md:hidden bg-[var(--background)] border-t border-[var(--line)] px-4 py-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`w-full text-left px-3 py-3.5 text-base border-b border-[var(--line)] last:border-0 ${
                    active === s.id ? "text-[var(--gold)] font-semibold" : "text-[var(--ink)]"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main className="flex-1 pt-[72px]">
        {/* 컬렉션(상품) — 첫 화면 */}
        <section id="products" className="px-3 sm:px-6 pt-5 sm:pt-12 pb-12 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-5 sm:mb-10">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] text-[var(--gold)]">
                SAMSAM FLOWER COLLECTION
              </p>
              <h1 className="font-serif-ko mt-2 sm:mt-3 text-2xl sm:text-4xl font-extrabold text-[var(--ink)]">
                마음의 품격을 전합니다
              </h1>
              <div className="gold-rule h-px w-24 mx-auto mt-3 sm:mt-5" />
              <p className="mt-2 sm:mt-4 text-[12px] sm:text-base text-[var(--muted)]">
                전국 당일배송 · 365일 · 카테고리를 눌러 둘러보세요
              </p>
            </div>

            <div className="grid grid-cols-2 grid-rows-3 gap-2 h-[calc(100dvh-250px)] min-h-[380px] sm:h-auto sm:min-h-0 sm:grid-rows-2 sm:grid-cols-3 sm:gap-5">
              {CATEGORIES.map((cat, idx) => {
                const on = openKey === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => toggle(cat.key)}
                    aria-expanded={on}
                    className="group relative h-full w-full sm:aspect-[4/5] overflow-hidden text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/${cat.items[0].folder}/${cat.items[0].name}.jpg`}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0f1412]/85 via-[#0f1412]/25 to-transparent" />
                    <span
                      className={`absolute inset-2 sm:inset-3 border transition-colors duration-300 pointer-events-none ${
                        on ? "border-[var(--gold-light)]" : "border-white/25 group-hover:border-white/50"
                      }`}
                    />
                    <span className="absolute top-3.5 left-4 sm:top-6 sm:left-6 text-[10px] sm:text-xs tracking-[0.3em] text-white tabular-nums [text-shadow:0_1px_3px_rgba(0,0,0,.6)]">
                      0{idx + 1}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                      <span className="font-serif-ko block text-white font-bold text-lg sm:text-[28px] leading-tight break-keep">
                        {cat.name}
                      </span>
                      <span className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-[var(--gold-light)] text-[11px] sm:text-sm">
                        <span className="tabular-nums">{won(minPrice(cat))}~</span>
                        <span className="text-white/40">|</span>
                        <span className="text-white/75">{cat.items.length}종</span>
                      </span>
                    </span>
                    <span
                      className={`absolute top-3 right-3 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 flex items-center justify-center transition-transform duration-300 ${
                        on ? "rotate-45 bg-[var(--gold)] border-[var(--gold)]" : "bg-black/10"
                      }`}
                    >
                      <span className="block w-3 h-px bg-white absolute" />
                      <span className="block w-px h-3 bg-white absolute" />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 펼쳐지는 상세 상품 */}
            <div
              ref={panelRef}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                opened ? "grid-rows-[1fr] mt-5" : "grid-rows-[0fr] mt-0"
              }`}
            >
              <div className="overflow-hidden">
                {opened && (
                  <div className="bg-[var(--surface)] border border-[var(--line)] p-4 sm:p-8">
                    <div className="flex items-end justify-between gap-3 pb-4 border-b border-[var(--line)]">
                      <div>
                        <p className="text-[10px] sm:text-xs tracking-[0.35em] text-[var(--gold)]">
                          COLLECTION
                        </p>
                        <h2 className="font-serif-ko mt-1 text-xl sm:text-3xl font-extrabold text-[var(--ink)]">
                          {opened.name}
                        </h2>
                        <p className="mt-1 text-[13px] sm:text-base text-[var(--muted)]">
                          {opened.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => setOpenKey(null)}
                        className="shrink-0 px-3 py-3.5 -mr-1 -mb-1 text-[13px] sm:text-sm text-[var(--muted)] hover:text-[var(--ink)]"
                      >
                        닫기 ✕
                      </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
                      {opened.items.map((it) => (
                        <button
                          key={`${it.folder}-${it.name}`}
                          onClick={() => setNotice(it)}
                          className="group text-left"
                        >
                          <div className="aspect-[4/5] overflow-hidden bg-[var(--background)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`/${it.folder}/${it.name}.jpg`}
                              alt={it.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="pt-3 pb-1 text-center">
                            <p className="text-[12px] sm:text-sm text-[var(--ink)] break-keep leading-tight min-h-[2.2rem] flex items-center justify-center">
                              {it.name}
                            </p>
                            <p className="mt-1 text-[13px] sm:text-base font-semibold text-[var(--gold)] tabular-nums">
                              {won(it.price)}~
                            </p>
                            <p className="mt-2 inline-flex items-center gap-1 text-[11px] sm:text-xs text-[var(--muted)] border-b border-transparent group-hover:border-[var(--gold)] group-hover:text-[var(--ink)] transition">
                              <PhoneIcon className="w-3 h-3" />
                              전화 주문
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="mt-6 text-center text-[11px] sm:text-sm text-[var(--muted)]">
                      * 제품별 금액은 상이할 수 있으며, 정확한 금액은 상담 시 안내해 드립니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 약속 */}
        <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--ink)] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] text-[var(--gold-light)]">
                OUR PROMISE
              </p>
              <h2 className="font-serif-ko mt-3 text-2xl sm:text-4xl font-extrabold leading-snug">
                가장 중요한 순간,
                <br />
                <span className="text-[var(--gold-light)]">늦지 않게 정성껏</span>
              </h2>
              <div className="gold-rule h-px w-24 mx-auto mt-6" />
              <p className="mt-6 text-sm sm:text-lg text-white/65">
                {SITE.name}은 365일 전국 어디든 당일 배송을 약속합니다.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 border border-white/10">
              {FEATURES.map((f, i) => (
                <div
                  key={f.t}
                  className="p-9 sm:p-11 text-center border-white/10 border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <div className="flex justify-center text-[var(--gold-light)] mb-5">
                    {FEATURE_ICONS[i]}
                  </div>
                  <h3 className="font-serif-ko text-lg sm:text-xl font-bold mb-2">{f.t}</h3>
                  <p className="text-sm sm:text-base text-white/60">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 고객 이야기 */}
        <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] text-[var(--gold)]">
                TESTIMONIALS
              </p>
              <h2 className="font-serif-ko mt-3 text-2xl sm:text-4xl font-extrabold text-[var(--ink)]">
                고객님이 전해주신 이야기
              </h2>
              <div className="gold-rule h-px w-24 mx-auto mt-6" />
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {REVIEWS.map((r) => (
                <figure
                  key={r.name}
                  className="relative p-8 bg-[var(--surface)] border border-[var(--line)]"
                >
                  <span className="font-serif-ko absolute top-3 right-6 text-6xl leading-none text-[var(--gold)]/25">
                    “
                  </span>
                  <div className="text-[var(--gold)] text-sm tracking-[0.2em] mb-3">★★★★★</div>
                  <h3 className="font-serif-ko font-bold text-base sm:text-lg text-[var(--ink)] mb-3">
                    {r.title}
                  </h3>
                  <blockquote className="text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed">
                    {r.body}
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-[var(--line)] text-xs tracking-wide text-[var(--muted)]">
                    {r.name} 고객님
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 상담 */}
        <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#efe9de]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] text-[var(--gold)]">
              CONSULTATION
            </p>
            <h2 className="font-serif-ko mt-3 text-2xl sm:text-4xl font-extrabold text-[var(--ink)] leading-snug">
              전화 한 통으로
              <br />
              품격 있는 마음을 전하세요
            </h2>
            <p className="mt-5 text-sm sm:text-lg text-[var(--muted)]">
              상담부터 제작·배송까지 전담 상담사가 바로 도와드립니다.
            </p>

            <a
              href={tel}
              className="group mt-10 block bg-[var(--ink)] text-white p-9 sm:p-14 relative overflow-hidden"
            >
              <span className="absolute inset-3 border border-[var(--gold)]/40 pointer-events-none" />
              <span className="text-[11px] sm:text-sm tracking-[0.3em] text-[var(--gold-light)]">
                대표번호 · 365일 상담
              </span>
              <span className="font-serif-ko block mt-5 text-4xl sm:text-6xl font-extrabold tracking-tight tabular-nums">
                {SITE.phone}
              </span>
              <span className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--gold)] text-white font-semibold text-base sm:text-lg group-hover:bg-[#967540] transition">
                <PhoneIcon className="w-5 h-5" />
                지금 바로 전화하기
              </span>
              <p className="mt-4 text-xs sm:text-sm text-white/50">번호를 누르면 바로 연결됩니다</p>
            </a>

            <div className="mt-8 grid sm:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] text-sm">
              {[
                { t: "365일 연중무휴", d: "명절·주말에도 상담 가능" },
                { t: "당일 배송 접수", d: "오후 늦은 주문도 상담해 드립니다" },
                { t: "전국 배송", d: "도서·산간 일부 지역 제외" },
              ].map((v) => (
                <div key={v.t} className="bg-[var(--background)] p-5">
                  <p className="font-serif-ko font-bold text-[var(--ink)]">{v.t}</p>
                  <p className="mt-1 text-[var(--muted)] text-xs sm:text-sm">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <a
        href={tel}
        aria-label={`${SITE.phone} 전화 상담`}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 pl-4 pr-5 py-3.5 sm:py-4 rounded-full bg-[var(--ink)] text-white font-semibold shadow-xl shadow-black/20 ring-1 ring-[var(--gold)]/60 hover:bg-[var(--ink-2)] transition"
      >
        <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold-light)]" />
        <span className="text-sm sm:text-base tabular-nums">{SITE.phone}</span>
      </a>

      <footer className="bg-[var(--background)] border-t border-[var(--line)] pt-14 pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          {SITE.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={SITE.logo} alt={SITE.name} className="h-28 sm:h-32 w-auto object-contain" />
          ) : (
            <Logo />
          )}
          <div className="gold-rule h-px w-24 mx-auto mt-6" />
          <p className="mt-6 text-sm text-[var(--muted)] break-keep">
            전국 당일배송 · 축하화환 · 근조화환 · 꽃다발 · 꽃바구니 · 난
          </p>
          <a
            href={tel}
            className="font-serif-ko mt-4 inline-flex items-center gap-2 px-3 py-2 text-2xl font-extrabold text-[var(--ink)] hover:text-[var(--gold)] transition tabular-nums"
          >
            <PhoneIcon className="w-6 h-6 text-[var(--gold)]" />
            {SITE.phone}
          </a>
          <p className="mt-6 text-xs text-[var(--muted)]/70">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 상품 클릭 → 금액 안내 팝업 → 전화 연결 */}
      {notice && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-[#0f1412]/60 backdrop-blur-sm anim-fade"
          onClick={() => setNotice(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notice-title"
            className="anim-modal relative w-full max-w-sm bg-[var(--surface)] text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-7 pt-9 pb-7">
              <div className="absolute inset-x-2 top-2 bottom-0 border border-b-0 border-[var(--gold)]/30 pointer-events-none" />
              <p className="text-[10px] tracking-[0.4em] text-[var(--gold)]">NOTICE</p>
              <h3
                id="notice-title"
                className="font-serif-ko mt-2 text-xl font-extrabold text-[var(--ink)] break-keep"
              >
                {notice.name}
              </h3>
              <div className="gold-rule h-px w-16 mx-auto mt-4" />
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--foreground)] break-keep">
                {SITE.priceNotice}
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                대표번호{" "}
                <span className="font-semibold text-[var(--ink)] tabular-nums">{SITE.phone}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-[var(--line)]">
              <button
                onClick={() => setNotice(null)}
                className="py-4 text-[15px] text-[var(--muted)] hover:bg-[var(--background)] transition"
              >
                취소
              </button>
              <a
                href={tel}
                onClick={() => setNotice(null)}
                autoFocus
                className="py-4 flex items-center justify-center gap-1.5 bg-[var(--ink)] text-white text-[15px] font-semibold hover:bg-[var(--ink-2)] transition"
              >
                <PhoneIcon className="w-4 h-4 text-[var(--gold-light)]" />
                전화 연결
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
