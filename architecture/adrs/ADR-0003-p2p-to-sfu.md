# ADR-0003 — Topologie media: P2P inițial, migrare la SFU
## Status
Accepted — 2025-10-07

## Context
MVP: 1:1 sau 1:N redus. Pe termen mediu vrem multi-observer/room.

## Opțiuni
- P2P pur (simplu, ieftin; N^2 streams)
- SFU (Selective Forwarding Unit: mediasoup/Janus) — un uplink, N downlinks
- MCU (server mix) — cost server ridicat, latență mai mare

## Decizie
Start **P2P + TURN**. Când >2-3 observatori / room sau CPU/bandwidth devin problematice, migrăm la **SFU**.

## Consecințe
+ MVP rapid, cost minim
+ Cale clară de upgrade la SFU
− P2P nu scalează bine pentru N mare
− Introducere SFU va cere schimbări în signaling și deployment
