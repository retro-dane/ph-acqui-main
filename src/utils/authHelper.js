// Authentication helper for username/password management
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { auth, db } from './firebase'

// Firestore collections
const USERS_COLLECTION = 'users'

/**
 * Create a new user with username, email, and password
 */
export const createUser = async (username, email, password, displayName = '') => {
  if (!auth || !db) {
    throw new Error('Firebase not initialized')
  }

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }

    // Check if username already exists
    const usernameExists = await checkUsernameExists(username)
    if (usernameExists) {
      throw new Error('Username already exists')
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      throw new Error('Email already exists')
    }

    // Create Firebase Auth user with real email
    const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
    const user = userCredential.user

    // Store user profile in Firestore
    await setDoc(doc(db, USERS_COLLECTION, user.uid), {
      username: username.toLowerCase(),
      displayName: displayName || username,
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      role: 'admin',
      active: true
    })

    return {
      uid: user.uid,
      username: username.toLowerCase(),
      displayName: displayName || username,
      email: email.toLowerCase()
    }
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use')
    }
    throw error
  }
}

/**
 * Sign in with username or email and password
 */
export const signInWithUsername = async (usernameOrEmail, password) => {
  if (!auth || !db) {
    throw new Error('Firebase not initialized')
  }

  try {
    let email = usernameOrEmail.toLowerCase()

    // Check if input is an email or username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(usernameOrEmail)) {
      // It's a username, look up the email
      const usersRef = collection(db, USERS_COLLECTION)
      const q = query(usersRef, where('username', '==', usernameOrEmail.toLowerCase()))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new Error('Invalid username or password')
      }

      const userProfile = querySnapshot.docs[0].data()
      email = userProfile.email
    }

    // Sign in with Firebase Auth using email
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get user profile from Firestore
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, user.uid))

    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }

    const userData = userDoc.data()

    if (!userData.active) {
      await signOut(auth)
      throw new Error('User account is disabled')
    }

    return {
      uid: user.uid,
      username: userData.username,
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role
    }
  } catch (error) {
    console.error('Error signing in:', error)
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      throw new Error('Invalid username or password')
    }
    throw error
  }
}

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  if (!auth) {
    throw new Error('Firebase not initialized')
  }

  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

/**
 * Check if username already exists
 */
export const checkUsernameExists = async (username) => {
  if (!db) {
    throw new Error('Firebase not initialized')
  }

  try {
    const usersRef = collection(db, USERS_COLLECTION)
    const q = query(usersRef, where('username', '==', username.toLowerCase()))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking username:', error)
    return false
  }
}

/**
 * Check if email already exists
 */
export const checkEmailExists = async (email) => {
  if (!db) {
    throw new Error('Firebase not initialized')
  }

  try {
    const usersRef = collection(db, USERS_COLLECTION)
    const q = query(usersRef, where('email', '==', email.toLowerCase()))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking email:', error)
    return false
  }
}

/**
 * Get current user profile
 */
export const getCurrentUserProfile = async (uid) => {
  if (!db) {
    throw new Error('Firebase not initialized')
  }

  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid))

    if (!userDoc.exists()) {
      return null
    }

    return userDoc.data()
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  if (!auth) {
    return () => {}
  }

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, get their profile
      const profile = await getCurrentUserProfile(user.uid)
      callback({
        uid: user.uid,
        ...profile
      })
    } else {
      // User is signed out
      callback(null)
    }
  })
}

/**
 * Send password reset email (supports username or email)
 */
export const sendPasswordReset = async (usernameOrEmail) => {
  if (!auth || !db) {
    throw new Error('Firebase not initialized')
  }

  try {
    let email = usernameOrEmail.toLowerCase()

    // Check if input is an email or username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(usernameOrEmail)) {
      // It's a username, look up the email
      const usersRef = collection(db, USERS_COLLECTION)
      const q = query(usersRef, where('username', '==', usernameOrEmail.toLowerCase()))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new Error('Username not found')
      }

      const userProfile = querySnapshot.docs[0].data()
      email = userProfile.email
    }

    // Send password reset email
    await sendPasswordResetEmail(auth, email)

    return email
  } catch (error) {
    console.error('Error sending password reset:', error)
    if (error.code === 'auth/user-not-found') {
      throw new Error('User not found')
    }
    throw error
  }
}

export default {
  createUser,
  signInWithUsername,
  signOutUser,
  checkUsernameExists,
  checkEmailExists,
  getCurrentUserProfile,
  onAuthStateChange,
  sendPasswordReset
}
