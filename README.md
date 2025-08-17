# 🌐 Website Analysis API  

A backend service built with **Node.js + Express + MongoDB** that analyzes websites by extracting metadata such as brand name and description, stores results in MongoDB, and provides full CRUD operations with validation, error handling, and security.  

---

## ✨ Features  
- 🔎 Analyze any website (extract brand name, description, and metadata)  
- 📦 Store results in MongoDB  
- 📖 Full CRUD API  
- ✅ URL validation & error handling  
- 🔐 Security middleware: Helmet, CORS, Rate limiting  
- 📝 Logging with Morgan  
- ⚡ Bonus-ready: AI description refinement (stub included)  

---

## 🛠️ Tech Stack  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas / Local) with Mongoose  
- **Scraping**: Axios + Cheerio  
- **Security**: Helmet, Rate limiting, CORS  
- **Logging**: Morgan  

---

## 📂 Folder Structure  
```bash
website-analysis-api/
├── src/
│   ├── index.js              # Entry point
│   ├── db.js                 # MongoDB connection
│   ├── models/
│   │   └── Website.js        # Mongoose schema
│   ├── routes/
│   │   └── websiteRoutes.js  # Routes
│   ├── controllers/
│   │   └── websiteController.js
│   ├── services/
│   │   ├── scraper.js        # Scraper service
│   │   └── ai.js             # (Optional) AI enhancer
│   ├── middlewares/
│   │   ├── validate.js       # URL validation
│   │   └── error.js          # Error handling
├── .env                      # Environment variables (ignored in git)
├── .gitignore
├── package.json
├── README.md
└── postman_collection.json   # Postman tests (exported)
```

---

## ⚙️ Setup & Installation  
```bash
# Clone repo
git clone https://github.com/<your-username>/website-analysis-api.git
cd website-analysis-api

# Install dependencies
npm install

# Create .env file
PORT=8080
MONGO_URI=your-mongodb-uri

# Run dev server
npm run dev
```

If successful, you’ll see:  
```bash
✅ MongoDB connected
🚀 Server running on http://localhost:8080
```

---

## 📡 API Routes  

### 1️⃣ Analyze a Website  
**POST** `/api/websites/analyze`  
Request:  
```json
{
  "url": "https://example.com"
}
```
Response:  
```json
{
  "_id": "66c4a8f9d2a13a8f59b3c821",
  "url": "https://example.com",
  "brandName": "Example Domain",
  "description": "This domain is for use in illustrative examples...",
  "status": "ok"
}
```

---

### 2️⃣ List Websites  
**GET** `/api/websites?page=1&limit=10`  
Response:  
```json
{
  "page": 1,
  "limit": 10,
  "total": 1,
  "items": [
    {
      "_id": "66c4a8f9d2a13a8f59b3c821",
      "url": "https://example.com",
      "brandName": "Example Domain",
      "description": "This domain is for use in illustrative examples..."
    }
  ]
}
```

---

### 3️⃣ Get Website by ID  
**GET** `/api/websites/:id`  

---

### 4️⃣ Update Website  
**PUT** `/api/websites/:id`  
Request:  
```json
{
  "brandName": "Updated Example",
  "description": "This is an updated description"
}
```

---

### 5️⃣ Delete Website  
**DELETE** `/api/websites/:id`  

---

## 🧪 Testing with curl  
```bash
# Analyze website
curl -X POST http://localhost:8080/api/websites/analyze   -H "Content-Type: application/json"   -d '{"url":"https://example.com"}'

# List websites
curl "http://localhost:8080/api/websites?page=1&limit=5"

# Get by ID
curl http://localhost:8080/api/websites/<id>

# Update
curl -X PUT http://localhost:8080/api/websites/<id>   -H "Content-Type: application/json"   -d '{"brandName":"Updated","description":"Updated description"}'

# Delete
curl -X DELETE http://localhost:8080/api/websites/<id>
```

---

## 🚀 Deployment  
```bash
# Push code to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```


## 📝 Approach & Challenges  
- Handled websites with missing metadata using multiple fallbacks (`og:site_name`, `title`, `h1`)  
- Error handling for invalid URLs and unreachable sites  
- Added Helmet (security), Rate limiting (abuse protection), Morgan (logging)  
- Designed to be **secure, extensible, and production-ready**  

this is my old readme.md file give me updated readme.md according to changes
