---

## 🧪 API Endpoints

### 1. **User Registration & Login**
- `POST /user/signup` → Register new user (name, email, phoneNumber, password, confirmPassword)
- `POST /login` → Login(with email/phoneNumber, password) and receive JWT token as (accessToken)

### 2. **List Activities (Public)**
- `GET /activity` → View all available activities with having option as query params(category, page, limit) category-[football, movies,cricket]

### 3. **Book an Activity (Auth Required)** auth via header bearer authorization
- `POST /booking/create` → Book a specific activity(through body params) by ID

### 4. **Get My Bookings**
- `GET /booking` → View all bookings made by the logged-in user

---

## 📦 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/Karan09542/meetX-backend.git

# 2. Navigate to the folder
cd meetx-backend

# 3. Install dependencies
npm install

# 4. Create a .env file
touch .env

# for run locally run startupScriptToAddActivity.js