# 🏢 Portal Lokalny CMS

Nowoczesny portal lokalny z systemem zarządzania treścią, ogłoszeniami i reklamami. Zbudowany w Next.js 14, Firebase i TypeScript.

![Portal Lokalny](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop)

## 🚀 Demo

**Live Demo**: [https://local-news-40c61.web.app](https://local-news-40c61.web.app)

## ✨ Funkcjonalności

### 🏠 Portal Publiczny
- **Responsywny design** - działa na wszystkich urządzeniach
- **Hero Slider** - ruchome reklamy z analytics
- **System artykułów** - aktualności z kategoryzacją
- **Ogłoszenia** - kompletny system classified ads
- **Newsletter** - automatyczna subskrypcja
- **Wyszukiwarka** - zaawansowane filtry
- **SEO optimized** - meta tagi, strukturalne dane

### 💰 Monetyzacja
- **Płatne ogłoszenia** - różne pakiety cenowe
- **System reklamowy** - bannery, slidery, sponsored content
- **Premium listings** - wyróżnione ogłoszenia
- **Analytics** - śledzenie CTR, impressions, konwersji
- **Pakiety biznesowe** - dla firm lokalnych

### 🛠️ Panel Administracyjny
- **CMS Dashboard** - zarządzanie treścią
- **Zarządzanie użytkownikami** - role i uprawnienia
- **Moderacja ogłoszeń** - zatwierdzanie i edycja
- **Analytics panel** - raporty i statystyki
- **Zarządzanie reklamami** - kampanie i targeting

### 🔧 Technologie
- **Next.js 14** - React framework z App Router
- **TypeScript** - type safety
- **Firebase** - backend, hosting, auth, database
- **Tailwind CSS** - styling
- **Lucide React** - ikony
- **React Hook Form** - formularze
- **Hot Toast** - notifikacje

## 📦 Instalacja

### Wymagania
- Node.js 18+
- npm lub yarn
- Konto Firebase
- Git

### Krok 1: Klonowanie repozytorium
```bash
git clone https://github.com/djmisieq/local-portal-cms.git
cd local-portal-cms
```

### Krok 2: Instalacja zależności
```bash
npm install
# lub
yarn install
```

### Krok 3: Konfiguracja Firebase

1. **Utwórz projekt Firebase**:
   - Idź do [Firebase Console](https://console.firebase.google.com)
   - Kliknij "Add project"
   - Podążaj za instrukcjami

2. **Włącz wymagane usługi**:
   - **Authentication** (Email/Password, Google)
   - **Firestore Database**
   - **Storage**
   - **Hosting**
   - **Analytics**

3. **Pobierz konfigurację**:
   - Project Settings → General → Your apps
   - Kliknij "Web app" icon
   - Skopiuj config object

### Krok 4: Zmienne środowiskowe
```bash
cp .env.example .env.local
```

Edytuj `.env.local` i uzupełnij Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### Krok 5: Uruchomienie
```bash
npm run dev
# lub
yarn dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 🚀 Deployment

### Firebase Hosting (Rekomendowane)

1. **Zainstaluj Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Zaloguj się**:
```bash
firebase login
```

3. **Zainicjuj projekt**:
```bash
firebase init hosting
```

4. **Deploy**:
```bash
npm run build
firebase deploy
```

### Automatyczne CI/CD

GitHub Actions automatycznie deployuje przy push do `main`:
- ✅ Type checking
- ✅ Linting
- ✅ Building
- ✅ Firebase Hosting deploy
- ✅ Preview deployments dla PR

**Wymagane GitHub Secrets**:
```
FIREBASE_SERVICE_ACCOUNT_LOCAL_NEWS_40C61
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## 📊 Struktura Projektu

```
local-portal-cms/
├── app/                    # Next.js 14 App Router
│   ├── globals.css         # Globalne style
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Strona główna
├── components/             # Komponenty React
│   ├── Header.tsx          # Nawigacja
│   ├── HeroSlider.tsx      # Slider reklamowy
│   ├── ArticleGrid.tsx     # Lista artykułów
│   ├── ClassifiedsSection.tsx # Ogłoszenia
│   ├── SidebarAds.tsx      # Reklamy sidebar
│   ├── Newsletter.tsx      # Subskrypcja
│   ├── Footer.tsx          # Stopka
│   └── LoadingSpinner.tsx  # Loading states
├── lib/                    # Utilities i konfiguracja
│   └── firebase.ts         # Firebase config
├── types/                  # TypeScript definitions
│   └── index.ts            # Interfejsy i typy
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml          # CI/CD pipeline
├── package.json            # Dependencies
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind config
├── tsconfig.json           # TypeScript config
└── README.md               # Ta dokumentacja
```

## 🎯 Roadmapa Funkcjonalności

### ✅ Zrealizowane (v1.0)
- [x] Podstawowy portal z artykułami
- [x] System ogłoszeń
- [x] Slider reklamowy
- [x] Newsletter
- [x] Responsive design
- [x] Firebase integration
- [x] CI/CD pipeline

### 🚧 W planach (v1.1)
- [ ] Panel administracyjny CMS
- [ ] System płatności (Stripe)
- [ ] Zaawansowana wyszukiwarka
- [ ] Systemy moderacji
- [ ] Push notifications
- [ ] Mobile app (React Native)

### 🔮 Przyszłość (v2.0)
- [ ] AI-powered content recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Events management system
- [ ] Real estate portal integration

## 💡 Customizacja

### Zmiana kolorów
Edytuj `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Twoje kolory
      }
    }
  }
}
```

### Dodawanie nowych komponentów
1. Utwórz plik w `/components/`
2. Eksportuj jako default
3. Importuj w potrzebnym miejscu

### Konfiguracja Firebase rules
Przykładowe Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to articles
    match /articles/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        resource.data.authorId == request.auth.uid;
    }
    
    // Classifieds with user ownership
    match /classifieds/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🤝 Contributing

1. Fork repo
2. Utwórz feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

## 📄 Licencja

MIT License - zobacz [LICENSE](LICENSE) dla szczegółów.

## 🆘 Pomoc i Wsparcie

### Problemy techniczne
- 🐛 [Issues](https://github.com/djmisieq/local-portal-cms/issues)
- 📖 [Documentation](https://github.com/djmisieq/local-portal-cms/wiki)
- 💬 [Discussions](https://github.com/djmisieq/local-portal-cms/discussions)

### Kontakt
- 📧 Email: kontakt@portal-lokalny.pl
- 🐦 Twitter: [@portal_lokalny](https://twitter.com/portal_lokalny)
- 💼 LinkedIn: [Portal Lokalny](https://linkedin.com/company/portal-lokalny)

---

**Zbudowane z ❤️ dla społeczności lokalnych**

Portal Lokalny to open-source rozwiązanie dla wszystkich, którzy chcą tworzyć silne więzi w swoich społecznościach lokalnych.
