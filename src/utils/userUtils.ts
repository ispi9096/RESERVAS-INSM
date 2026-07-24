export function getOrCreateUserId(): string {
  try {
    let uid = localStorage.getItem('app_user_id') || localStorage.getItem('app_creator_id');
    if (!uid) {
      uid = 'usr_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('app_user_id', uid);
    }
    return uid;
  } catch (err) {
    console.error('Error accessing localStorage for user ID:', err);
    return 'default_user';
  }
}
