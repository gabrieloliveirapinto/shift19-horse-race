import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyA6h0xfgQ7LEaz4nOdA69aD3wpchc3_fW8",
  authDomain: "shift-horse-race.firebaseapp.com",
  databaseURL: "https://shift-horse-race.firebaseio.com",
  projectId: "shift-horse-race",
  storageBucket: "",
  messagingSenderId: "259577478162"
})

export const db = app.database()
