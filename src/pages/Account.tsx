import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, LogOut, User } from 'lucide-react';
import { API_URLS } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Loader } from '../components/Loader';

type TabType = 'billing' | 'profile' | 'security';

type DashboardData = {
  firstname: string;
  lastname: string;
  email: string;
  plan_id: number | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  user_meta: { display_name?: string; subscription_status?: string; plan_id?: number | null };
  payments: Array<{ payment_id: string; date: string; status: string; price: number }>;
  subscriptions: Array<{
    id: number;
    plan_name: string;
    price: number;
    currency: string;
    billing_frequency: string;
    status: string;
    payment_status: string;
    ends_at: string | null;
  }>;
};

type ProfileForm = {
  firstname: string;
  lastname: string;
  display_name: string;
};
type PasswordForm = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

const emptyForm: ProfileForm = {
  firstname: '', lastname: '', display_name: '',
};
const emptyPasswordForm: PasswordForm = {
  current_password: '', new_password: '', confirm_password: '',
};

const formatMoney = (amount: number, currency = 'EUR') => new Intl.NumberFormat(undefined, {
  style: 'currency', currency,
}).format(amount);

const formatDate = (date: string | null) => date
  ? new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(date))
  : 'Not scheduled';

export const Account = () => {
  const [activeTab, setActiveTab] = useState<TabType>('billing');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>(emptyPasswordForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isLoggedIn, isAdmin, isAuthLoading, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const applyDashboard = (data: DashboardData) => {
    setDashboard(data);
    setForm({
      firstname: data.firstname,
      lastname: data.lastname,
      display_name: data.user_meta.display_name || `${data.firstname} ${data.lastname}`.trim(),
    });
  };

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (isAdmin) {
      setIsLoading(false);
      return;
    }

    const loadDashboard = async () => {
      const token = localStorage.getItem('futurework_token');
      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      try {
        setError('');
        const response = await fetch(API_URLS.user.dashboard, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (response.status === 401 || response.status === 403) {
          logout();
          navigate('/login');
          return;
        }
        if (!response.ok || !result.success || !result.data) throw new Error(result.message || 'Unable to load account details.');
        applyDashboard(result.data);
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Unable to load account details.';
        setError(message);
        showToast('error', message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, [isAuthLoading, isLoggedIn, isAdmin, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateField = (field: keyof ProfileForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleProfileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('futurework_token');
    if (!token) return handleLogout();

    try {
      setIsSaving(true);
      setError('');
      setSuccess('');
      const response = await fetch(API_URLS.user.profile, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          firstname: form.firstname.trim(),
          lastname: form.lastname.trim(),
          display_name: form.display_name.trim(),
        }),
      });
      const result = await response.json();
      if (response.status === 401 || response.status === 403) {
        logout();
        navigate('/login');
        return;
      }
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to save profile changes.');

      if (result.data) {
        applyDashboard(result.data);
      } else {
        setDashboard((current) => current ? ({
          ...current,
          firstname: form.firstname.trim(),
          lastname: form.lastname.trim(),
          user_meta: {
            ...current.user_meta,
            display_name: form.display_name.trim(),
          },
        }) : current);
      }

      const message = result.message || 'Profile updated successfully.';
      setSuccess(message);
      showToast('success', message);
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Unable to save profile changes.';
      setError(message);
      showToast('error', message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('futurework_token');
    if (!token) return handleLogout();

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      const message = 'New password and confirmation password must match.';
      setError(message);
      setSuccess('');
      showToast('error', message);
      return;
    }

    try {
      setIsChangingPassword(true);
      setError('');
      setSuccess('');
      const response = await fetch(API_URLS.auth.changePassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          old_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
        }),
      });
      const result = await response.json();
      if (response.status === 401 || response.status === 403) {
        logout();
        navigate('/login');
        return;
      }
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to change password.');
      setPasswordForm(emptyPasswordForm);
      const message = result.message || 'Your password has been changed successfully.';
      setSuccess(message);
      showToast('success', message);
    } catch (passwordError) {
      const message = passwordError instanceof Error ? passwordError.message : 'Unable to change password.';
      setError(message);
      showToast('error', message);
    } finally {
      setIsChangingPassword(false);
    }
  };
  if (isAuthLoading) return <Loader variant="page" label="Checking your session..." />;
  if (!isLoggedIn) return null;

  if (isAdmin) return (
    <main className="min-h-screen bg-[#F8F7F4] font-sans pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-[640px] mx-auto">
        <header className="mb-8"><p className="text-pink-600 font-black uppercase tracking-[0.2em] text-xs mb-3">Admin profile</p><h1 className="text-4xl font-black text-slate-900">Change password</h1></header>
        {error && <p role="alert" className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
        {success && <p role="status" className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">{success}</p>}
        <section className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200">
          <p className="text-slate-500 font-medium mb-8">Update your password to keep your administrator account secure.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <PasswordInput label="Current Password" value={passwordForm.current_password} onChange={(value) => setPasswordForm((current) => ({ ...current, current_password: value }))} />
            <PasswordInput label="New Password" value={passwordForm.new_password} onChange={(value) => setPasswordForm((current) => ({ ...current, new_password: value }))} hint="At least 6 characters" />
            <PasswordInput label="Confirm Password" value={passwordForm.confirm_password} onChange={(value) => setPasswordForm((current) => ({ ...current, confirm_password: value }))} />
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-100">
              <button type="button" onClick={handleLogout} className="h-12 px-6 rounded-xl border-2 border-red-100 text-red-600 text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</button>
              <button disabled={isChangingPassword} className="h-12 px-8 rounded-xl bg-slate-900 text-white text-[15px] font-bold disabled:opacity-60">{isChangingPassword ? <Loader variant="inline" label="Updating..." /> : 'Update Password'}</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );

  const subscription = dashboard?.subscriptions.find((item) => item.status === 'active') || dashboard?.subscriptions[0];
  const displayName = dashboard?.user_meta.display_name || `${dashboard?.firstname || ''} ${dashboard?.lastname || ''}`.trim();
  const initial = displayName.charAt(0).toUpperCase() || 'U';
  const tabs = [
    { id: 'billing' as const, label: 'Payments', icon: CreditCard },
    { id: 'profile' as const, label: 'Personal Info', icon: User },
    { id: 'security' as const, label: 'Security', icon: Lock },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4] font-sans pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto">
        {isLoading ? <Loader label="Loading your account..." /> : <>
          <header className="flex flex-col items-center text-center mb-10">
            <div className="w-28 h-28 rounded-full bg-slate-900 text-white flex items-center justify-center text-5xl font-black shadow-lg mb-6">{initial}</div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{displayName || 'My Account'}</h1>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <span className="bg-pink-100 text-pink-600 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                {subscription?.status === 'active' ? subscription.plan_name : 'Member'}
              </span>
              <span className="text-slate-500 font-medium text-sm">{dashboard?.email}</span>
            </div>
          </header>

          <nav className="bg-white p-2 rounded-full shadow-sm border border-slate-200/60 flex items-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-black uppercase tracking-widest ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>
                <Icon className="w-4 h-4" /><span className="hidden sm:inline">{tab.label}</span>
              </button>;
            })}
          </nav>

          {error && <p role="alert" className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          {success && <p role="status" className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">{success}</p>}

          {activeTab === 'billing' && <section className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-sm border border-slate-200">
            <h2 className="border-l-4 border-pink-500 pl-3 text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Payments</h2>
            {dashboard?.payments.length ? <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <tr><th className="px-5 py-4">Payment Ref</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Price</th></tr>
                </thead>
                <tbody>{dashboard.payments.map((payment) => <tr key={payment.payment_id} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-5 py-6 font-mono text-[10px] text-slate-500 break-all">{payment.payment_id}</td>
                  <td className="px-5 py-6 text-xs font-bold text-slate-900 whitespace-nowrap">{formatDate(payment.date)}</td>
                  <td className="px-5 py-6"><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase ${payment.status.toLowerCase() === 'active' || payment.status.toLowerCase() === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{payment.status}</span></td>
                  <td className="px-5 py-6 text-right text-xs font-black text-slate-900 whitespace-nowrap">{formatMoney(payment.price, subscription?.currency)}</td>
                </tr>)}</tbody>
              </table>
            </div> : <p className="text-slate-500 font-medium">No payments yet.</p>}
          </section>}

          {activeTab === 'profile' && <form onSubmit={handleProfileSubmit} className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileInput label="First Name" value={form.firstname} onChange={(value) => updateField('firstname', value)} required />
              <ProfileInput label="Last Name" value={form.lastname} onChange={(value) => updateField('lastname', value)} />
              <ProfileInput label="Display Name" value={form.display_name} onChange={(value) => updateField('display_name', value)} required />
              <div className="space-y-3"><label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label><div className="relative"><input type="email" value={dashboard?.email || ''} disabled className="w-full h-14 px-6 rounded-2xl border-2 border-slate-100 bg-slate-100 text-[15px] font-bold text-slate-400 cursor-not-allowed" /><Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" /></div></div>
            </div>
            <div className="flex justify-end pt-8 mt-8 border-t border-slate-100"><button disabled={isSaving} className="h-12 px-8 rounded-xl bg-slate-900 text-white text-[15px] font-bold disabled:opacity-60">{isSaving ? <Loader variant="inline" label="Saving..." /> : 'Save Changes'}</button></div>
          </form>}

          {activeTab === 'security' && <section className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Security & Password</h2>
            <p className="text-slate-500 font-medium mb-8">Update your password to keep your account secure.</p>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <PasswordInput label="Current Password" value={passwordForm.current_password} onChange={(value) => setPasswordForm((current) => ({ ...current, current_password: value }))} />
              <PasswordInput label="New Password" value={passwordForm.new_password} onChange={(value) => setPasswordForm((current) => ({ ...current, new_password: value }))} hint="At least 6 characters" />
              <PasswordInput label="Confirm Password" value={passwordForm.confirm_password} onChange={(value) => setPasswordForm((current) => ({ ...current, confirm_password: value }))} />
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-100">
                <button type="button" onClick={handleLogout} className="h-12 px-6 rounded-xl border-2 border-red-100 text-red-600 text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</button>
                <button disabled={isChangingPassword} className="h-12 px-8 rounded-xl bg-slate-900 text-white text-[15px] font-bold disabled:opacity-60">{isChangingPassword ? <Loader variant="inline" label="Updating..." /> : 'Update Password'}</button>
              </div>
            </form>
          </section>}
        </>}
      </div>
    </main>
  );
};

const PasswordInput = ({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) => (
  <div className="space-y-3">
    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
    <input type="password" value={value} required minLength={label === 'Current Password' ? 1 : 6} onChange={(event) => onChange(event.target.value)} placeholder={hint} autoComplete={label === 'Current Password' ? 'current-password' : 'new-password'} className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-slate-50 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-400" />
  </div>
);
const ProfileInput = ({ label, value, onChange, required = false, wide = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; wide?: boolean }) => (
  <div className={`space-y-3 ${wide ? 'md:col-span-2' : ''}`}>
    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
    <input type="text" value={value} required={required} onChange={(event) => onChange(event.target.value)} className="w-full h-14 px-6 rounded-2xl border-2 border-slate-200 bg-slate-50 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all" />
  </div>
);
