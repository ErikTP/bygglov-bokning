# Bygglov MVP – Bokningsbar rådgivning med videomöte

Examensarbete utvecklat för Bygglov.se.

## Projektbeskrivning

Bygglov.se erbjuder idag rådgivning där användaren skickar in en förfrågan. Syftet med detta projekt var att undersöka hur tjänsten kan utvecklas till en bokningsbar rådgivningstjänst där användaren kan matchas med en expert, boka rådgivning och genomföra videomöten digitalt.

Projektet utvecklades som en MVP (Minimum Viable Product) med fokus på att validera funktionalitet, användarflöden och tekniska lösningar innan en eventuell fullskalig implementation.

---

# Projektets mål

Användaren ska kunna:

- Registrera konto
- Logga in
- Beskriva sitt projekt
- Matchas med rådgivare
- Skicka bokningsförfrågan
- Få bokningsbekräftelse
- Ansluta till videomöte

Administratören ska kunna:

- Se inkomna bokningar
- Hantera bokningar
- Acceptera bokningar
- Ange datum och tid
- Skicka mötesbekräftelse
- Skicka videomöteslänk

---

# Teknikstack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

## Backend

- Next.js API Routes
- Node.js

## Databas

- MongoDB Atlas
- Mongoose

## Autentisering

- NextAuth
- GitHub OAuth

## E-post

- Resend

## Tester

- Playwright

## DevOps

- Docker
- Azure Container Registry
- Azure App Service
- GitHub Actions

---

# Branch-struktur

Projektet utvecklades enligt Git Flow-liknande arbetsmetod där nya funktioner implementerades i separata feature-branches innan merge till main.

## Viktigare branches

### feature/nextauth-mongodb-setup

Ansvarade för:

- MongoDB Atlas
- Mongoose
- NextAuth
- GitHub OAuth
- Registrering
- Inloggning

### feature/user-bookings

Ansvarade för:

- Bokningssystem
- Dashboard
- Mina bokade möten
- Bokningsförfrågningar
- Matchning mot rådgivare

### feature/admin-booking-management

Ansvarade för:

- Adminpanel
- Hantering av bokningar
- Acceptera bokningar
- Mötesinformation
- Möteslänkar

### feature/resend-email-integration

Ansvarade för:

- Resend
- E-postbekräftelser
- Automatiska notifieringar vid accepterade bokningar

### main

Produktionsbranch som deployas till Azure.

---

# Projektstruktur

```txt
src/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── bookings/
│   │   └── signup/
│   │
│   ├── dashboard/
│   ├── admin/
│   ├── registrering/
│   ├── inloggning/
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── booking/
│   ├── advisor/
│   └── ui/
│
├── models/
│   ├── User.ts
│   └── Booking.ts
│
├── lib/
│   ├── mongodb.ts
│   └── resend.ts
│
└── middleware/
```

---

# Installation

## Klona projektet

```bash
git clone https://github.com/ErikTP/bygglov-bokning.git
```

```bash
cd bygglov-bokning
```

## Installera beroenden

```bash
npm install
```

## Starta utvecklingsserver

```bash
npm run dev
```

Projektet startar på:

```txt
http://localhost:3000
```

---

# Miljövariabler

Skapa en fil:

```txt
.env.local
```

och lägg till:

```env
MONGO=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

RESEND_API_KEY=
RESEND_FROM_EMAIL=Bygglov <onboarding@resend.dev>
```

---

# Förklaring av miljövariabler

## MONGO

MongoDB Atlas anslutningssträng.

Används för att ansluta applikationen mot databasen.

---

## NEXTAUTH_URL

Bas-URL som används av NextAuth för autentisering och callback-routes.

Exempel lokalt:

```env
NEXTAUTH_URL=http://localhost:3000
```

Exempel produktion:

```env
NEXTAUTH_URL=https://bygglov-mvp-container.azurewebsites.net
```

---

## NEXTAUTH_SECRET

Används av NextAuth för:

- Sessionshantering
- JWT-signering
- Kryptering

---

## GITHUB_ID

Client ID från GitHub OAuth App.

---

## GITHUB_SECRET

Client Secret från GitHub OAuth App.

Används tillsammans med Client ID för GitHub-inloggning.

---

## RESEND_API_KEY

API-nyckel från Resend.

Används för att skicka bokningsbekräftelser via e-post.

---

## RESEND_FROM_EMAIL

Avsändaradress för e-postutskick.

---

# Deployment

Projektet deployas via Docker till Azure.

Deployment-flöde:

```txt
GitHub
↓
GitHub Actions
↓
Docker Build
↓
Azure Container Registry
↓
Azure App Service
```

---

# GitHub Actions

Projektet använder flera workflows.

## CI

Kontrollerar:

- Build
- TypeScript
- Installation av dependencies

## Docker Deployment

Bygger Docker image och pushar till Azure Container Registry.

## Azure Deployment

Deployar applikationen till Azure App Service.

## Playwright

Kör automatiserade användartester.

---

# Bokningsflöde

## Användare

1. Loggar in
2. Beskriver sitt projekt
3. Matchas mot rådgivare
4. Skickar bokningsförfrågan
5. Bokning sparas i MongoDB
6. Bokningen visas under "Mina bokade möten"

## Administratör

1. Loggar in
2. Öppnar adminpanel
3. Ser inkomna bokningar
4. Anger datum
5. Anger tid
6. Anger videolänk
7. Accepterar bokningen

## Efter godkännande

1. Status ändras till accepted
2. Resend skickar e-post
3. Användaren får notifiering
4. Videomötesknappen aktiveras
5. Båda parter kan ansluta till mötet

---

# Rekommendationer för vidareutveckling

## AI-assistent

Integrera OpenAI eller Azure OpenAI för:

- Automatisk rådgivning
- Ärendeanalys
- Matchning mot rådgivare
- Förslag på tjänster

---

## BankID

Ersätt GitHub-inloggning med BankID.

Fördelar:

- Säkrare autentisering
- Svensk standard
- Verifierade användare

---

## Full Whereby-integration

Nuvarande MVP använder externa möteslänkar.

Vidareutveckling:

- Automatiskt skapade mötesrum
- Unika möteslänkar per bokning
- Automatisk koppling till användare

---

## Advisor-system

Skapa separat Advisor-modell.

Exempel:

- advisorId
- kompetenser
- tillgänglighet
- kalender

Endast rätt rådgivare ska kunna hantera sina bokningar.

---

## Kalenderintegration

- Google Calendar
- Microsoft Outlook

Automatiska bokningar och påminnelser.

---

## Betalningslösning

Integrera:

- Stripe
- Klarna

För framtida rådgivningstjänster.

---

## Tillgänglighet

Genomför full WCAG-granskning:

- Tangentbordsnavigering
- ARIA-attribut
- Färgkontraster
- Skärmläsarstöd

---

# Författare

Erik Torres Puente

Frontendutvecklare för webb och mobil

Chas Academy

Examensarbete utvecklat tillsammans med Bygglov.se