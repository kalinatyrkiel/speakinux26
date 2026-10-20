import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import tweetImage from './assets/joanna-maciejewska-tweet.png'
import coIntelligenceCover from './assets/co-intelligence-book-cover.png'
import bookCover from './assets/reverse-centaur-book-cover.png'
import exampleInpostLockers from './assets/example-inpost-lockers.png'
import exampleCoffeedeskDiscount from './assets/example-coffeedesk-discount.png'
import zendeskAiPrompts from './assets/zendesk-ai-prompts.png'
import zendeskAutoAssist from './assets/zendesk-auto-assist.png'
import zendeskWhySuggestion from './assets/zendesk-why-suggestion.png'
import steerWithoutInterrupting from './assets/steer-without-interrupting.png'
import blankBoxAnxiety from './assets/blank-box-anxiety.png'
import notionAiFull from './assets/notion-ai-full.png'
import modeScreens from './assets/mode-screens.png'
import modeDialogue from './assets/mode-dialogue.png'
import modePrompts from './assets/mode-prompts.png'
import exampleBielikDisclaimer from './assets/example-bielik-disclaimer.png'
import exampleDisclaimerSuggestionVerify from './assets/example-disclaimer-suggestion-verify.png'
import linkedinQr from './assets/linkedin-qr.jpg'
import thesisChatbot from './assets/thesis-chatbot.png'
import './App.css'

