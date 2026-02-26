# Deploying to GitHub Pages

## Option A: GitHub Actions (recommended)

1. Push your code to GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. Push to `main` — the workflow will build and deploy automatically

## Option B: gh-pages branch

1. Run: `npm run deploy`
2. Go to **Settings → Pages**
3. Set **Source** to **Deploy from a branch**
4. Choose branch **gh-pages** and folder **/ (root)**
5. Save

Your site will be at: **https://zacbemis.github.io/bio-app/**
