import React from "react";


const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-lg font-bold">MyApp</div>
                <ul className="flex space-x-6">
                    <li>
                        <a
                            href="#"
                            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                           
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
                        <a href="#" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                            Log-out
                        </a>
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;