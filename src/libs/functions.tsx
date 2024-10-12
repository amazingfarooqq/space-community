export function setUserDataInCookie(userData: any) {
    const userDataJSON = JSON.stringify(userData);

    document.cookie = `userData=${userDataJSON}; expires=Thu, 27 Aug 2024 12:00:00 UTC; path=/`;
}

export function getUserDataFromCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'userData') {
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return null;
}