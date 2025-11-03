# Movie List App Arsenal

A modern movie and TV show streaming application built with React and Vite.

## Features

- Browse trending movies and TV shows
- Search for movies, TV shows, and anime
- Stream content from multiple sources
- Responsive design with Tailwind CSS

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
   
   You can get a free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_TMDB_API_KEY` - Your TMDB API key (required)

See `.env.example` for reference.

## Tech Stack

- React
- Vite
- Tailwind CSS
- TMDB API

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
