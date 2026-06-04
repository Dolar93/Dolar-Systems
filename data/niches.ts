import type { LucideIcon } from 'lucide-react'
import { Scale, Stethoscope, Building2, Landmark, Factory } from 'lucide-react'

export type NicheSlug =
  | 'kancelarie-prawne'
  | 'kliniki-stomatologia'
  | 'agencje-nieruchomosci'
  | 'deweloperzy'
  | 'firmy-produkcyjne'

export interface NicheData {
  slug: NicheSlug
  name: string
  tagline: string
  Icon: LucideIcon
  bgRgb: string
  dark: string
  darkRgb: string
  headline: string
  headlineAccent: string
  sub: string
  heroMetrics: { val: string; label: string }[]
  painPoints: { num: string; title: string; desc: string }[]
  systems: { name: string; desc: string; tools: string[]; impact: string }[]
  process: { step: string; title: string; desc: string }[]
  caseStudy: {
    location: string
    problem: string
    solution: string
    results: string[]
    price: string
    time: string
    bigMetrics: { val: number; prefix: string; suffix: string; label: string }[]
  }
  techStack: string[]
  pricing: { name: string; price: string; desc: string; features: string[]; highlighted?: boolean }[]
}

export const NICHES: NicheData[] = [
  {
    slug: 'kancelarie-prawne',
    name: 'Kancelarie Prawne',
    tagline: 'Automatyzacja dla prawników',
    Icon: Scale,
    bgRgb: '212,228,200',
    dark: '#4A7A3A',
    darkRgb: '74,122,58',
    headline: 'Kancelaria prawna',
    headlineAccent: 'bez papierologii.',
    sub: 'Umowy generowane w sekundy. Klienci obsłużeni 24/7. Prawnicy skupieni na tym co ważne — nie na kopiowaniu szablonów.',
    heroMetrics: [
      { val: '−15h', label: 'oszczędności / tydzień' },
      { val: '+40%', label: 'skuteczność follow-up' },
      { val: '< 3 tyg', label: 'czas wdrożenia' },
      { val: '0', label: 'zapomnianych klientów' },
    ],
    painPoints: [
      { num: '01', title: 'Prawnicy jako sekretarki', desc: 'Godziny na ręczne generowanie umów, wypełnianie szablonów, kopiowanie danych klienta. Czas billowany — stracony.' },
      { num: '02', title: 'Klienci bez odpowiedzi', desc: 'Zapytania przez email giną w natłoku pracy. Klient czeka 2 dni i dzwoni do kancelarii naprzeciwko.' },
      { num: '03', title: 'Follow-up tylko gdy ktoś pamięta', desc: 'Żaden system nie pilnuje terminów. Sprawy leżą tygodniami bo nikt nie wysłał przypomnienia.' },
      { num: '04', title: 'Faktury z 2-tygodniowym opóźnieniem', desc: 'Administracja pochłania czas który mógłby być billowany. Cashflow cierpi przez biurokrację.' },
    ],
    systems: [
      {
        name: 'Generator umów AI',
        desc: 'Prawnik wypełnia 2-minutowy formularz → system generuje gotową umowę PDF w 30 sekund. Obsługuje wszystkie szablony kancelarii, automatycznie wstawia dane stron, numery PESEL/NIP, terminy.',
        tools: ['Claude AI', 'n8n', 'DocuSign'],
        impact: '−2h dziennie na każdego prawnika',
      },
      {
        name: 'Intake chatbot 24/7',
        desc: 'Chatbot na stronie kancelarii kwalifikuje klientów, zbiera dane sprawy i umawia konsultacje — bez udziału prawnika. Nowy klient zamiast czekać na maila dostaje potwierdzenie w 2 minuty.',
        tools: ['GPT-4o', 'Calendly API', 'Make.com'],
        impact: '+3x szybszy onboarding klienta',
      },
      {
        name: 'Automatyczny follow-up',
        desc: 'System wysyła przypomnienia do klientów 3, 7 i 14 dni po ostatnim kontakcie. Jeśli brak odpowiedzi przez 7 dni — eskalacja do odpowiedzialnego prawnika. Zero przegapionych spraw.',
        tools: ['n8n', 'Twilio SMS', 'SMTP'],
        impact: '+40% skuteczność follow-up',
      },
      {
        name: 'Automatyczne faktury',
        desc: 'Faktura generowana i wysyłana automatycznie po zamknięciu sprawy lub w ustalonym dniu miesiąca. Integracja z iFirma / wFirma. Koniec z "zapomniałem wystawić fakturę".',
        tools: ['Make.com', 'iFirma API', 'PDF Generator'],
        impact: '0h administracji fakturowej',
      },
    ],
    process: [
      { step: '01', title: 'Audyt procesów', desc: 'Spędzamy 2-3h z Twoim zespołem. Mapujemy przepływ pracy, identyfikujemy 3-5 miejsc z największym potencjałem oszczędności.' },
      { step: '02', title: 'Projekt systemu', desc: 'Projektujemy architekturę automatyzacji pod Twoje szablony, CRM i workflow. Pokazujemy mockup zanim piszemy linijkę kodu.' },
      { step: '03', title: 'Budowa i testy', desc: 'Budujemy w 10-14 dni roboczych. Testujemy na realnych danych z Twojej kancelarii. Zero zaskoczeń przy wdrożeniu.' },
      { step: '04', title: 'Launch i wsparcie', desc: 'Uruchamiamy na produkcji. Szkolimy cały zespół. Dostępni przez 30 dni na pytania i poprawki.' },
    ],
    caseStudy: {
      location: 'Warszawa',
      problem: 'Kancelaria 8 prawników traciła 15h tygodniowo na ręczne generowanie umów i follow-up. Recepcja zamiast wspomagać — hamowała pracę.',
      solution: 'Generator umów AI + automatyczny system follow-up email/SMS + automatyczne fakturowanie. Wdrożenie w 3 tygodnie.',
      results: ['−15h tygodniowo pracy administracyjnej', '+40% skuteczność follow-up klientów', '0 zapomnianych spraw do kontaktu', 'Zwrot inwestycji w 6 tygodni od wdrożenia'],
      price: '4 900',
      time: '3 tygodnie',
      bigMetrics: [
        { val: 15, prefix: '−', suffix: 'h', label: 'tygodniowo' },
        { val: 40, prefix: '+', suffix: '%', label: 'follow-up' },
      ],
    },
    techStack: ['n8n', 'Claude AI', 'Make.com', 'DocuSign', 'Twilio', 'iFirma', 'GPT-4o', 'PostgreSQL'],
    pricing: [
      {
        name: 'Starter',
        price: '4 900 zł',
        desc: 'Jeden kluczowy system. Idealny na start.',
        features: ['Generator umów (do 5 szablonów)', 'Follow-up email automatyczny', 'Szkolenie 2h', '30 dni wsparcia', 'Dokumentacja techniczna'],
      },
      {
        name: 'Pro',
        price: '7 900 zł',
        desc: 'Pełna automatyzacja dla aktywnej kancelarii.',
        features: ['Generator umów (nieograniczone szablony)', 'Intake chatbot 24/7', 'Follow-up email + SMS', 'Automatyczne faktury', 'Dashboard kancelarii', 'Szkolenie 4h dla zespołu', '60 dni wsparcia'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Wycena indywidualna',
        desc: 'Dla dużych kancelarii i sieci.',
        features: ['Wszystko z pakietu Pro', 'Integracja z bazami prawnymi', 'Dedykowany opiekun projektu', 'SLA 99.9% uptime', 'Onboarding dla wszystkich oddziałów'],
      },
    ],
  },
  {
    slug: 'kliniki-stomatologia',
    name: 'Kliniki & Stomatologia',
    tagline: 'Automatyzacja dla klinik medycznych',
    Icon: Stethoscope,
    bgRgb: '242,212,200',
    dark: '#8B4A35',
    darkRgb: '139,74,53',
    headline: 'Zero no-show.',
    headlineAccent: 'Pełny kalendarz.',
    sub: 'Chatbot umawia wizyty przez całą dobę. SMS-y eliminują no-show. Recepcja ma wreszcie czas na pacjentów — nie na telefony.',
    heroMetrics: [
      { val: '−62%', label: 'wskaźnik no-show' },
      { val: '+25%', label: 'zapełnienie kalendarza' },
      { val: '8h', label: 'odciążenie recepcji / tydzień' },
      { val: '2 tyg', label: 'czas wdrożenia' },
    ],
    painPoints: [
      { num: '01', title: '30% wizyt kończy się no-show', desc: 'Pacjent zapomina, nie odbiera, nie odwołuje. Fotel stoi pusty, a Ty tracisz 200-400 zł na każdej takiej wizycie.' },
      { num: '02', title: 'Recepcja tylko przy telefonie', desc: 'Połowa czasu recepcji to umawianie i przekładanie wizyt. Na obsługę pacjentów w gabinecie — brakuje rąk.' },
      { num: '03', title: 'Brak odpowiedzi poza godzinami', desc: 'Ktoś szuka stomatologa o 22:00. Wypełnia formularz. Odpowiedź dostaje następnego dnia. Idzie do konkurencji.' },
      { num: '04', title: 'Wywiad medyczny w gabinecie', desc: 'Pierwsze 15 minut wizyty zajmuje wypełnianie ankiet. Lekarz może zająć się pacjentem dopiero w połowie czasu wizyty.' },
    ],
    systems: [
      {
        name: 'Chatbot rejestracji 24/7',
        desc: 'Pacjent otwiera stronę kliniki o dowolnej porze, chatbot pyta o rodzaj usługi i preferowany termin. W 3 minuty umawia wizytę i wysyła potwierdzenie na email + SMS.',
        tools: ['GPT-4o', 'Google Calendar API', 'Twilio'],
        impact: '+3x więcej rezerwacji poza godzinami pracy',
      },
      {
        name: 'System anty-no-show',
        desc: 'SMS 48h przed wizytą: "Czy potwierdzasz wizytę? Odpisz TAK lub NIE". 2h przed wizytą: SMS z przypomnieniem. Pacjent nie odwołuje → automatyczne wezwanie zastępcy z listy.',
        tools: ['Twilio SMS', 'n8n', 'CRM API'],
        impact: '−62% wskaźnik no-show',
      },
      {
        name: 'Wywiad medyczny online',
        desc: 'Po umówieniu wizyty pacjent dostaje link do formularza wywiadu medycznego. Wypełnia w domu, dane trafiają do systemu. Lekarz widzi historię przed wejściem pacjenta.',
        tools: ['Make.com', 'Custom Form', 'EHR API'],
        impact: '+15 min efektywnego czasu wizyty',
      },
      {
        name: 'Raporty i dokumentacja auto',
        desc: 'Dzienny raport z zapełnienia kalendarza, no-show rate, przychodów. Dokumentacja medyczna uzupełniana przez szablony. Gotowe zestawienia dla ubezpieczalni.',
        tools: ['n8n', 'Google Sheets', 'PDF Generator'],
        impact: '4h mniej dokumentacji tygodniowo',
      },
    ],
    process: [
      { step: '01', title: 'Audyt kliniki', desc: 'Analizujemy obecny przepływ rejestracji, no-show rate, systemy których używasz (CRM, kalendarz, EHR).' },
      { step: '02', title: 'Projekt przepływu', desc: 'Projektujemy nowy flow pacjenta od pierwszego kontaktu do wizyty. Wszystkie automatyzacje zaplanowane zanim zaczniemy budować.' },
      { step: '03', title: 'Integracja i testy', desc: 'Łączymy z Twoimi systemami. Testujemy na grupie 20 pacjentów przed pełnym wdrożeniem. Zero ryzyka dla istniejących procesów.' },
      { step: '04', title: 'Go-live i optymalizacja', desc: 'Wdrożenie bez przestoju kliniki. Szkolimy recepcję i lekarzy. Przez 30 dni optymalizujemy na realnych danych.' },
    ],
    caseStudy: {
      location: 'Poznań',
      problem: '30% wizyt kończyło się no-show. Recepcja nie nadążała z przypomnieniami i rejestracją. Klinika traciła ~15 000 zł miesięcznie na pustych fotelach.',
      solution: 'Chatbot rejestracyjny + system SMS anty-no-show + wywiad medyczny online. Wdrożenie w 2 tygodnie.',
      results: ['−62% no-show rate (z 30% do 11%)', '+25% zapełnienie kalendarza', 'Recepcja odciążona o 8h tygodniowo', '+15 000 zł miesięcznego przychodu z odzyskanych wizyt'],
      price: '5 900',
      time: '2 tygodnie',
      bigMetrics: [
        { val: 62, prefix: '−', suffix: '%', label: 'no-show' },
        { val: 25, prefix: '+', suffix: '%', label: 'kalendarza' },
      ],
    },
    techStack: ['n8n', 'Make.com', 'Twilio', 'GPT-4o', 'Google Calendar', 'EHR API', 'PostgreSQL', 'Custom Forms'],
    pricing: [
      {
        name: 'Starter',
        price: '3 900 zł',
        desc: 'SMS anty-no-show + podstawowa rejestracja.',
        features: ['System SMS przypomnienia (48h + 2h)', 'Automatyczne potwierdzenia wizyt', 'Szkolenie recepcji 2h', '30 dni wsparcia'],
      },
      {
        name: 'Pro',
        price: '5 900 zł',
        desc: 'Pełna automatyzacja rejestracji i obsługi.',
        features: ['Chatbot rejestracji 24/7', 'System SMS anty-no-show', 'Wywiad medyczny online', 'Lista zastępcza pacjentów', 'Raporty dzienne auto', 'Szkolenie 4h', '60 dni wsparcia'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Wycena indywidualna',
        desc: 'Dla sieci klinik i dużych podmiotów.',
        features: ['Wszystko z pakietu Pro', 'Multi-lokalizacja', 'Zaawansowane raporty zarządcze', 'Dedykowany support', 'SLA gwarantowane'],
      },
    ],
  },
  {
    slug: 'agencje-nieruchomosci',
    name: 'Agencje Nieruchomości',
    tagline: 'Automatyzacja dla agencji nieruchomości',
    Icon: Building2,
    bgRgb: '200,212,232',
    dark: '#2A4A6B',
    darkRgb: '42,74,107',
    headline: 'AI kwalifikuje leady.',
    headlineAccent: 'Ty zamykasz transakcje.',
    sub: 'Automatyczne odpowiedzi na OLX i Otodom. AI odsiewa niekwalifikowane zapytania. Agenci skupieni na klientach gotowych do zakupu.',
    heroMetrics: [
      { val: '< 2 min', label: 'czas odpowiedzi na lead' },
      { val: '+3x', label: 'kwalifikowanych leadów' },
      { val: '−80%', label: 'czas na admin' },
      { val: '100%', label: 'opisów z AI' },
    ],
    painPoints: [
      { num: '01', title: 'Odpowiedź po 4 godzinach', desc: 'Lead wpada na OLX o 19:00. Agenci nie pracują. Następnego dnia ktoś odpowiada — kupujący już wybrał inną ofertę.' },
      { num: '02', title: 'Niekwalifikowane zapytania', desc: '80% zapytań pochodzi od osób "tylko pytających". Agenci tracą czas zamiast skupić się na poważnych kupujących.' },
      { num: '03', title: 'Opisy nieruchomości to mozaika', desc: 'Każdy agent pisze inaczej. Brakuje SEO. Opisy są nudne. Zdjęcia świetne — ale tekst zniechęca do kontaktu.' },
      { num: '04', title: 'Leady giną w mailach', desc: 'Zainteresowania z portali, formularzy, social media wpadają różnymi kanałami. Bez systemu — połowa obsługiwana za późno.' },
    ],
    systems: [
      {
        name: 'Auto-odpowiedzi na portale',
        desc: 'Każde zapytanie z OLX, Otodom, Gratki — natychmiastowa odpowiedź przez chatbot AI. System pyta o budżet, termin, preferencje. Kwalifikuje kupującego zanim trafi do agenta.',
        tools: ['Make.com', 'OLX API', 'GPT-4o'],
        impact: '< 2 min czas pierwszej odpowiedzi 24/7',
      },
      {
        name: 'Kwalifikacja leadów AI',
        desc: 'AI ocenia każdy lead: budżet, pilność, powaga zamiarów. Leady A/B/C — agenci dostają tylko A. Leady B/C wchodzą w automatyczny nurturing email. Zero straconego czasu.',
        tools: ['Claude AI', 'CRM API', 'n8n'],
        impact: '+3x kwalifikowanych leadów na agenta',
      },
      {
        name: 'Generator opisów nieruchomości',
        desc: 'Agent wpisuje dane: metraż, lokalizacja, rok budowy, udogodnienia. AI generuje profesjonalny opis zoptymalizowany pod SEO w 4 wersjach. Zatwierdzasz w 1 klik.',
        tools: ['GPT-4o', 'Custom API', 'Portal API'],
        impact: '−45 minut na każdą nieruchomość',
      },
      {
        name: 'Pipeline CRM automatyczny',
        desc: 'Lead z portalu → automatycznie w CRM → przypisany do agenta → przypomnienie o follow-up. Wszystkie statusy aktualizowane automatycznie. Zarząd widzi pipeline real-time.',
        tools: ['Pipedrive/HubSpot', 'n8n', 'Zapier'],
        impact: '100% leadów w CRM, 0 zgubionych',
      },
    ],
    process: [
      { step: '01', title: 'Mapa przepływu leadów', desc: 'Audyt skąd przychodzą leady, jak są obsługiwane, gdzie uciekają. Identyfikacja największych luk w pipeline.' },
      { step: '02', title: 'Konfiguracja połączeń', desc: 'Łączymy portale ogłoszeniowe, CRM, email i SMS w jeden spójny system. Bez zmian w istniejących narzędziach.' },
      { step: '03', title: 'AI i testy', desc: 'Trenujemy modele AI pod Twoją bazę ofert. Testujemy kwalifikację na 50 realnych leadach. Dostosowujemy scoring.' },
      { step: '04', title: 'Go-live i szkolenie', desc: 'Uruchamiamy system. Szkolimy agentów z nowego flow. Przez 30 dni optymalizujemy na danych.' },
    ],
    caseStudy: {
      location: 'Trójmiasto',
      problem: 'Agencja 12 agentów. 70% czasu na niekwalifikowane leady. Czas odpowiedzi 4-8h. Opisy nieruchomości tworzone ręcznie — 45 min każdy.',
      solution: 'Auto-odpowiedzi na portale + AI kwalifikacja leadów + generator opisów + CRM pipeline. Wdrożenie w 3 tygodnie.',
      results: ['< 2 minuty czas odpowiedzi (był: 4-8h)', '+3x więcej leadów A per agent', '−45 minut na opis nieruchomości', '100% leadów w CRM, 0 zgubionych'],
      price: '5 500',
      time: '3 tygodnie',
      bigMetrics: [
        { val: 80, prefix: '−', suffix: '%', label: 'czas admin' },
        { val: 3, prefix: '+', suffix: 'x', label: 'qualified leads' },
      ],
    },
    techStack: ['Make.com', 'GPT-4o', 'Claude AI', 'n8n', 'Pipedrive', 'OLX API', 'Otodom API', 'Twilio'],
    pricing: [
      {
        name: 'Starter',
        price: '3 900 zł',
        desc: 'Auto-odpowiedzi + generator opisów.',
        features: ['Auto-odpowiedzi na 2 portale', 'Generator opisów nieruchomości', 'Podstawowy scoring leadów', 'Szkolenie 2h', '30 dni wsparcia'],
      },
      {
        name: 'Pro',
        price: '6 900 zł',
        desc: 'Pełny AI pipeline dla aktywnej agencji.',
        features: ['Auto-odpowiedzi na wszystkie portale', 'AI kwalifikacja leadów A/B/C', 'Generator opisów + SEO', 'Pipeline CRM automatyczny', 'Nurturing dla leadów B/C', 'Dashboard agencji real-time', 'Szkolenie 4h', '60 dni wsparcia'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Wycena indywidualna',
        desc: 'Dla sieci biur i dużych agencji.',
        features: ['Wszystko z pakietu Pro', 'Multi-oddział', 'Zaawansowana analityka sprzedaży', 'Integracja z systemami developerów', 'Dedykowany support'],
      },
    ],
  },
  {
    slug: 'deweloperzy',
    name: 'Deweloperzy',
    tagline: 'Automatyzacja dla firm deweloperskich',
    Icon: Landmark,
    bgRgb: '232,220,200',
    dark: '#6B4A1A',
    darkRgb: '107,74,26',
    headline: 'Raporty o 8:00.',
    headlineAccent: 'Dane real-time. Zero ręcznej pracy.',
    sub: 'Handlowcy skupieni na sprzedaży — nie na excelu. Zarząd ma dane bez proszenia o nie. Pipeline CRM aktualizuje się sam.',
    heroMetrics: [
      { val: '0h', label: 'ręcznego raportowania' },
      { val: '+35%', label: 'konwersja leadów' },
      { val: 'Real-time', label: 'KPI dla zarządu' },
      { val: '4 tyg', label: 'czas wdrożenia' },
    ],
    painPoints: [
      { num: '01', title: 'Raport sprzedaży = 3h w excelu', desc: 'Handlowcy co tydzień ręcznie kompilują dane z różnych źródeł. 3 godziny na raport który zarząd czyta przez 5 minut.' },
      { num: '02', title: 'Zarząd pyta "jak idzie sprzedaż?"', desc: 'Nikt nie ma danych na bieżąco. Zarząd pyta, handlowiec przerywa pracę, robi raport, wysyła. Pętla bez końca.' },
      { num: '03', title: 'Follow-up według "pamięci"', desc: 'Który kupujący był zainteresowany 3 tygodnie temu? Bez systemu — nikt nie wie. Leady stygną bez powodu.' },
      { num: '04', title: 'ERP i CRM to osobne wyspy', desc: 'Dane sprzedażowe, finansowe, harmonogramy — w różnych systemach. Nikt nie widzi pełnego obrazu. Decyzje na przeczucie.' },
    ],
    systems: [
      {
        name: 'Auto-raporty PDF o 8:00',
        desc: 'Każdego ranka o 8:00 zarząd i handlowcy dostają email z raportem PDF: sprzedaż wczoraj, stan budowy, KPI vs. plan, prognozy. Dane pobrane automatycznie z CRM + ERP.',
        tools: ['n8n', 'PostgreSQL', 'PDF Generator'],
        impact: '0h ręcznego raportowania',
      },
      {
        name: 'Dashboard KPI real-time',
        desc: 'Live dashboard dostępny 24/7: liczba leadów, umów, rezygnacji, tempo sprzedaży per projekt, porównanie z planem. Zarząd ma odpowiedź zanim zada pytanie.',
        tools: ['n8n', 'Metabase', 'PostgreSQL'],
        impact: 'Dane dla zarządu w każdej chwili',
      },
      {
        name: 'CRM pipeline z follow-up AI',
        desc: 'Każdy lead automatycznie trafia do pipeline. AI sugeruje kolejny krok: "Ten klient oglądał 3 mieszkania — zadzwoń jutro". Automatyczne sekwencje email dla zimnych leadów.',
        tools: ['HubSpot/Pipedrive', 'Claude AI', 'Make.com'],
        impact: '+35% konwersja leadów',
      },
      {
        name: 'Integracja ERP',
        desc: 'Połączenie CRM ze sprzedaży z ERP finansowym i systemem zarządzania budową. Jeden widok: co sprzedane, co w budowie, kiedy odbiór, jakie cashflow z inwestycji.',
        tools: ['n8n', 'REST API', 'ERP Connector'],
        impact: 'Jeden dashboard dla całej firmy',
      },
    ],
    process: [
      { step: '01', title: 'Mapa danych', desc: 'Audyt gdzie żyją dane: CRM, ERP, excele, email. Mapujemy przepływ informacji od leadu do odbioru kluczy.' },
      { step: '02', title: 'Architektura systemu', desc: 'Projektujemy integracje między systemami. Definiujemy KPI które chcesz mierzyć. Dashboard mockup przed budową.' },
      { step: '03', title: 'Budowa integracji', desc: 'Łączymy systemy, budujemy pipeline CRM, konfigurujemy automatyczne raporty. Testujemy na danych historycznych.' },
      { step: '04', title: 'Wdrożenie i onboarding', desc: 'Go-live. Szkolimy handlowców i zarząd. Przez 30 dni dostosowujemy dashboardy do realnych potrzeb.' },
    ],
    caseStudy: {
      location: 'Polska (5 inwestycji)',
      problem: 'Handlowcy tracili 3h dziennie na raportowanie. Zarząd nie miał danych on-demand. CRM i ERP nie były zintegrowane. Zero automatycznego follow-up.',
      solution: 'Auto-raporty PDF o 8:00 + dashboard KPI real-time + CRM pipeline z AI + integracja ERP. Wdrożenie w 4 tygodnie.',
      results: ['0h ręcznego raportowania (były 3h dziennie)', 'Zarząd ma dane live 24/7', '+35% konwersja leadów dzięki follow-up AI', 'ROI w automatyzację: 8 tygodni'],
      price: '6 900',
      time: '4 tygodnie',
      bigMetrics: [
        { val: 0, prefix: '', suffix: 'h', label: 'raportowania' },
        { val: 35, prefix: '+', suffix: '%', label: 'konwersja' },
      ],
    },
    techStack: ['n8n', 'PostgreSQL', 'Claude AI', 'Make.com', 'HubSpot', 'Metabase', 'ERP API', 'PDF Generator'],
    pricing: [
      {
        name: 'Starter',
        price: '4 900 zł',
        desc: 'Raporty auto + podstawowy CRM pipeline.',
        features: ['Auto-raport dzienny PDF', 'Podstawowy pipeline CRM', 'Follow-up email automatyczny', 'Szkolenie 2h', '30 dni wsparcia'],
      },
      {
        name: 'Pro',
        price: '8 900 zł',
        desc: 'Pełna automatyzacja dla aktywnego developera.',
        features: ['Auto-raporty PDF o 8:00', 'Dashboard KPI real-time', 'CRM pipeline z AI follow-up', 'Integracja z ERP (1 system)', 'Alerty anomalii automatyczne', 'Szkolenie 4h dla zarządu i handlowców', '60 dni wsparcia'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Wycena indywidualna',
        desc: 'Dla holdingów i sieci inwestycji.',
        features: ['Wszystko z pakietu Pro', 'Multi-projekt i multi-spółka', 'Zaawansowana analityka finansowa', 'Integracja z wieloma ERP', 'Dedykowany data engineer'],
      },
    ],
  },
  {
    slug: 'firmy-produkcyjne',
    name: 'Firmy Produkcyjne',
    tagline: 'Automatyzacja dla produkcji',
    Icon: Factory,
    bgRgb: '212,200,232',
    dark: '#4A2A6B',
    darkRgb: '74,42,107',
    headline: 'Twoja produkcja.',
    headlineAccent: 'Zawsze pod kontrolą.',
    sub: 'Automatyczne zamówienia gdy stan spada. Raporty produkcyjne bez exceli. Eskalacje zanim problem zatrzyma linię.',
    heroMetrics: [
      { val: '0', label: 'stock-outów / miesiąc' },
      { val: '−70%', label: 'manualne eskalacje' },
      { val: 'Codziennie 6:00', label: 'raport produkcji' },
      { val: '3-4 tyg', label: 'czas wdrożenia' },
    ],
    painPoints: [
      { num: '01', title: '"Znowu brak komponentów"', desc: 'Produkcja staje bo ktoś zapomniał zamówić. Informacja o niskim stanie dotarła za późno. Linia stoi — koszty lecą.' },
      { num: '02', title: 'Raporty z wczorajszymi danymi', desc: 'Kierownik produkcji co rano kompiluje raport z 4 arkuszy. Do 9:00 ma dane z dnia poprzedniego. Decyzje na przeszłości, nie teraźniejszości.' },
      { num: '03', title: 'Eskalacje przez email i telefon', desc: 'Awaria maszyny → mail do managera → czeka → dzwoni → tłumaczy od początku. W tym czasie linia stoi.' },
      { num: '04', title: 'ERP i WMS to osobne wyspy', desc: 'Dane zamówień, stany magazynowe, harmonogram — w różnych systemach. Nikt ich nie integruje. Decyzje na przeczucie.' },
    ],
    systems: [
      {
        name: 'Auto-zamówienia przy niskim stanie',
        desc: 'System monitoruje stany magazynowe co godzinę. Gdy komponent spadnie poniżej minimum → automatyczne zamówienie u preferowanego dostawcy + powiadomienie do managera. Koniec z stock-outami.',
        tools: ['n8n', 'ERP API', 'Email/EDI'],
        impact: '0 stock-outów dzięki automatycznej reakcji',
      },
      {
        name: 'Raport produkcji codziennie 6:00',
        desc: 'Każdego dnia o 6:00 manager produkcji dostaje email + PDF: output wczoraj vs. plan, efektywność linii, przestoje, OEE, zużycie materiałów. Dane pobrane z MES/ERP automatycznie.',
        tools: ['n8n', 'MES API', 'PDF Generator'],
        impact: '−3h dziennie ręcznego raportowania',
      },
      {
        name: 'System zgłoszeń i eskalacji',
        desc: 'Operator zgłasza problem przez aplikację lub SMS → automatyczne powiadomienie do właściwej osoby z priorytetem → eskalacja po 15 min bez odpowiedzi. Pełna ścieżka w systemie, zero telefonów.',
        tools: ['Custom App', 'Twilio', 'Slack/Teams'],
        impact: '−70% czas rozwiązania zgłoszeń',
      },
      {
        name: 'Integracja ERP + WMS + MES',
        desc: 'Łączymy systemy produkcyjne w jeden widok: stan magazynu, aktywne zlecenia, harmonogram produkcji, KPI linii. Jeden dashboard zamiast 4 systemów logowania.',
        tools: ['n8n', 'REST APIs', 'PostgreSQL'],
        impact: 'Jeden widok całej produkcji',
      },
    ],
    process: [
      { step: '01', title: 'Audyt systemów', desc: 'Mapujemy Twoje ERP, WMS, MES, arkusze. Identyfikujemy 3 największe źródła strat i ręcznej pracy.' },
      { step: '02', title: 'Architektura integracji', desc: 'Projektujemy przepływ danych między systemami. Definiujemy progi alertów, reguły eskalacji, format raportów.' },
      { step: '03', title: 'Budowa na staging', desc: 'Budujemy na środowisku testowym. Testujemy przez 2 tygodnie równolegle z obecnymi procesami. Zero ryzyka dla produkcji.' },
      { step: '04', title: 'Go-live i szkolenie', desc: 'Wdrożenie na produkcję. Szkolimy operatorów, kierowników i zarząd. 30 dni wsparcia i optymalizacji.' },
    ],
    caseStudy: {
      location: 'Śląsk',
      problem: 'Fabryka 150 pracowników. Stock-outy 2-3 razy w miesiącu (100 000 zł strat). Ręczne raporty 3h dziennie. Czas reakcji na zgłoszenia 45 minut.',
      solution: 'Auto-zamówienia + raporty produkcji codziennie + system eskalacji + integracja ERP/WMS. Wdrożenie w 4 tygodnie.',
      results: ['0 stock-outów przez pierwsze 3 miesiące', '−3h dziennie ręcznego raportowania', '−70% czas reakcji na zgłoszenia (z 45 do 12 minut)', 'Zwrot z inwestycji w < 2 miesiące'],
      price: '7 900',
      time: '4 tygodnie',
      bigMetrics: [
        { val: 0, prefix: '', suffix: '', label: 'stock-outów' },
        { val: 70, prefix: '−', suffix: '%', label: 'eskalacji' },
      ],
    },
    techStack: ['n8n', 'Make.com', 'ERP API', 'WMS API', 'Twilio', 'PostgreSQL', 'PDF Generator', 'Custom App'],
    pricing: [
      {
        name: 'Starter',
        price: '5 900 zł',
        desc: 'Auto-zamówienia + raporty produkcji.',
        features: ['System auto-zamówień (1 magazyn)', 'Dzienny raport produkcji PDF', 'Alerty SMS/email', 'Szkolenie 2h', '30 dni wsparcia'],
      },
      {
        name: 'Pro',
        price: '9 900 zł',
        desc: 'Pełna automatyzacja procesów produkcyjnych.',
        features: ['Auto-zamówienia (nieograniczone magazyny)', 'Raporty produkcji + OEE codziennie', 'System zgłoszeń i eskalacji', 'Dashboard produkcji real-time', 'Integracja z 1 ERP + WMS', 'Szkolenie 4h dla całego zespołu', '60 dni wsparcia'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Wycena indywidualna',
        desc: 'Dla zakładów wielooddziałowych i holdingów.',
        features: ['Wszystko z pakietu Pro', 'Multi-zakład', 'Integracja z wieloma ERP/MES', 'Zaawansowana analityka', 'Dedykowany inżynier systemów'],
      },
    ],
  },
]

export const getNicheBySlug = (slug: string): NicheData | undefined =>
  NICHES.find((n) => n.slug === slug)
