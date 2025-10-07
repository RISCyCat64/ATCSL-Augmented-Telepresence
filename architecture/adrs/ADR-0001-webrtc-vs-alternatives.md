# ADR-0001 — Media transport: WebRTC vs. alternative (gStreamer/RTMP/SRT)
## Status
Accepted — 2025-10-07

## Context
Avem nevoie de streaming audio/video low-latency, bidirecțional, cu NAT traversal, criptare implicită și suport browser.

## Opțiuni evaluate
- WebRTC (DTLS/SRTP, ICE, STUN/TURN, E2E media)
- gStreamer + RTP/SRT (puternic, dar fără suport browser nativ)
- RTMP/HLS/DASH (latență mai mare, one-way, server-centric)

## Decizie
Alegem **WebRTC** pentru MVP: latență sub 200ms, suport direct în browser, ICE/NAT traversal, criptare obligatorie, API-uri standard.

## Consecințe
+ Setup simplu client-side, fără pluginuri
+ E2E media criptată implicit
+ Scale-out ulterior posibil prin SFU (mediasoup/Janus)
− Complexitate semnalizare (offer/answer/ICE)
− Multi-party necesită SFU pentru eficiență
