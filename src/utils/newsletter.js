import { supabase } from '../lib/supabase';

export const subscribeToNewsletter = async (email) => {
  try {
    // 1. Add to Supabase for our own record
    const { error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email, subscribed_at: new Date().toISOString() }]);

    // Even if DB error (maybe table doesn't exist yet), try Brevo
    if (dbError) console.warn('Supabase logging failed:', dbError.message);

    // 2. Add to Brevo (Sendinblue)
    const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || import.meta.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      return { success: true, message: 'Local mode: Email captured!' };
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Brevo integration failed');
    }

    return { success: true };
  } catch (error) {
    console.error('Newsletter error:', error);
    return { success: false, error: error.message };
  }
};
