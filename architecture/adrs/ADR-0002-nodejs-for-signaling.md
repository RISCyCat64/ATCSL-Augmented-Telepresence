# ADR-0002 — Limbaj/Runtime pentru semnalizare: Node.js vs. Go
## Status
Accepted — 2025-10-07

## Context
Semnalizarea este I/O-bound (WebSocket), necesită iterație rapidă, ecosistem bogat JS pentru front+back.

## Opțiuni
- Node.js (ws/express, time-to-market rapid)
- Go (performant, tipaj static, dar iterație mai lentă pentru UI)
- Python (rapid, dar mai slab pe WS throughput)

## Decizie
**Node.js** pentru MVP (semnalizare WS). Motive: ecosistem, viteză dezvoltare, împărtășire modele/DTO între FE/BE.

## Consecințe
+ TTM mic, librării mature
+ Unificare stack JS
− CPU-bound mai slab decât Go (OK pentru MVP)
− Va necesita hardening (rate-limit, circuit breakers)
