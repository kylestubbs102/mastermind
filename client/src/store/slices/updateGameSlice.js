import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "white",
  gameFinished: false,
  gameStarted: false,
  isGuessingPlayer: false,
  guesses: [],
  secret: [],
};

export const updateGameSlice = createSlice({
  name: "updateGame",
  initialState: initialState,
  reducers: {
    setSecret: (state, action) => {
      state.secret = action.payload;
    },

    setSecretSingleplayer: (state, action) => {
      state.isGuessingPlayer = action.payload.isGuessingPlayer;
      state.secret = action.payload.secret;
    },

    gameReadyReceived: (state, action) => {
      state.isGuessingPlayer = action.payload.isGuessingPlayer;
      state.gameStarted = action.payload.gameStarted;
    },

    updateGuesses: (state, action) => {
      state.guesses = action.payload;
    },

    setGameFinished: (state, action) => {
      state.gameFinished = action.payload;
    },

    exitToHomeScreen: (state) => {
      state = initialState;
    },

    resetMultiplayerGame: (state, action) => {
      state.secret = action.payload.secret;
      state.isGuessingPlayer = action.payload.isGuessingPlayer;
      state.gameFinished = false;
      state.gameStarted = true;
      state.guesses = [];
      state.color = "white";
    },

    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const {
  setSecret,
  setSecretSingleplayer,
  gameReadyReceived,
  updateGuesses,
  setGameFinished,
  exitToHomeScreen,
  resetMultiplayerGame,
  setColor,
} = updateGameSlice.actions;

export default updateGameSlice.reducer;
