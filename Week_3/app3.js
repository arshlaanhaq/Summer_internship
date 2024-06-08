function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { id: 1, name: 'Arshlaan Haq' };
        resolve(data);
      }, 1000);
    });
  }
  
  function processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const processedData = { ...data, processed: true };
        resolve(processedData);
      }, 1000);
    });
  }
  
  function displayData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Displaying Data:', data);
        resolve('Success');
      }, 500);
    });
  }
  
  // Using the functions with async/await
  async function main() {
    try {
      const data = await fetchData();
      const processedData = await processData(data);
      const result = await displayData(processedData);
      console.log('Operation Result:', result);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
  main();
  