function CentaurIcon() {
  return (
    <svg className="mode-icon" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="10" y="29" width="30" height="14" rx="7" fill="currentColor" />
      <path
        d="M38 35 45.5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M46 18 55 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M44 15.5 43 8l6 5.5Z" fill="currentColor" />
      <path
        d="M15 43.5 14 56M23 44.5 22 56M31 44.5 32.5 56M38 43.5 40 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M10.5 32C6 34 4 39 4.5 45"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CyborgIcon() {
  return (
    <svg className="mode-icon" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="7" r="3" fill="currentColor" />
      <path
        d="M32 10v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <rect
        x="14"
        y="16"
        width="36"
        height="28"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
      />
      <circle cx="25" cy="27" r="3.2" fill="currentColor" />
      <circle cx="39" cy="27" r="3.2" fill="currentColor" />
      <path
        d="M25 36h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M22 50h20M22 50v6M42 50v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UxSpeakInWordmark() {
  return <span className="slide-chrome-label">speak in UX</span>
}

function BlankBoxAnxiety({ build }: { build: number }) {
  return (
    <div className="blank-box-layout">
      <div className="blank-box-copy">
        <h2 className="slide-title wide-title">
          O co w ogóle mam pytać?
        </h2>
        {build >= 1 && (
          <p className="body-copy">
            Szybkie prompty odpowiadają: oto, o co możesz zapytać.
          </p>
        )}
      </div>
      <figure className={`blank-box-swap${build >= 1 ? ' is-cropped' : ''}`}>
        <img
          src={build >= 1 ? notionAiFull : blankBoxAnxiety}
          alt={
            build >= 1
              ? 'Notion AI with quick prompts above the Ask Notion AI input.'
              : 'Empty Ask Notion AI input box.'
          }
        />
      </figure>
    </div>
  )
}

type PromptModeId = 'screens' | 'dialogue' | 'prompts' | 'disclaimers'

function ModesDisclaimersPreview() {
  return (
    <div className="modes-preview modes-preview-disclaimers">
      <figure className="modes-disclaimer-shot">
        <img
          src={exampleBielikDisclaimer}
          alt="Pole czatu Bielik z zastrzeżeniem pod polem: Bielik czasami popełnia błędy (jak każdy). Sprawdzaj ważne informacje!"
        />
      </figure>
      <figure className="modes-disclaimer-shot">
        <img
          src={exampleDisclaimerSuggestionVerify}
          alt="Odpowiedź AI z wersją uproszczoną komunikatu i zastrzeżeniem: To tylko sugestia. Zweryfikuj."
        />
      </figure>
    </div>
  )
}

function PromptModesExplore({
  activeId,
  title,
}: {
  activeId: PromptModeId
  title?: ReactNode
}) {
  const modes: {
    id: PromptModeId
    label: string
    detail: string
    image?: string
    alt?: string
  }[] = [
    {
      id: 'screens',
      label: 'Ekrany',
      detail: 'Przyciski, etykiety, ustalone ścieżki',
      image: modeScreens,
      alt: 'Select model menu showing Default, GPT-5.6 Terra, and GPT-5.6 Luna options.',
    },
    {
      id: 'dialogue',
      label: 'Dialog',
      detail: 'Wymiana zdań, pomoc w kontekście',
      image: modeDialogue,
      alt: 'Gdańsk dialogue options: check flight times versus Warsaw, or build a 48-hour weekend itinerary.',
    },
    {
      id: 'prompts',
      label: 'Prompty',
      detail: 'Intencja — sugerowana lub wpisana swobodnie',
      image: modePrompts,
      alt: 'Tatra prompt suggestions for hiking apps, packing, mountain huts, via ferrata, and avalanche safety.',
    },
    {
      id: 'disclaimers',
      label: 'Zastrzeżenia',
      detail: 'Disclaimery — oczekiwania i weryfikacja',
    },
  ]

  const preview = modes.find((mode) => mode.id === activeId) ?? modes[0]

  return (
    <div className="modes-explore">
      <h2 className="slide-title wide-title modes-explore-title">
        {title ?? (
          <>
            Microcopy w <span className="green">narzędziach AI</span>
          </>
        )}
      </h2>
      <div className="modes-explore-body">
        <div className="modes-menu">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`modes-menu-item${activeId === mode.id ? ' is-active' : ''}`}
            >
              <span className="modes-menu-item-copy">
                <strong>{mode.label}</strong>
                <small>{mode.detail}</small>
              </span>
              {activeId === mode.id && (
                <span className="modes-check" aria-hidden="true">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
        {activeId === 'disclaimers' ? (
          <ModesDisclaimersPreview />
        ) : (
          <div className={`modes-preview has-image modes-preview-${preview.id}`}>
            <img src={preview.image} alt={preview.alt ?? ''} />
          </div>
        )}
      </div>
    </div>
  )
}

function SystemPromptMock({ showSuggestion }: { showSuggestion: boolean }) {
  return (
    <div className="prompt-mock">
      <div className="prompt-mock-copy">
        <h2 className="prompt-mock-heading">
          Projekt rozmowy leży w <span className="green">instrukcjach</span>
        </h2>
        <p className="body-copy">
          Content designerzy kształtują to, jak odpowiadają agenci AI
        </p>
      </div>
      <div className="prompt-mock-panel">
        <div className="prompt-mock-chrome">
          <span>system.md</span>
        </div>
        <pre className="prompt-mock-code">
          <code>
            <span className="prompt-line">Jesteś asystentem wsparcia.</span>
            {'\n'}
            <span className="prompt-line">Pisz jasno i zwięźle.</span>
            {'\n'}
            <span
              className={`prompt-line is-hot${showSuggestion ? ' is-on' : ''}`}
            >
              {showSuggestion
                ? 'Krótkie akapity. Listy przy 3+ krokach. Pogrubiaj tylko etykiety lub krytyczne ostrzeżenia, nigdy całe zdania.'
                : 'Pogrubiaj ważne słowa.'}
            </span>
            {'\n'}
            <span className="prompt-line">Odpowiedzi mają być krótkie.</span>
          </code>
        </pre>
        <aside
          className={`prompt-suggestion${showSuggestion ? ' is-in' : ''}`}
          aria-hidden={!showSuggestion}
        >
          <span className="card-label">Content design</span>
          <p>
            <strong>Format to struktura, nie dekoracja.</strong> Lepiej:
            „Krótkie akapity. Listy przy 3+ krokach. Pogrubiaj tylko etykiety
            lub krytyczne ostrzeżenia, nigdy całe zdania.”
          </p>
        </aside>
      </div>
    </div>
  )
}

function EvalsExamples() {
  return (
    <div className="evals-slide">
      <div className="evals-intro">
        <h2 className="slide-title wide-title">
          <span className="green">Evals:</span> sprawdzanie jakości odpowiedzi na
          standardowych zadaniach
        </h2>
      </div>
      <div className="evals-spec">
        <div className="evals-spec-head" aria-hidden="true">
          <span>Zadanie</span>
          <span>Przykład</span>
        </div>
        <article className="evals-spec-row">
          <h3 className="evals-task-title">Formatowanie</h3>
          <p className="evals-input">
            <span className="evals-quote">„Jak zresetować hasło?”</span>
          </p>
        </article>
      </div>
      <div className="evals-output-pair">
        <article className="evals-output evals-output-fail">
          <span className="evals-output-label">
            <EvalFailIcon />
            Fail
          </span>
          <div className="evals-output-body">
            <p className="evals-output-rule">
              Całe zdania pogrubione. Ściany tekstu. Bez list.
            </p>
            <div className="evals-output-sample">
              <p>
                <strong>
                  Wejdź na stronę logowania, kliknij „Nie pamiętasz hasła?”,
                  wpisz e-mail, otwórz wiadomość, kliknij link, ustaw nowe
                  hasło i zaloguj się ponownie.
                </strong>
              </p>
            </div>
          </div>
        </article>
        <article className="evals-output evals-output-pass">
          <span className="evals-output-label">
            <EvalPassIcon />
            Pass
          </span>
          <div className="evals-output-body">
            <p className="evals-output-rule">
              Akapity do 3 zdań. Listy przy 3+ krokach. Pogrubienie tylko
              etykiet lub ostrzeżeń.
            </p>
            <div className="evals-output-sample">
              <p>Aby zresetować hasło:</p>
              <ol>
                <li>Otwórz stronę logowania.</li>
                <li>Wybierz <strong>Nie pamiętasz hasła?</strong></li>
                <li>Wpisz e-mail i otwórz link z wiadomości.</li>
                <li>Ustaw nowe hasło i zapisz.</li>
              </ol>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

function EvalFailIcon() {
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" focusable="false">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.2" />
      <path
        d="M6.5 6.5 13.5 13.5M13.5 6.5 6.5 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function EvalPassIcon() {
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" focusable="false">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.2" />
      <path
        d="M5.5 10.5 8.5 13.5 14.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SkillSparkIcon() {
  return (
    <svg className="skill-spark" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5 13.8 9.2 20.5 11 13.8 12.8 12 19.5 10.2 12.8 3.5 11 10.2 9.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function QuickPromptSkill() {
  return (
    <div className="skills-slide">
      <div className="skills-intro">
        <h2 className="slide-title wide-title">
          Claude Skills, które <span className="green">skalują zasięg</span>
        </h2>
        <p className="skills-subhead">
          Osoby projektujące piszą reguły. Skille pomagają dotrzeć do całej
          organizacji.
        </p>
      </div>
      <article className="skill-card is-peek">
        <div className="skill-card-head">
          <SkillSparkIcon />
          <code>/quick-prompts</code>
        </div>
        <p>
          Generuje uporządkowane szybkie prompty zgodne z regułą 2–4 słów.
        </p>
        <div className="skill-output is-in">
          <div className="skill-output-examples">
            <span>Utwórz automatyzację</span>
            <span>Sprawdź duplikaty</span>
            <span className="skill-output-check">
              <EvalPassIcon /> 2–4 słowa · bez „ja”, „mnie”, „mój”
            </span>
          </div>
          <p className="skill-credit">
            Skill: Liz Robins
            <br />
            (Content Designer w Zendesk)
          </p>
        </div>
      </article>
    </div>
  )
}

function TrustVerifyPillars() {
  const pillars = [
    {
      title: 'Widoczność',
      body:
        'Pokaż, że to AI, co się dzieje (status, źródła, „dlaczego”) i gdzie kończy się pewność systemu.',
    },
    {
      title: 'Kontrola',
      body:
        'Stop, edycja, odrzucenie, cofnięcie. Użytkownik może skorygować kurs — bez walki z interfejsem.',
    },
    {
      title: 'Zatwierdzenie',
      body:
        'Jawne zatwierdzenie przed wysyłką, publikacją lub akcją nieodwracalną. Domyślnie: do Twojej review, nie „już poszło”.',
    },
    {
      title: 'Weryfikacja',
      body:
        'Zachęta do sprawdzenia, cytaty, checklisty. Evals w zespole i monitoring po wdrożeniu.',
    },
  ]

  return (
    <div className="trust-slide">
      <h2 className="slide-title wide-title trust-slide-title">
        Człowiek w pętli:{' '}
        <span className="green">widoczność</span>,{' '}
        <span className="pink">kontrola</span>, zatwierdzenie, weryfikacja
      </h2>
      <div className="trust-pillar-grid">
        {pillars.map((pillar) => (
          <article key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function TrustWorkplaceShift() {
  return (
    <div className="trust-work-slide">
      <h2 className="display statement-display">
        AI <span className="pink">podważa domyślne zaufanie</span> w pracy
      </h2>
      <p className="body-copy trust-lede">
        Generujemy propozycje z AI i nawet ich nie sprawdzamy. Znormalizujmy
        mówienie: „eksplorowałam to z AI”.
        <br />
        (I sprawdź, co w ogóle wrzucasz, serio.)
      </p>
      <cite className="research-cite">
        <span className="research-title">
          AI Is Breaking This Thing We Call Trust
        </span>
        <span className="research-meta">Terrible Software · 2026</span>
      </cite>
    </div>
  )
}

function TrustVerifyMicrocopy() {
  return (
    <div className="trust-microcopy-slide">
      <h2 className="slide-title wide-title">
        To, co piszesz, buduje <span className="green">pętlę sprawdzania</span>
      </h2>
      <div className="trust-microcopy-grid">
        <article className="anthro-avoid">
          <span className="anthro-label">
            <EvalFailIcon />
            Słaba pętla
          </span>
          <ul>
            <li>„Odpowiedź wysłana” — bez Twojego kroku</li>
            <li>Brak statusu: nie wiesz, czy AI jeszcze „myśli”</li>
            <li>Pewny ton bez źródeł i bez „sprawdź to”</li>
          </ul>
        </article>
        <article className="anthro-instead">
          <span className="anthro-label">
            <EvalPassIcon />
            Silna pętla
          </span>
          <ul>
            <li>„Zatwierdź i wyślij” · „Odrzuć” · „Edytuj szkic”</li>
            <li>„Generuję…” · „Może być niedokładne” · źródła / „dlaczego”</li>
            <li>Jasne, co wymaga Twojej weryfikacji przed akcją</li>
          </ul>
        </article>
      </div>
    </div>
  )
}

type Slide = {
  className?: string
  builds?: number
  footerAffiliation?: string
  footerExamples?: string
  content: ReactNode | ((build: number) => ReactNode)
}

const slides: Slide[] = [
  {
    content: (
      <>
        <h1 className="hero-title">
          Ufaj, ale sprawdzaj:{' '}
          <span className="green">jak projektować</span>{' '}
          <span className="pink">interakcje z AI</span>
        </h1>
        <p className="lede">Kalina Tyrkiel-Szymańska</p>
      </>
    ),
    className: 'hero-slide',
  },
  {
    footerAffiliation: 'Zendesk',
    content: (
      <div className="intro-grid">
        <div className="intro-identity">
          <div>
            <h2>Kalina Tyrkiel-Szymańska</h2>
            <p className="role">
              Content Designer, trenerka UX writingu, wykładowczyni, psycholożka
            </p>
          </div>
        </div>
        <div className="intro-stack">
          <div className="intro-statement is-light">
            <p>
              Projektuję narzędzia AI.
              <br />
              Projektuję z użyciem AI.
            </p>
          </div>
          <div className="intro-statement">
            <p>
              Kiedyś uczyłam głównie pisania.
              <br />
              Teraz uczę, jak pracować z AI.
            </p>
          </div>
        </div>
      </div>
    ),
    className: 'intro-slide',
  },
  {
    content: (
      <div className="era-layout">
        <article className="era-card">
          <span className="card-label">Kiedyś</span>
          <h2>Stałe teksty w stałych miejscach</h2>
          <p>
            Przyciski, etykiety, komunikaty błędu: napisane raz, zawsze brzmią
            tak samo.
          </p>
        </article>
        <div className="era-examples era-examples-ui">
          <figure className="example-frame example-frame-light">
            <img
              src={exampleInpostLockers}
              alt="InPost: Z których skrytek wygodniej wyciągniesz przesyłkę? — wybór Dowolnie, Wolę wyżej, Wolę niżej."
            />
          </figure>
          <figure className="example-frame example-frame-light">
            <img
              src={exampleCoffeedeskDiscount}
              alt="Coffeedesk: kod rabatowy — komunikat błędu „Kod rabatowy nie został rozpoznany”."
            />
          </figure>
        </div>
      </div>
    ),
    className: 'era-slide',
    footerExamples: 'przykłady: Allegro, Coffeedesk',
  },
  {
    content: <PromptModesExplore activeId="screens" />,
    className: 'modes-slide',
  },
  {
    content: <PromptModesExplore activeId="dialogue" />,
    className: 'modes-slide',
  },
  {
    content: <PromptModesExplore activeId="prompts" />,
    className: 'modes-slide',
  },
  {
    content: <PromptModesExplore activeId="disclaimers" />,
    className: 'modes-slide',
  },
  {
    content: (
      <div className="psych-bio-layout">
        <div className="psych-bio-copy">
          <h2 className="slide-title wide-title">
            Ten temat towarzyszy mi od dłuższego czasu…
          </h2>
        </div>
        <figure className="psych-bio-frame">
          <img
            src={thesisChatbot}
            alt="Thesis record: Factors influencing satisfaction of interactions with chatbots, by Kalina Tyrkiel, Master’s in applied psychology, diploma exam 19 October 2020."
          />
        </figure>
      </div>
    ),
    className: 'psych-bio-slide',
  },
  {
    content: (
      <h2 className="display statement-display language-quote language-quote-italic">
        You can’t take the <span className="green">language</span>
        <br />
        out of the <span className="green">large language model</span>
      </h2>
    ),
    className: 'statement-slide',
  },
  {
    content: (
      <h2 className="display statement-display">
        Za bardzo <span className="green">ufamy</span> sztucznej inteligencji,
        przez co <span className="green">niszczymy zaufanie</span> do nas.
      </h2>
    ),
    className: 'statement-slide',
  },
  {
    content: (
      <h2 className="display statement-display">
        Generujemy dokumenty z AI.
        <br />
        Dokumenty, które czyta <span className="pink">tylko AI</span>.
      </h2>
    ),
    className: 'statement-slide',
  },
  {
    content: <TrustWorkplaceShift />,
    className: 'trust-work-slide-wrap statement-slide',
  },
  {
    content: (
      <>
        <h2 className="display statement-display statement-display-trust">
          Z AI za szybko ufamy, że coś jest prawie gotowe.
        </h2>
        <p className="body-copy trust-lede">
          Z tą prezentacją miałam ten sam problem.
        </p>
      </>
    ),
    className: 'statement-slide',
  },
  {
    content: (
      <div className="adversarial-slide">
        <div className="adversarial-slide-copy">
          <h2 className="slide-title wide-title">
            Twoje AI potrzebuje krytyka.
          </h2>
          <p className="body-copy adversarial-slide-lede">
            Zaangażuj <span className="term-italic">adversarial agent</span>.
          </p>
          <cite className="research-cite">
            <span className="research-title">
              When Your AI Needs an Enemy: The Case for Adversarial Agents
            </span>
            <span className="research-meta">Jatin Mishra · Medium</span>
          </cite>
        </div>
        <div className="prompt-mock-panel adversarial-prompt">
          <div className="prompt-mock-chrome">
            <span>Agent-adwersarz</span>
          </div>
          <pre className="prompt-mock-code adversarial-prompt-code">
            <code>
              Szukaj błędów, luk, słabych miejsc w narracji. Znajdź miejsca,
              gdzie słuchacz traci uwagę lub zaufanie. Nie poprawiaj, atakuj.
            </code>
          </pre>
        </div>
      </div>
    ),
    className: 'adversarial-slide-wrap statement-slide',
  },
  {
    content: <TrustVerifyPillars />,
    className: 'trust-slide-wrap',
  },
  {
    content: (
      <div className="shaping-shift-slide">
        <p className="body-copy shaping-shift-line">
          <strong>Kiedyś:</strong> celowe <em>friction</em> w interfejsie.
        </p>
        <p className="body-copy shaping-shift-line">
          <strong>Dziś:</strong> oprócz tego system prompty i ewaluacja (evals).
        </p>
        <p className="body-copy shaping-shift-punch">
          <strong className="pink">
            Nigdy nie pracowaliśmy tak blisko z engineeringiem!
          </strong>
        </p>
      </div>
    ),
    className: 'statement-slide',
  },
  {
    content: <SystemPromptMock showSuggestion={false} />,
    className: 'prompt-mock-slide',
  },
  {
    content: <SystemPromptMock showSuggestion={true} />,
    className: 'prompt-mock-slide',
  },
  {
    content: <EvalsExamples />,
    className: 'evals-slide-wrap',
  },
  {
    content: (
      <div className="brevity-slide">
        <h2 className="display statement-display">
          Content designerzy pilnują{' '}
          <span className="green">zwięzłości</span>
        </h2>
        <cite className="brevity-citation">
          <span className="brevity-paper-title">
            Brevity is the soul of sustainability: Characterizing LLM response
            lengths
          </span>
          <span className="brevity-authors">
            Soham Poddar, Paramita Koley, Janardan Misra i in. (IIT Kharagpur,
            ISI Kolkata, Accenture Labs)
          </span>
        </cite>
        <p className="body-copy brevity-finding">
          „W prawie wszystkich przypadkach odpowiedzi LLM są znacząco dłuższe
          niż docelowa długość (na wszystkich zbiorach danych).”
        </p>
        <p className="brevity-takeaway">
          <strong className="pink">
            UX writerzy walczą o zwięzłość odpowiedzi LLMów (oj, walczą...)
          </strong>
        </p>
      </div>
    ),
    className: 'statement-slide',
  },
  {
    builds: 1,
    content: (build) => <BlankBoxAnxiety build={build} />,
    className: 'era-slide blank-box-slide',
  },
  {
    content: (
      <div className="cursor-example">
        <div className="cursor-example-copy">
          <h2 className="cursor-heading">
            Widoczność i kontrola w trakcie, nie po fakcie
          </h2>
          <p className="body-copy">
            Status agenta · koszt · stop · „steer without interrupting” — możesz
            skorygować AI, zanim zatwierdzisz zmiany w kodzie. To jest pętla
            weryfikacji w czasie rzeczywistym.
          </p>
        </div>
        <figure className="example-frame cursor-frame">
          <img
            src={steerWithoutInterrupting}
            alt="Cursor agent input showing placeholder microcopy: Steer without interrupting, with Auto Cost and a stop control."
          />
        </figure>
      </div>
    ),
    className: 'era-slide',
  },
  {
    content: <TrustVerifyMicrocopy />,
    className: 'trust-microcopy-wrap',
  },
  {
    content: (
      <div className="zendesk-example">
        <div className="zendesk-copy">
          <h2>
            Siła mikrocopy:
            <br />
            <span className="green">AI w edytorze wiadomości</span>
          </h2>
          <p className="body-copy">
            Powiedz, co AI potrafi — i że to Ty decydujesz, co trafi do
            wiadomości. Rozwiń, uprość, przepisz; nic nie wychodzi bez Twojej
            edycji i zatwierdzenia.
          </p>
        </div>
        <div className="zendesk-frames zendesk-frames-single">
          <figure className="example-frame zendesk-frame">
            <img
              src={zendeskAiPrompts}
              alt="Zendesk AI writing menu with options: Expand, Simplify, Rewrite in your tone, Make more friendly, Make more formal, plus a custom prompt field."
            />
          </figure>
        </div>
      </div>
    ),
    className: 'era-slide',
    footerExamples: 'przykład: Zendesk',
  },
  {
    content: (
      <div className="zendesk-example zendesk-example-shot">
        <div className="zendesk-copy">
          <h2>
            Automatyczny asystent{' '}
            <span className="pink">nie zastępuje myślenia</span>
          </h2>
          <p className="body-copy">
            AI proponuje odpowiedź. Agent obsługi klienta czyta, poprawia i
            zatwierdza. Wciąż ma pełną kontrolę.
          </p>
        </div>
        <div className="zendesk-frames zendesk-frames-single">
          <figure className="example-frame zendesk-frame">
            <img
              src={zendeskAutoAssist}
              alt="Zendesk Auto assist panel drafting a reply about a dark mode feature request, with an Approve button."
            />
          </figure>
        </div>
      </div>
    ),
    className: 'era-slide',
    footerExamples: 'przykład: Zendesk',
  },
  {
    content: (
      <div className="zendesk-example zendesk-example-shot">
        <div className="zendesk-copy">
          <h2>
            Automatyczny asystent pokazuje,{' '}
            <span className="pink">skąd ta sugestia</span>
          </h2>
          <p className="body-copy">
            Agent może sprawdzić źródła i potwierdzić, czy AI działa prawidłowo.
          </p>
        </div>
        <div className="zendesk-frames zendesk-frames-why">
          <figure className="example-frame zendesk-frame">
            <img
              src={zendeskWhySuggestion}
              alt="Zendesk panel explaining why a suggestion was generated, with sources linking to Feature Requests and Enhancements."
            />
          </figure>
        </div>
      </div>
    ),
    className: 'era-slide',
    footerExamples: 'przykład: Zendesk',
  },
  {
    content: (
      <>
        <h2 className="display statement-display">
          Słowa używane przez <span className="green">AI</span> kształtują ludzki
          odbiór.
        </h2>
        <p className="body-copy">
          Porozmawiajmy o ograniczeniach poznawczych
        </p>
      </>
    ),
    className: 'statement-slide',
  },
  {
    content: (
      <div className="anthro-slide">
        <h2 className="slide-title wide-title">Emocjonalny język</h2>
        <div className="anthro-pair">
          <article className="anthro-avoid">
            <span className="anthro-label">
              <EvalFailIcon />
              Unikaj
            </span>
            <div className="agent-output">
              <span className="agent-output-meta">Agent</span>
              <p>
                Bardzo mi przykro, że przez to przechodzisz. Doskonale rozumiem,
                jak frustrujące to musi być.
              </p>
            </div>
          </article>
          <article className="anthro-instead">
            <span className="anthro-label">
              <EvalPassIcon />
              Zamiast tego
            </span>
            <div className="agent-output">
              <span className="agent-output-meta">Agent</span>
              <p>Nie mogę znaleźć zamówienia w systemie.</p>
            </div>
          </article>
        </div>
        <cite className="research-cite">
          <span className="research-title">
            Mirages. On Anthropomorphism in Dialogue Systems
          </span>
          <span className="research-meta">
            Abercrombie, Cercas Curry, Dinkar, Rieser, Talat · EMNLP 2023
          </span>
          <span className="research-finding">
            Pseudoempatia i język emocji wzmacniają personifikację i
            nadmierne poleganie na systemie — szczególnie w kontekstach
            wysokiego ryzyka.
          </span>
        </cite>
      </div>
    ),
  },
  {
    content: (
      <div className="anthro-slide">
        <h2 className="slide-title wide-title">
          Agent nie jest <span className="green">w Twoim zespole</span>
        </h2>
        <div className="anthro-pair">
          <article className="anthro-avoid">
            <span className="anthro-label">
              <EvalFailIcon />
              Unikaj
            </span>
            <div className="agent-output">
              <span className="agent-output-meta">Agent</span>
              <p>
                Cześć! Jestem Twoim asystentem do copy. Już piszę za Ciebie
                tekst na pusty stan.
              </p>
            </div>
          </article>
          <article className="anthro-instead">
            <span className="anthro-label">
              <EvalPassIcon />
              Zamiast tego
            </span>
            <div className="agent-output">
              <span className="agent-output-meta">Agent</span>
              <p>
                Propozycja tekstu na pusty stan. Ty edytujesz i decydujesz, co
                idzie do produktu.
              </p>
            </div>
          </article>
        </div>
        <cite className="research-cite">
          <span className="research-title">
            Believing Anthropomorphism: Cues on Trust in LLMs
          </span>
          <span className="research-meta">
            Cohn, Chang i in. · CHI 2024 · n = 2 165
          </span>
          <span className="research-finding">
            „Ja” w odpowiedziach agenta często podnosiło ocenę trafności — nawet
            gdy treść była taka sama.
          </span>
        </cite>
      </div>
    ),
  },
  {
    content: (
      <div className="anthro-slide">
        <h2 className="slide-title wide-title">Pewny ton</h2>
        <div className="anthro-pair">
          <article className="anthro-avoid">
            <span className="anthro-label">
              <EvalFailIcon />
              Unikaj
            </span>
            <div className="agent-output">
              <span className="agent-output-meta">Agent</span>
              <p>
                Użyj modala. To najlepszy sposób na potwierdzenie.
              </p>
            </div>
          </article>
          <article className="anthro-instead">
            <span className="anthro-label">
              <EvalPassIcon />
              Zamiast tego
            </span>
            <div className="agent-output">
              <span className="agent-output-meta">Agent</span>
              <p>
                Modal ma sens przy działaniach nieodwracalnych. Przy częstych
                zadaniach rozważ też komunikat błędu przy polu tekstowym.
              </p>
            </div>
          </article>
        </div>
        <cite className="research-cite">
          <span className="research-title">
            Humans and Automation: Use, Misuse, Disuse, Abuse
          </span>
          <span className="research-meta">
            Parasuraman &amp; Riley · Human Factors, 1997 · automation bias
          </span>
          <span className="research-finding">
            Gdy system brzmi autorytatywnie, ludzie zbyt mocno na nim polegają
            i pomijają własną weryfikację — nawet gdy output jest błędny.
          </span>
        </cite>
      </div>
    ),
  },
  {
    content: (
      <h2 className="display statement-display language-quote">
        Projektujemy narzędzia AI…
        <br />
        a jak <span className="green underlined">projektować z AI</span>?
      </h2>
    ),
    className: 'statement-slide',
  },
  {
    content: <QuickPromptSkill />,
    className: 'skills-slide-wrap',
  },
  {
    content: (
      <figure className="media-frame tweet-frame">
        <img
          src={tweetImage}
          alt="Tweet by Joanna Maciejewska: the biggest problem with pushing all-things-AI is the wrong direction. She wants AI to do laundry and dishes so she can do art and writing, not the reverse."
        />
      </figure>
    ),
    className: 'media-slide',
  },
  {
    content: (
      <figure className="media-frame">
        <img
          src={coIntelligenceCover}
          alt="Book cover: Co-Intelligence: Living and Working with AI by Ethan Mollick."
        />
      </figure>
    ),
    className: 'media-slide',
  },
  {
    content: (
      <div className="metaphor-layout">
        <div>
          <h2>
            Centaur ma <span className="underlined">wyraźną</span> granicę między
            człowiekiem i maszyną.
            <br />
            U cyborga jest ona <span className="blurred">zatarta</span>.
          </h2>
        </div>
        <div className="mode-cards">
          <article>
            <div className="card-head">
              <CentaurIcon />
              <span className="card-label">Centaur</span>
            </div>
            <p>AI szkicuje komunikaty błędów. Ty decydujesz, co wychodzi na świat.</p>
          </article>
          <article className="featured-card">
            <div className="card-head">
              <CyborgIcon />
              <span className="card-label">Cyborg</span>
            </div>
            <p>
              Zostajesz w tym samym flow. Proponujesz, AI podważa, poprawiasz,
              AI znowu podważa. Robicie to razem — odpowiedzialność zostaje przy
              tobie.
            </p>
          </article>
        </div>
      </div>
    ),
  },
  {
    content: (
      <figure className="media-frame">
        <img
          src={bookCover}
          alt="Book cover: The Reverse Centaur’s Guide to Life After AI by Cory Doctorow."
        />
      </figure>
    ),
    className: 'media-slide',
  },
  {
    content: (
      <div className="metaphor-layout">
        <div>
          <h2>
            Maszyna decyduje.
            <br />
            <span className="pink">Człowiek bierze winę na siebie.</span>
          </h2>
        </div>
        <div className="mode-cards">
          <article>
            <div className="card-head">
              <CentaurIcon />
              <span className="card-label">Centaur</span>
            </div>
            <p>AI szkicuje komunikaty błędów. Ty decydujesz, co wychodzi na świat.</p>
          </article>
          <article className="reverse-card">
            <div className="card-head">
              <span className="reverse-icon">
                <CentaurIcon />
              </span>
              <span className="card-label">Reverse centaur</span>
            </div>
            <p>
              Ktoś promptuje bez kontekstu i wypuszcza copy. Ty poprawiasz to, co
              wychodzi — i odpowiadasz za skutki.
            </p>
          </article>
        </div>
      </div>
    ),
    className: 'pink-wash',
  },
  {
    content: (
      <>
        <blockquote>Jakie jest Twoje zadanie centaura?</blockquote>
        <p className="small-instruction">
          Prosisz o nową perspektywę? Szkicujesz warianty?
        </p>
      </>
    ),
    className: 'question-slide question-green',
  },
  {
    content: (
      <>
        <blockquote>Jaki jest Twój odwrócony centaur?</blockquote>
        <p className="small-instruction">
          Gdzie AI pogarsza sprawę – i zrzuca winę na Ciebie?
        </p>
      </>
    ),
    className: 'question-slide question-pink',
  },
  {
    content: (
      <div className="summary-slide">
        <h2 className="slide-title wide-title">Zabierz ze sobą</h2>
        <div className="summary-grid">
          <article className="featured-card">
            <h3>Ufaj, ale sprawdzaj</h3>
            <p>
              Zaufanie w zespole i w UI: widoczność, kontrola, zatwierdzenie. Twoje
              imię = rozumiesz i stoisz za tym, co wychodzi.
            </p>
          </article>
          <article>
            <h3>Pętla w mikrocopy</h3>
            <p>
              Status, „może być niedokładne”, zatwierdź / edytuj / odrzuć.
              Evals i monitoring po wdrożeniu.
            </p>
          </article>
          <article>
            <h3>Centaur, nie reverse centaur</h3>
            <p>
              AI szkicuje — Ty decydujesz. Zakoduj reguły w skillach; nie
              wypuszczaj slopu podpisanym nazwiskiem.
            </p>
          </article>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="closing-layout">
        <div>
          <h2>
            Ufaj, ale sprawdzaj —
            <br />
            <span className="pink">i dobrej konferencji!</span>
          </h2>
        </div>
        <div className="closing-meta">
          <figure className="closing-qr">
            <img
              src={linkedinQr}
              alt="Kod QR do profilu LinkedIn Kaliny Tyrkiel-Szymańskiej"
            />
            <figcaption>Kalina na LinkedIn</figcaption>
          </figure>
        </div>
      </div>
    ),
    className: 'hero-slide',
  },
]

function App() {
  const initialSlide = useMemo(() => {
    const hash = Number(window.location.hash.replace('#', ''))
    return hash >= 1 && hash <= slides.length ? hash - 1 : 0
  }, [])
  const [current, setCurrent] = useState(initialSlide)
  const [build, setBuild] = useState(0)
  const slide = slides[current]
  const maxBuild = slide.builds ?? 0
  const content = typeof slide.content === 'function' ? slide.content(build) : slide.content
  const footerAffiliation = slide.footerAffiliation
  const footerExamples = slide.footerExamples

  const goTo = useCallback((index: number) => {
    const next = Math.min(Math.max(index, 0), slides.length - 1)
    setCurrent(next)
    setBuild(0)
    window.history.replaceState(null, '', `#${next + 1}`)
  }, [])

  const advance = useCallback(() => {
    if (build < maxBuild) {
      setBuild((value) => value + 1)
      return
    }
    goTo(current + 1)
  }, [build, maxBuild, current, goTo])

  const retreat = useCallback(() => {
    if (build > 0) {
      setBuild((value) => value - 1)
      return
    }
    const previous = Math.max(current - 1, 0)
    setBuild(slides[previous].builds ?? 0)
    setCurrent(previous)
    window.history.replaceState(null, '', `#${previous + 1}`)
  }, [build, current])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'BUTTON') return
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        advance()
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        retreat()
      }
      if (event.key === 'Home') goTo(0)
      if (event.key === 'End') goTo(slides.length - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [advance, retreat, goTo])

  return (
    <main className="deck">
      <section
        className={`slide ${slide.className ?? ''}`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('button, a')) return
          advance()
        }}
      >
        <div className="ambient-shape shape-one" />
        <div className="ambient-shape shape-two" />
        <header className="slide-header">
          <UxSpeakInWordmark />
          <span>27 października 2026</span>
        </header>
        <div className="slide-content">{content}</div>
        <footer className="slide-footer">
          <div className="slide-footer-leading">
            <span className="slide-footer-name">Kalina Tyrkiel-Szymańska</span>
            {footerAffiliation && (
              <span className="slide-footer-affiliation">{footerAffiliation}</span>
            )}
            {footerExamples && (
              <span className="slide-footer-examples">{footerExamples}</span>
            )}
          </div>
          <div className="slide-nav">
            <button
              type="button"
              onClick={() => retreat()}
              disabled={current === 0 && build === 0}
              aria-label="Poprzedni slajd"
            >
              ←
            </button>
            <span>
              {String(current + 1).padStart(2, '0')} /{' '}
              {String(slides.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => advance()}
              disabled={current === slides.length - 1 && build >= maxBuild}
              aria-label="Następny slajd"
            >
              →
            </button>
          </div>
        </footer>
        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>
      </section>
    </main>
  )
}

export default App
