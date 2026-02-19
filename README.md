🍲 Akpu4All – E-Commerce Restaurant Web App

Akpu4All is a fully functional, responsive E-commerce restaurant web application built with React.js, HTML, and Tailwind CSS.
It allows users to browse Nigerian swallows and local delicacies, add items to cart, and place orders seamlessly.

🚀 Live Concept

A modern restaurant ordering platform inspired by Uber Eats but branded for Akpu4All — delivering fresh Nigerian swallows anytime, anywhere.

🛠 Tech Stack

⚛ React.js (Functional Components & Hooks)

🎨 Tailwind CSS

🌐 HTML5

🔄 React Router DOM

🛒 Context API for state management

💾 localStorage for cart persistence

✨ Features
🏠 Home Page

Hero section with branding

Catchy slogan: “Fresh Swallow, Anytime, Anywhere”

Featured meals

Testimonials

Responsive footer

📋 Menu Page

Card layout for meals

Food image

Name & description

Price (₦ currency)

Add to Cart functionality

Search filter

Category filtering (Swallow, Soups, Drinks)

🛒 Cart Page

View selected items

Increase/decrease quantity

Remove items

Auto total calculation

Persistent cart using localStorage

💳 Checkout Page

Customer details form

Payment method selection (Pay on Delivery / Card)

Order summary

Place order functionality

📂 Project Structure
akpu4all/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FoodCard.jsx
│   │   └── CartItem.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   └── meals.js
│   │
│   ├── App.js
│   └── main.jsx / index.js
│
├── tailwind.config.js
├── package.json
└── README.md

⚙ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourusername/akpu4all.git
cd akpu4all

2️⃣ Install dependencies
npm install

3️⃣ Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Add Tailwind to your index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

4️⃣ Start development server
npm start

🎨 Design Theme

Warm African color palette

Orange, brown, deep green accents

Rounded cards

Soft shadows

Clean and modern typography

📦 Future Improvements

🔐 Authentication system

💳 Real payment gateway integration (Stripe / Flutterwave)

📊 Admin dashboard

📱 PWA support

🗄 Backend integration (Node.js + MongoDB)

📸 Sample Menu Items

Pounded Yam & Egusi

Eba & Ogbono

Semovita & Okra

Amala & Ewedu

Fufu & Afang

👨‍💻 Author

Hosea Ozeal
Full stack web developer residing in Abuja, Nigeria 🚀

📄 License

This project is open-source and available under the MIT License.