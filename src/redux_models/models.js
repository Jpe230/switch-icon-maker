export const panel = {
  state: 0,
  reducers: {
    next(s) {
      return s + 1;
    },
  },
};

export const titles = {
  state: [],
  reducers: {
    add(state, title) {
      return [...state, title];
    },
    addRange(state, titles) {
      return [...state, ...titles];
    }
  }
}

export const overlay = {
  state: "",
  reducers: {
    set(s, payload){
      return payload;
    }
  }
}

export const apikey = {
  state: "",
  reducers: {
    set(s, payload){
      return payload;
    }
  }
}
