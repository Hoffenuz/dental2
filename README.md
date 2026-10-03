# 🦷 DentaCare — Mijozlar uchun Telegram WebApp

Ushbu repozitoriy **DentaCare Zamonaviy Stomatologiya Markazi** bemorlari va mijozlari uchun mo'ljallangan mobil **Telegram WebApp** mijoz ilovasini o'z ichiga oladi.

🌐 **Jonli havola (Production):** [https://dentaluz2.netlify.app/](https://dentaluz2.netlify.app/)  
🤖 **Telegram Bot:** [@dentalclinicuzbot](https://t.me/dentalclinicuzbot)

---

## 🚀 Asosiy Imkoniyatlar

1. **4 Bosqichli Qulay Navbat Olish:**
   * **1-bosqich: Xizmat tanlash** — Narxlar, davomiyligi, toifalar va qidiruv bilan.
   * **2-bosqich: Shifokor tanlash** — Surat, toifa, tajriba yillari, xona raqami va reyting.
   * **3-bosqich: Sana va vaqt** — Keyingi 7 kunlik qulay kalendar, dam olish kunlari va band soatlarni avtomatik cheklash.
   * **4-bosqich: Anketani tasdiqlash** — Telegram'dan ism-familiyani avtomatik olish, telefon raqamini kiritish, shikoyat izohi.

2. **Elektron Chipta (Digital Ticket):**
   * Qabul tasdiqlangach, chipta kodi va tafsilotlari bilan chipta ko'rinishi.
   * Telegram botga bir zumda qaytish tugmasi.

3. **Mening Navbatlarim:**
   * Bemorning o'tmishdagi va faol navbatlari ro'yxati (Supabase Cloud bilan to'g'ridan-to'g'ri sinxron).
   * Navbatni bekor qilish imkoniyati.

4. **Klinika Ma'lumotlari:**
   * Ish soatlari, manzil, xaritadagi mo'ljal, qo'ng'iroq qilish tugmasi.
   * Shifokorlar jamoasi va klinika afzalliklari.

5. **Telegram Haptic & Native Integratsiya:**
   * Tugmalar bosilganda tebranish (haptic feedback).
   * Mobil va Telegram oynasiga 100% moslashuvchan dizayn (responsive).

---

## 🛠 Texnologiyalar

* **React 18** + **Vite**
* **Tailwind CSS**
* **Lucide React** (Zamonaviy vektor ikonlar)
* **@supabase/supabase-js** (Jonli ma'lumotlar bazasi integratsiyasi)
* **Telegram Web Apps SDK** (`window.Telegram.WebApp`)

---

## ⚙️ O'rnatish va Ishga Tushirish

### 1. Bog'liqliklarni o'rnatish
```bash
npm install
```

### 2. Muhit o'zgaruvchilari
`.env.example` dan `.env` nusxasini oling:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_BOT_API_URL=https://your-project.supabase.co/functions/v1/telegram-bot
VITE_TELEGRAM_BOT_USERNAME=dentalclinicuzbot
```

### 3. Loyihani ishga tushirish
```bash
npm run dev
```
Dastur `http://localhost:3000` manzilida ochiladi.

### 4. Ishlab chiqarish uchun yig'ish (Build)
```bash
npm run build
```
Natija `dist/` papkasiga saqlanadi (Netlify bu orqali avtomatik joylaydi).

---

## 🌐 Bog'liq Loyihalar

* **Admin CRM Dashboard:** [https://github.com/Hoffenuz/dental1](https://github.com/Hoffenuz/dental1)
