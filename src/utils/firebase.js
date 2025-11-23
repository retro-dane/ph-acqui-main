// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
}

// Validate that all required Firebase config values are present
if (typeof window !== 'undefined') {
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'appId']
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key])

  if (missingKeys.length > 0) {
    console.error('Missing Firebase configuration:', missingKeys)
    console.error('Please check your environment variables in .env.development or Netlify settings')
  }
}

// Initialize Firebase (browser only)
let app, db, storage, auth

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  storage = getStorage(app)
  auth = getAuth(app)
} else {
  app = null
  db = null
  storage = null
  auth = null
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

export { db, storage, auth }
export default app