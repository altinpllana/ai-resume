export async function storeMarketingEmail(email: string): Promise<void> {
  const response = await fetch('/api/marketing-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Unable to save email.' }));
    throw new Error(body.error || 'Unable to save email.');
  }
}
