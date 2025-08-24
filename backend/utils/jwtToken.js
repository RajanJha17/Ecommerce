

export const sendToken = (user, statusCode, res) => {
    try {
        const token = user.getJWTToken();
        // Parse JWT_COOKIE_EXPIRES to get number of days (ignore 'd' or other non-numeric chars)
        const cookieExpiresRaw = process.env.JWT_COOKIE_EXPIRES || '7';
        const cookieExpiresDays = parseInt(cookieExpiresRaw);
        const options = {
            expires: new Date(Date.now() + cookieExpiresDays * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false, // For local development, set to true in production with HTTPS
            sameSite: "lax" // Lax is good for most cases, use 'none' for cross-site
        };
        res.status(statusCode).cookie("token", token, options).json({
            success: true,
            user,
            token
        });
    } catch (error) {
        console.error("Error sending token:", error.message);
    }
}