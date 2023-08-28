export function setUserDataInCookie(userData) {
    // Convert the userData to a JSON string
    const userDataJSON = JSON.stringify(userData);

    // Set the cookie with an expiration date
    document.cookie = `userData=${userDataJSON}; expires=Thu, 27 Aug 2024 12:00:00 UTC; path=/`;
}

// Get the user data from the cookie
export function getUserDataFromCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'userData') {
            // Parse the JSON data and return it
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return null; // If userData cookie not found
}