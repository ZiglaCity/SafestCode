// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
const BACKEND_URL = 'http://localhost:5000';

interface BodyType {
  code: string;
  mode: string;
  language: string;
}

export const submitRequest = async (body: BodyType) => {
  try {
    const res = await fetch(`${BACKEND_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Error submitting code', err);
    return null;
  }
};
