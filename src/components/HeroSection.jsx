import { useState, useEffect } from 'react';

const HeroSection = () => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // Fetch user details from API
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
                    },
                });

                if(!response.ok){
                    throw new Error("Failed to fetch user details!");
                }

                const data = await response.json();
                setUser(data); 
            }catch(error){
                console.error("Error fetching user details: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    
    return (
        <div className='hero-section'>
            <div className='hero-content'>
                {loading ? (
                    <h1>Loading...</h1>
                ) : user ? (
                    <>
                    <h1 className='hero-title'>Welcome back, {user.name}!</h1>
                    <p className='hero-description'>
                        Manage personal documents and day-to-day tasks with ease.
                    </p>
                    </>
                ) : (
                    <h1 className='hero-title2'>Welcome to the Elderly Care Portal!</h1>
                )}
            </div>
            <div className='hero-profile'>
                {user?.profilePicture ? (
                    <img 
                        className='profile-picture'
                        src={user.profilePicture}
                        alt='Profile Picture'
                    />
                ) : (
                    <img 
                        className='profile-picture'
                        src='/src/assets/icons/default-profile.png'
                        alt='Default Profile'
                    />
                )}
            </div>
        </div>
    );
};

export default HeroSection;
