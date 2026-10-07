export const getUserId = () => {
    const savedUser =
        localStorage.getItem('cyberflixUser') ||
        sessionStorage.getItem('cyberflixUser')

    if (!savedUser) {
        return null
    }

    try {
        const user = JSON.parse(savedUser)
        return user?.id || null
    } catch (error) {
        console.error('User data error:', error)
        return null
    }
}
