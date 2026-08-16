class CinematicDirector {
  constructor() {
    this.state = "IDLE";
  }

  enter(state) {
    this.state = state;
  }

  get current() {
    return this.state;
  }
}

export default new CinematicDirector();