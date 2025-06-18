import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  onSnapshot,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from './firebase'
import { Article, Classified, Advertisement, Category, Newsletter, User } from '@/types'

// Articles Operations
export const articleService = {
  // Get all articles with pagination
  async getArticles(options: {
    limitCount?: number
    category?: string
    featured?: boolean
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  } = {}) {
    const { limitCount = 10, category, featured, lastDoc } = options
    
    let q = query(
      collection(db, 'articles'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )

    if (category) {
      q = query(q, where('category.slug', '==', category))
    }

    if (featured) {
      q = query(q, where('featured', '==', true))
    }

    q = query(q, limit(limitCount))

    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }

    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[]

    return {
      articles,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      hasMore: snapshot.docs.length === limitCount
    }
  },

  // Get single article by slug
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const q = query(
      collection(db, 'articles'),
      where('slug', '==', slug),
      where('status', '==', 'published')
    )
    
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Article
  },

  // Create new article
  async createArticle(articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...articleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  // Update article
  async updateArticle(id: string, updates: Partial<Article>): Promise<void> {
    await updateDoc(doc(db, 'articles', id), {
      ...updates,
      updatedAt: serverTimestamp()
    })
  },

  // Delete article
  async deleteArticle(id: string): Promise<void> {
    await deleteDoc(doc(db, 'articles', id))
  },

  // Increment article views
  async incrementViews(id: string): Promise<void> {
    const articleRef = doc(db, 'articles', id)
    const articleDoc = await getDoc(articleRef)
    
    if (articleDoc.exists()) {
      const currentViews = articleDoc.data().views || 0
      await updateDoc(articleRef, {
        views: currentViews + 1
      })
    }
  }
}

// Classifieds Operations
export const classifiedService = {
  // Get classifieds with filters
  async getClassifieds(options: {
    limitCount?: number
    category?: string
    featured?: boolean
    city?: string
    priceMin?: number
    priceMax?: number
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  } = {}) {
    const { limitCount = 20, category, featured, city, priceMin, priceMax, lastDoc } = options
    
    let q = query(
      collection(db, 'classifieds'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    )

    if (category) {
      q = query(q, where('category.slug', '==', category))
    }

    if (featured) {
      q = query(q, where('featured', '==', true))
    }

    if (city) {
      q = query(q, where('location.city', '==', city))
    }

    q = query(q, limit(limitCount))

    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }

    const snapshot = await getDocs(q)
    let classifieds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Classified[]

    // Client-side price filtering (Firestore limitations)
    if (priceMin !== undefined) {
      classifieds = classifieds.filter(c => c.price >= priceMin)
    }
    if (priceMax !== undefined) {
      classifieds = classifieds.filter(c => c.price <= priceMax)
    }

    return {
      classifieds,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      hasMore: snapshot.docs.length === limitCount
    }
  },

  // Get single classified
  async getClassified(id: string): Promise<Classified | null> {
    const docSnap = await getDoc(doc(db, 'classifieds', id))
    if (!docSnap.exists()) return null
    
    return { id: docSnap.id, ...docSnap.data() } as Classified
  },

  // Create classified
  async createClassified(classifiedData: Omit<Classified, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'classifieds'), {
      ...classifiedData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  // Update classified
  async updateClassified(id: string, updates: Partial<Classified>): Promise<void> {
    await updateDoc(doc(db, 'classifieds', id), {
      ...updates,
      updatedAt: serverTimestamp()
    })
  },

  // Delete classified
  async deleteClassified(id: string): Promise<void> {
    await deleteDoc(doc(db, 'classifieds', id))
  },

  // Increment classified views
  async incrementViews(id: string): Promise<void> {
    const classifiedRef = doc(db, 'classifieds', id)
    const classifiedDoc = await getDoc(classifiedRef)
    
    if (classifiedDoc.exists()) {
      const currentViews = classifiedDoc.data().views || 0
      await updateDoc(classifiedRef, {
        views: currentViews + 1
      })
    }
  }
}

// Advertisement Operations
export const advertisementService = {
  // Get active advertisements by position
  async getAdvertisements(position: 'hero-slider' | 'sidebar' | 'content' | 'footer'): Promise<Advertisement[]> {
    const now = new Date()
    
    const q = query(
      collection(db, 'advertisements'),
      where('position', '==', position),
      where('status', '==', 'active'),
      where('startDate', '<=', now),
      where('endDate', '>=', now),
      orderBy('priority', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Advertisement[]
  },

  // Track ad click
  async trackClick(adId: string): Promise<void> {
    const adRef = doc(db, 'advertisements', adId)
    const adDoc = await getDoc(adRef)
    
    if (adDoc.exists()) {
      const currentClicks = adDoc.data().clicks || 0
      await updateDoc(adRef, {
        clicks: currentClicks + 1
      })
    }
  },

  // Track ad impression
  async trackImpression(adId: string): Promise<void> {
    const adRef = doc(db, 'advertisements', adId)
    const adDoc = await getDoc(adRef)
    
    if (adDoc.exists()) {
      const currentImpressions = adDoc.data().impressions || 0
      await updateDoc(adRef, {
        impressions: currentImpressions + 1
      })
    }
  }
}

// Newsletter Operations
export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string, preferences?: Partial<Newsletter['preferences']>): Promise<void> {
    // Check if email already exists
    const q = query(collection(db, 'newsletter'), where('email', '==', email))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      throw new Error('Email już jest zapisany do newslettera')
    }

    await addDoc(collection(db, 'newsletter'), {
      email,
      status: 'active',
      preferences: preferences || {
        categories: [],
        frequency: 'weekly'
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  },

  // Unsubscribe from newsletter
  async unsubscribe(email: string): Promise<void> {
    const q = query(collection(db, 'newsletter'), where('email', '==', email))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref
      await updateDoc(docRef, {
        status: 'unsubscribed',
        updatedAt: serverTimestamp()
      })
    }
  }
}

// Categories Operations
export const categoryService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    const q = query(collection(db, 'categories'), orderBy('name'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[]
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const q = query(collection(db, 'categories'), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Category
  }
}

// User Operations
export const userService = {
  // Get user profile
  async getUserProfile(uid: string): Promise<User | null> {
    const docSnap = await getDoc(doc(db, 'users', uid))
    if (!docSnap.exists()) return null
    
    return { id: docSnap.id, ...docSnap.data() } as User
  },

  // Create user profile
  async createUserProfile(uid: string, userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  },

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp()
    })
  }
}

