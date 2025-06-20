// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC2w4RRZjVHpSpricqM_X4T8glMkMSL674",
  authDomain: "ph-acqui-main.firebaseapp.com",
  projectId: "ph-acqui-main",
  storageBucket: "ph-acqui-main.firebasestorage.app",
  messagingSenderId: "997523772315",
  appId: "1:997523772315:web:ed50ef0d50c14330bbc73e",
  measurementId: "G-4LRHYCVK8F"
}

// Initialize Firebase (browser only)
let app, db, storage

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  storage = getStorage(app)
} else {
  app = null
  db = null
  storage = null
}

// Connect to Firestore emulator in development if available
if (typeof window !== 'undefined' && db && window.location.hostname === 'localhost') {
  try {
    // Only connect to emulator if not already connected
    if (!db._delegate._databaseId?.database?.includes('emulator')) {
      connectFirestoreEmulator(db, 'localhost', 8080)
      console.log('Connected to Firestore emulator')
    }
  } catch (error) {
    // Emulator not available or already connected - use live Firestore
    console.log('Using live Firestore database')
  }
}

export { db, storage }
export default app