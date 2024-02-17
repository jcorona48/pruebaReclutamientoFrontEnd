import React, { useState, useEffect } from "react";
import Table from "@/components/table/index.jsx";
import BreadForm from "@/components/Form";
import { deleteBreed } from "@/api/breeds";
import { loadBreeds } from "@/api/breeds";
const MantenanceLayout = ({ title, headers, messages }) => {
    const [breeds, setBreeds] = useState([]);
    useEffect(() => {
        async function fetchBreeds() {
            const breeds = await loadBreeds();
            const breadsMap = breeds.map((data) => {
                return {
                    id: data._id,
                    //img_url: data.img_url,
                    name: data.name,
                    subBreeds: data.subBreeds.join(", "),
                    subBreedsLength: data.subBreeds.length
                }
            });
            setBreeds(breadsMap);
        }
        fetchBreeds();
    }, []);
    const [id, setId] = useState(null);
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-32">
                <h1
                    className="text-3xl text-center text-gray-700 font-bold leading-8 mt-10
                dark:text-gray-100 sm:text-4xl sm:leading-10
            "
                >
                    {title}
                </h1>
            </div>
            <Table
                headers={headers}
                datas={breeds}
                deleteObject={deleteBreed}
                messages={messages}
                setId={setId}
            />
            <dialog
                className=" rounded-lg bg-white shadow-md dark:bg-gray-800 
                    "
            >
                <div className="flex flex-col w-full relative">
                    <button
                        className=" absolute top-0 right-0
                text-3xl text-gray-700 font-bold leading-8 mx-5
                dark:text-gray-100 sm:text-4xl sm:leading-10 transition-all duration-300
                    hover:text-red-600

                    

                "
                        onClick={() => {
                            document.querySelector("dialog").close();
                        }}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <BreadForm id={id} />
                </div>
            </dialog>

            <button
                className=" absolute bottom-0 right-0 m-5 w-14 h-14 rounded-full bg-[#ad7f28] text-white flex items-center justify-center shadow-lg hover:bg-[#b18432e0] transition-all duration-300
                text-center
        "
                onClick={() => {
                    setId(null);
                    document.querySelector("dialog").showModal();
                }}
            >
                {" "}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                    ></path>
                </svg>
            </button>
        </>
    );
};

export default MantenanceLayout;
