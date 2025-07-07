
export async function getData(endpoint: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}


 {/** 
export async function getData(endpoint: string) {
  try {
    const response = await fetch('/api/categories', {
      method: 'GET', // स्पष्ट रूप से GET मेथड निर्दिष्ट करें
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text(); // पहले टेक्स्ट के रूप में पढ़ें
    return text ? JSON.parse(text) : []; // खाली रिस्पॉन्स के लिए फॉलबैक
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // एरर केस में खाली ऐरे रिटर्न करें
  }
}
 */}

