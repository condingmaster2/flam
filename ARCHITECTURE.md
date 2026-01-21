# Architecture Overview — Real-Time Collaborative Drawing Canvas

##  Data Flow
User Input → Canvas → WebSocket emit → Server → Broadcast → Other Clients → Canvas Render

## 🛰 WebSocket Message Types
- DRAW_START
- DRAW_MOVE
- DRAW_END
- CURSOR_MOVE
- UNDO
- REDO
- SYNC_STATE

##  Global Undo/Redo Strategy
Maintains a global operation log.
Undo pops the latest operation from any user.
Redo re-applies last popped operation.
Canvas is redrawn from state history.

##  Conflict Resolution
Last-write-wins for overlapping segments.
Cursor presence indicators avoid human collisions.

##  Performance Optimizations
- Event batching
- Throttled cursor broadcasts
- Frame-based canvas redraw
- Layered stroke history

##  Scaling Thoughts
For >1000 concurrent users:
- Redis Pub/Sub for broadcast fan-out
- Room sharding
- Sticky sessions
- CDNs for static assets

##  Notes
Architecture is intentionally simple for interview evaluation,
focuses on correctness + synchronization under concurrency.
