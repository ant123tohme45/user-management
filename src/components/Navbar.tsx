import React from "react";

const Navbar: React.FC = () => {
    // Function to handle user creation and logout
    // Removed unused handleCreateUser function

    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">MyApp</div>
            <ul className="flex space-x-6">
                <li>
                    <span className="text-white">
                        {new Date().toLocaleString()}
                    </span>
                </li>
                <li>
                <a
                    href="#"
                    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-transform transform hover:scale-105"
                   
                    onClick={() => {
                    const firstName = prompt("Enter First Name:");
                    const lastName = prompt("Enter Last Name:");
                    const email = prompt("Enter Gmail:");
                    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
                    if (firstName && lastName && email) {
                        const user = { firstName, lastName, email };
                        existingUsers.push(user);
                        localStorage.setItem("users", JSON.stringify(existingUsers));
                        alert(`User ${firstName} ${lastName} with email ${email} will be added after 24 hours.`);
                    } else {
                        alert("All fields are required.");
                    }
                    }}
                >
                    Create User
                </a>
                </li>
                <li>
                <a
                    href="#"
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-transform transform hover:scale-495 duration-300 ease-in-out"
                    onClick={() => {
                    alert("You have been logged out.");
                    localStorage.clear();
                    sessionStorage.clear();
                    alert("You have been logged out and all data has been cleared.");
                    window.close();
                    }}
                >
                    Log-out
                </a>
                </li>
                <li>
                <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => {
                    document.documentElement.classList.toggle("dark");
                    const isDarkMode = document.documentElement.classList.contains("dark");
                    const themeIcon = isDarkMode ? "🌙" : "☀️";
                    alert(`Theme changed to ${isDarkMode ? "dark" : "light"} ${themeIcon}`);
                    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
                    alert(`Theme changed to ${isDarkMode ? "dark" : "light"}`);
                    const themeButton = document.querySelector("button");
                    if (themeButton) {
                        themeButton.textContent = themeIcon;
                    }
                    }}
                >
                    ☀️/🌙
                </button>
                </li>
            </ul>
            </div>
        </nav>
    );
};

export default Navbar;