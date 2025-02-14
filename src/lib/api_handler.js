

var apiUrl = 'https://codo-test.azurewebsites.net/api/';
async function getUsers() {
    try {
        const response = await fetch(apiUrl + 'getUsers');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API response data:", data); // Debugging log
        return data["users"];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getHome(id) {
    try {
        const response = await fetch(apiUrl+ 'getHomepage?userId=' + id);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data["homepage"]["units"];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { getUsers, getHome };

const users = await getUsers();
console.log("Fetched users:", users); // Debugging log
const homeData = await getHome(users[0].id);
console.log("Fetched home data:", homeData); // Debugging log