// Real-time subscriptions
export const realtimeService = {
  // Subscribe to articles changes
  subscribeToArticles(callback: (articles: Article[]) => void, options: { category?: string, featured?: boolean } = {}) {
    const { category, featured } = options
    
    let q = query(
      collection(db, 'articles'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(10)
    )

    if (category) {
      q = query(q, where('category.slug', '==', category))
    }

    if (featured) {
      q = query(q, where('featured', '==', true))
    }

    return onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[]
      
      callback(articles)
    })
  },

  // Subscribe to classifieds changes
  subscribeToClassifieds(callback: (classifieds: Classified[]) => void, options: { category?: string, featured?: boolean } = {}) {
    const { category, featured } = options
    
    let q = query(
      collection(db, 'classifieds'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc'),
      limit(20)
    )

    if (category) {
      q = query(q, where('category.slug', '==', category))
    }

    if (featured) {
      q = query(q, where('featured', '==', true))
    }

    return onSnapshot(q, (snapshot) => {
      const classifieds = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Classified[]
      
      callback(classifieds)
    })
  }
}

// Search Operations
export const searchService = {
  // Search articles and classifieds
  async searchContent(query: string, type: 'articles' | 'classifieds' | 'all' = 'all') {
    const results = {
      articles: [] as Article[],
      classifieds: [] as Classified[]
    }

    // Note: This is a basic text search. For production, consider using:
    // - Algolia for advanced search
    // - Firebase Extensions for full-text search
    // - Custom Cloud Function with search index

    if (type === 'articles' || type === 'all') {
      const articlesSnapshot = await getDocs(
        query(
          collection(db, 'articles'),
          where('status', '==', 'published'),
          orderBy('publishedAt', 'desc'),
          limit(20)
        )
      )
      
      results.articles = articlesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Article))
        .filter(article => 
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase())
        )
    }

    if (type === 'classifieds' || type === 'all') {
      const classifiedsSnapshot = await getDocs(
        query(
          collection(db, 'classifieds'),
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc'),
          limit(50)
        )
      )
      
      results.classifieds = classifiedsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Classified))
        .filter(classified => 
          classified.title.toLowerCase().includes(query.toLowerCase()) ||
          classified.description.toLowerCase().includes(query.toLowerCase())
        )
    }

    return results
  }
}
