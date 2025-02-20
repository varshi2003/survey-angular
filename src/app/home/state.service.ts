import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state: { [key: string]: any } = {};
  private listeners: { [key: string]: Function[] } = {};

  getState(key?: string): any {
    return key ? this.state[key] : { ...this.state };
  }

  setState(key: string, value: any): void {
    this.state[key] = value;
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(value));
    }
  }

  removeState(key: string): void {
    delete this.state[key];
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(undefined));
    }
  }

  subscribe(key: string, callback: Function): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
  }

  unsubscribe(key: string, callback: Function): void {
    if (this.listeners[key]) {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    }
  }
}
