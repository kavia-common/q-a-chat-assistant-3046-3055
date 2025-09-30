import { Injectable } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * EventBusService provides a minimal event publish/subscribe pattern to avoid direct global DOM usage.
 * This is a public service.
 */
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private listeners = new Map<string, Set<(detail: any) => void>>();

  // PUBLIC_INTERFACE
  on(event: string, handler: (detail: any) => void) {
    /** This is a public function. Subscribes to an event; returns an unsubscribe function. */
    const set = this.listeners.get(event) ?? new Set();
    set.add(handler);
    this.listeners.set(event, set);
    return () => {
      set.delete(handler);
    };
  }

  // PUBLIC_INTERFACE
  emit(event: string, detail?: any) {
    /** This is a public function. Emits an event to all listeners. */
    const set = this.listeners.get(event);
    if (!set) return;
    for (const cb of set) {
      try { cb(detail); } catch (e) { console.error('Event handler error', e); }
    }
  }
}
