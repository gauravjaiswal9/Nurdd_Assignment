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
git clone https://github.com/gauravjaiswal9/Nurdd_Assignment.git
cd Nurdd_Assignment

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
- **GitHub Repo**: [Nurdd_Assignment](https://github.com/gauravjaiswal9/Nurdd_Assignment)  
- **Deployed API**: [https://nurdd-assignment.onrender.com](https://nurdd-assignment.onrender.com)  
- **Postman Collection**: [Click here](https://www.postman.com/joint-operations-technologist-23000549/workspace/my-workspace/collection/43959731-f362ab72-8eb6-4fa8-9d17-367b994aa30f?action=share&source=copy-link&creator=43959731)  

---

## 📝 Approach & Challenges  
For this project, I designed a **Website Analysis API** using Node.js with Express and MongoDB. The API accepts a website URL, validates its format, and scrapes relevant details like brand name and description.  

To achieve this, I used **Axios + Cheerio** for fast, lightweight HTML parsing instead of Puppeteer, since most sites expose required metadata without needing full browser rendering. This ensures better performance and fewer deployment issues on Render.  

The extracted data is stored in MongoDB with timestamps, enabling full **CRUD operations**. I implemented robust error handling for invalid URLs, unreachable sites, and missing metadata, with fallbacks (`og:site_name`, `<title>`, `<h1>`).  

The architecture is **modular**, separating concerns into routes, controllers, and services for maintainability. API endpoints were tested with Postman, and the service is deployed on Render for public access.  

🔮 **Future Enhancements**: Puppeteer support for JavaScript-heavy sites and AI-powered description refinement (e.g., OpenAI integration).  

---

✅ Focused on **simplicity, reliability, and scalability**.  
