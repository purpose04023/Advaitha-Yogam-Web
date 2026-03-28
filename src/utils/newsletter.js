/**
 * Brevo (formerly Sendinblue) Newsletter Integration Utility
 * Uses the Brevo API to add contacts to a specific list.
 */

export const subscribeToNewsletter = async (email) => {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  const listId = parseInt(import.meta.env.VITE_BREVO_LIST_ID || '1');

  if (!apiKey || apiKey === 'your-brevo-key') {
    console.warn('Brevo API key is missing. Newsletter subscription will not work in production.');
    // For demo/development, simulate success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Development mode: Subscription simulated.' });
      }, 1000);
    });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (response.ok || response.status === 204 || response.status === 201) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Subscription failed' };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: 'Network error or server unavailable' };
  }
};
