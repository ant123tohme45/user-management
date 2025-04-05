import React from "react";


const Home: React.FC = () => {
    function handleEditUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const userCard = event.currentTarget.closest(".bg-white.shadow-md.rounded-lg.p-4");
        if (userCard) {
            const nameElement = userCard.querySelector("h3.text-lg.font-semibold.text-gray-800");
            const emailElement = userCard.querySelector("p.text-gray-600");
            if (nameElement && emailElement) {
                const newName = prompt("Enter new name:", nameElement.textContent || "");
                const newEmail = prompt("Enter new email:", emailElement.textContent || "");
                if (newName) nameElement.textContent = newName;
                if (newEmail) emailElement.textContent = newEmail;
            }
        }
    }

    return (

        <div className="min-h-screen bg-gray-100 p-4">
            <header className="bg-white shadow-md p-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">User Management Dashboard</h1>
            </header>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Users..."
                    className="p-1 border border-gray-100 rounded focus:ring-1 focus:ring-blue-200 border-[1px] width-auto"
                    onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const userCards = document.querySelectorAll(".bg-white.shadow-md.rounded-lg.p-4");
                        userCards.forEach((card) => {
                            const nameElement = card.querySelector("h3.text-lg.font-semibold.text-gray-800");
                            const statusElement = card.querySelector("p.text-gray-600:nth-of-type(3)");
                            const birthDateElement = card.querySelector("p.text-gray-600:nth-of-type(2)");

                            const name = nameElement?.textContent?.toLowerCase() || "";
                            const status = statusElement?.textContent?.toLowerCase() || "";
                            const birthDate = birthDateElement?.textContent?.split(":")[1]?.trim() || "";

                            const ageFilter = document.getElementById("ageFilter") as HTMLInputElement;
                            const statusFilter = document.getElementById("statusFilter") as HTMLSelectElement;

                            const age = ageFilter?.value ? parseInt(ageFilter.value) : null;
                            const statusFilterValue = statusFilter?.value.toLowerCase() || "";

                            const currentYear = new Date().getFullYear();
                            const birthYear = birthDate ? parseInt(birthDate.split("-")[0]) : null;
                            const calculatedAge = birthYear ? currentYear - birthYear : null;

                            const matchesName = name.includes(searchTerm);
                            const matchesStatus = !statusFilterValue || status.includes(statusFilterValue);
                            const matchesAge = !age || (calculatedAge && calculatedAge === age);

                            if (matchesName && matchesStatus && matchesAge) {
                                card.classList.remove("hidden");
                            } else {
                                card.classList.add("hidden");
                            }
                        });

                        const filterButton = document.getElementById("filterButton") as HTMLButtonElement;
                        filterButton?.addEventListener("click", () => {
                            const userCards = document.querySelectorAll(".bg-white.shadow-md.rounded-lg.p-4");
                            userCards.forEach((card) => {
                                card.classList.remove("hidden");
                            });
                        });
                    }}
                />
            </div>
            <main className="container mx-auto">
               
            <div className="bg-white shadow-md rounded-lg p-6 ">
                
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Users</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        JD
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
                    <p className="text-gray-600">john.doe@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                <button  
                    className="custom-button bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
                    onClick={handleEditUser} 
                >
                    Edit
                </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                        Delete
                    </button>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        JS
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Jane Smith</h3>
                    <p className="text-gray-600">jane.smith@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 transition-transform transform hover:scale-105"
                       onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        AT
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Anthony Tohme</h3>
                    <p className="text-gray-600">Anthonyt@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 transition-transform transform hover:scale-105"
                      onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        AT
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Anthony Tohme</h3>
                    <p className="text-gray-600">Anthonyt@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 transition-transform transform hover:scale-105"
                       onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        AT
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Anthony Tohme</h3>
                    <p className="text-gray-600">Anthonyt@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:#3251d0-600 mr-2 transition-transform transform hover:scale-105"
                       onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        AT
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Anthony Tohme</h3>
                    <p className="text-gray-600">Anthonyt@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:#3251d0-600 mr-2 transition-transform transform hover:scale-105"
                      onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this user?")) {
                                alert("The user will be deleted after 24 hours.");
                            }}
                        }>
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        TG
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">tot ger</h3>
                    <p className="text-gray-600">totogre@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:#3251d0-600 mr-2 transition-transform transform hover:scale-105"
                      onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        SF
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">samir fss</h3>
                    <p className="text-gray-600">MMMK@example.com</p>
                    <p className="text-gray-600">birth date:1998-12-2</p>
                    <p className="text-gray-600">STATUS:Active</p>

                    <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:#3251d0-600 mr-2"
                      onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                     onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                        Delete
                    </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                    <div className="flex items-center justify-center w-17 h-17 bg-blue-500 text-white rounded-full mb-10 ml-10">
                        HL
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Hoo LLO</h3>
                    <p className="text-gray-600">heloworld@example.com</p>
                    <p className="text-gray-600">birth date:1998-05-25</p>
                    <p className="text-gray-600">STATUS:Active</p>
                    <div className="mt-4 flex justify-end space-x-2 ">
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 transition-transform transform hover:scale-105"
                        onClick={handleEditUser}
                    >
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                            alert("The user will be deleted after 24 hours.");
                        }}
                    }>
                        Delete
                    </button>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </div>
    );


};
export default Home;