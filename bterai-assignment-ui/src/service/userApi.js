const serverURL =  'http://localhost:4000'
const post = async (email , url ) => {
    try {
      const response = await fetch(`${serverURL}/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  export { post };
  