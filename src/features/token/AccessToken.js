import {useEffect, useState} from "react";

function AccessToken({ clientId, clientSecret }) {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    // Function to store token and expiration time in localStorage
    const storeToken = (token, expiresIn) => {
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem("spotifyAccessToken", token);
        localStorage.setItem("spotifyTokenExpiration", expirationTime.toString());
    };

    // Function to check if the token is still valid
    const isTokenValid = () => {
        const token = localStorage.getItem("spotifyAccessToken");
        const expiration = localStorage.getItem("spotifyTokenExpiration");

        // If there is no token or it has expired, return false
        if (!token || !expiration || Date.now() > parseInt(expiration)) {
            return false;
        }

        return true; // Token is still valid
    };

    // Function to fetch a new access token
    const fetchAccessToken = async () => {
        const url = "https://accounts.spotify.com/api/token";

        try {
            const response = await fetch(url, {
                body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setAccessToken(data.access_token); // Store access token in state
            storeToken(data.access_token, data.expires_in); // Store token and expiration in localStorage
            console.log("Spotify Access Token:", data.access_token);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
            console.error("Error fetching access token:", error);
        }
    };

    useEffect(() => {
        // Check if we have a valid token in localStorage
        if (isTokenValid()) {
            const storedToken = localStorage.getItem("spotifyAccessToken");
            setAccessToken(storedToken); // Use the valid token from localStorage
            console.log("Using stored access token:", storedToken);
        } else {
            // Token is not valid, fetch a new one
            fetchAccessToken();
        }
    }, [clientId, clientSecret]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!accessToken) {
        return <div>Loading...</div>; // Render a loading message until the token is fetched or loaded
    }

    return <div>Access Token: {accessToken}</div>; // Render the access token if available
}

export default AccessToken;


