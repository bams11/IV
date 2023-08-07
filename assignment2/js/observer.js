// Subject 클래스
class Subject {
  constructor() {
    this.observers = [];
    this.state = null;
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  unregisterObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  setState(state) {
    this.state = state;
    this.notifyObservers();
  }

  getState() {
    return this.state;
  }
}

// Observer 인터페이스
class Observer {
  update(state) {
    console.log("새로운 상태:", state);
  }
}

export {Subject, Observer};
