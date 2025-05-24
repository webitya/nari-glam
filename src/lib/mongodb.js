import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  if (!process.env.MONGODB_URI) {
    console.warn("MongoDB URI not found. Some features may not work.")
    // Create a mock promise that will reject when used
    clientPromise = Promise.reject(new Error("MongoDB URI not configured"))
  } else {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  }
} else {
  // In production mode, it's best to not use a global variable.
  if (!process.env.MONGODB_URI) {
    console.warn("MongoDB URI not found. Some features may not work.")
    clientPromise = Promise.reject(new Error("MongoDB URI not configured"))
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

export default clientPromise
