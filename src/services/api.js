export async function login({ username, password }) {
  return new Promise((res) => {
    setTimeout(() => {
      const role = (username || '').toLowerCase().includes('admin') ? 'admin' : 'staff';
      res({ ok: true, user: { name: username || 'Demo User', email: username || '', role } });
    }, 400);
  });
}
export async function sendOtp(email) {
  return new Promise((res) => setTimeout(()=>res({ ok: true, otp: '12345' }), 300));
}
export async function verifyOtp(email, code) { return new Promise((res) => setTimeout(()=>res({ ok: true }), 200)); }
export async function resetPassword(email, newPassword) { return new Promise((res) => setTimeout(()=>res({ ok: true }), 200)); }
export async function signup(data) { return new Promise((res) => setTimeout(()=>res({ ok: true }), 400)); }
