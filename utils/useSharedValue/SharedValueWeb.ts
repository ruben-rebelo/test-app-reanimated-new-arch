type Callback<T> = (previousValue: T, value: T) => void;

class SharedValueWeb<T> {
  private _previousValue: T;
  private _value: T;
  private listeners: Map<number, Callback<T>>;
  private nextId: number;

  get previousValue(): T {
    return this._previousValue;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._previousValue = this._value;
    this._value = value;
    this.notifyListeners();
  }

  constructor(value: T) {
    this._value = value;
    this._previousValue = value;
    this.listeners = new Map();
    this.nextId = 0;
  }

  subscribe(callback: Callback<T>): () => void {
    callback(this._previousValue, this._value);
    const id = this.nextId++;
    this.listeners.set(id, callback);

    return () => {
      this.listeners.delete(id);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => {
      callback(this._previousValue, this._value);
    });
  }
}

export { SharedValueWeb };
