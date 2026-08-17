# Portfolio Backend

باك إند بسيط بـ Express + MongoDB (Mongoose) لحفظ رسايل الـ Contact form بتاع البورتوفوليو.

## إزاي تشغّله

1. **ثبّت المكتبات:**
   ```
   npm install
   ```

2. **جهّز ملف .env:**
   - انسخ `.env.example` وسمّيه `.env`
   - اعمل حساب مجاني على [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - خد رابط الاتصال (Connection String) وحطه في `MONGO_URI`

3. **شغّل السيرفر:**
   ```
   npm run dev
   ```
   لو مثبتش nodemon استخدم:
   ```
   npm start
   ```

4. **جرّب الـ API بـ Postman:**
   - `POST http://localhost:5000/api/messages`
     ```json
     {
       "name": "Ziad",
       "email": "test@example.com",
       "message": "hello!"
     }
     ```
   - `GET http://localhost:5000/api/messages` — تشوف كل الرسايل المحفوظة

## الخطوة الجاية

لما السيرفر يشتغل صح، اربط الـ Contact form في البورتوفوليو بيه عن طريق `fetch()` — قول لـ Claude "اربط الفورم بالباك إند" وهيضيفلك الكود في ملف البورتوفوليو.
