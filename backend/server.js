/**
 * Minimal signaling server (WebSocket) for ATCSL
 * Usage: node backend/server.js
 */
const http = require('http');
const WebSocket = require('ws'); // run: npm i ws (in repo root or backend folder)

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const rooms = new Map(); // roomId -> Set of sockets

function joinRoom(ws, roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws._roomId = roomId;
}

function leaveRoom(ws) {
  const roomId = ws._roomId;
  if (!roomId) return;
  const set = rooms.get(roomId);
  if (set) {
    set.delete(ws);
    if (set.size === 0) rooms.delete(roomId);
  }
  ws._roomId = null;
}

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      if (data.type === 'join' && data.room) {
        joinRoom(ws, data.room);
        ws.send(JSON.stringify({ type: 'joined', room: data.room }));
        return;
      }
      // Relay SDP/ICE to peers in room
      if (ws._roomId && (data.type === 'offer' || data.type === 'answer' || data.type === 'ice')) {
        for (const peer of rooms.get(ws._roomId) || []) {
          if (peer !== ws && peer.readyState === WebSocket.OPEN) {
            peer.send(JSON.stringify({ from: 'peer', payload: data }));
          }
        }
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: e.message }));
    }
  });

  ws.on('close', () => leaveRoom(ws));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Signaling WS on ws://localhost:${PORT}`));
