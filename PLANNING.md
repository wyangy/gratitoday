# Gratitoday - Planning

## Purpose
Daily gratitude journal for mental health and wellbeing. Built for Power Coders application.

## Core Features
- [ ] Add gratitude entry (single text field + auto date)
- [ ] Display all entries (newest first)
- [ ] Delete entries
- [ ] localStorage persistence
- [ ] Responsive mobile-first design

## Tech Stack
- React (functional components, hooks)
- CSS
- localStorage
- Jest + React Testing Library
- Vercel deployment

## Components
- App (main container)
- Header (title)
- GratitudeForm (text input + submit button)
- GratitudeList (display entries)
- GratitudeItem (single entry with delete button)

## Tests
- Form submission adds entry
- Entry deletion works
- localStorage persistence
- Empty state handling
- Cannot submit empty entry