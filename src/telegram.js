// Telegram WebApp SDK yordamchi moduli

export const getTelegram = () => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
};

export const initTelegramApp = () => {
  const tg = getTelegram();
  if (!tg) return null;

  try {
    tg.ready();
    tg.expand();
    if (tg.enableClosingConfirmation) {
      tg.enableClosingConfirmation();
    }
  } catch (e) {
    console.warn('Telegram WebApp tayyorlanishida ogohlantirish:', e);
  }

  return tg;
};

export const getTelegramUser = () => {
  const tg = getTelegram();
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    return tg.initDataUnsafe.user;
  }
  // Oddiy brauzer Telegram foydalanuvchisi emas. Soxta ID berish boshqa
  // foydalanuvchining navbatlari ko'rinishi yoki noto'g'ri yozuvlar
  // yaratilishiga olib kelardi.
  return null;
};

export const getTelegramInitData = () => getTelegram()?.initData || '';

export const hapticImpact = (style = 'medium') => {
  const tg = getTelegram();
  if (tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
    tg.HapticFeedback.impactOccurred(style);
  }
};

export const hapticNotification = (type = 'success') => {
  const tg = getTelegram();
  if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
    tg.HapticFeedback.notificationOccurred(type);
  }
};
