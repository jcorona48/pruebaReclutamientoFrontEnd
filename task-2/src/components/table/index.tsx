import React, { useState, useRef, useEffect } from "react";
import UserPlaceHolderImg from "@/assets/img/userPlaceHolder.jpg";
import { toast } from "react-toastify";

const index = ({ headers, datas, deleteObject, messages, setId }) => {
    const [data, setData] = useState([]);
    const [orderAsc, setOrderAsc] = useState(false);
    useEffect(() => {
        setData(datas);
    }, [datas]);
    const [filter, setFilter] = useState(data);

    useEffect(() => {
        setFilter(data);
    }, [data]);

    const formRef: any = useRef();
    const handleDelete = async (id) => {
        // Quiero que me salga el aviso de si quiero eliminar el usuario
        const deleted = confirm(
            messages?.delete || "¿Seguro que desea eliminar este objeto?"
        );

        if (!deleted) return;

        const res = await toast.promise(deleteObject(id), {
            pending: messages?.pending || "Eliminando objeto...",
            success: messages?.success || "Objeto eliminado",
            error: messages?.error || "Error al eliminar objeto",
        });

        window.location.reload();
    };

    const handleEdit = (id) => {
        setId(id);
        document.querySelector("dialog").showModal();
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const form: any = new FormData(e.target);
        const info: any = Object.fromEntries(form.entries());

        const filter = info.filter.toLowerCase();
        if (!filter) return setFilter(data);

        const filterData = data.filter((row) => {
            return Object.keys(row).some((key) =>
                row[key]?.toString()?.toLowerCase()?.includes(filter)
            );
        });
        setFilter(filterData);
    };

    const handleOrder = (header) => {
        if (orderAsc) {
            setOrderAsc(false);
            const filterData = data.sort((a, b) => {
                if (a[header.key] > b[header.key]) {
                    return -1;
                }
                if (a[header.key] < b[header.key]) {
                    return 1;
                }
                return 0;
            });
            setFilter(filterData);
            return;
        } else {
            setOrderAsc(true);
            const filterData = data.sort((a, b) => {
                if (a[header.key] < b[header.key]) {
                    return -1;
                }
                if (a[header.key] > b[header.key]) {
                    return 1;
                }

                return 0;
            });
            setFilter(filterData);
            console.log("Order Raza", filterData);
        }
    };
    return (
        <div
            className="flex flex-col w-full gap-6 px-6
            sm:max-w-screen-sm
            md:max-w-screen-md
            lg:max-w-screen-lg
        "
        >
            <div className=" flex gap-14 items-center w-full justify-between">
                <form onSubmit={handleFilter} className="w-96" ref={formRef}>
                    <label
                        htmlFor="default-search"
                        className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#ffa600a9] focus:border-[#ffa600a9] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ffa600a9] dark:focus:border-[#ffa600a9]"
                            placeholder="Ingrese valor de busqueda."
                            name="filter"
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-[#aa8134f3] hover:bg-[#886627f3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#ffa600ce] dark:hover:bg-[#ffa600a9] dark:focus:ring-[#ffa600a9]"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <button
                    className="
                        text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800 h-10
                        truncate
                    "
                    onClick={() => {
                        formRef.current.reset();
                        setFilter(data);
                    }}
                >
                    Limpiar Filtros
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    key={index}
                                    onClick={() => {
                                        handleOrder(header);

                                        console.log(header);
                                    }}
                                >
                                    {header.name} {orderAsc ? "▲" : "▼"}
                                </th>
                            ))}

                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.map((row, index) => (
                            <tr
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                key={index}
                            >
                                <td className="px-6 py-4 hidden" key={index}>
                                    {row.id}
                                </td>

                                {headers.map((header, index) => {
                                    if (header.key == "img_url") {
                                        return (
                                            <td
                                                className="px-6 py-4"
                                                key={index}
                                            >
                                                <img
                                                    src={
                                                        row[header.key] ||
                                                        UserPlaceHolderImg.src
                                                    }
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </td>
                                        );
                                    }

                                    return (
                                        <td className="px-6 py-4" key={index}>
                                            {row[header.key]}
                                        </td>
                                    );
                                })}
                                <td className="px-6 py-4">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleEdit(row.id)}
                                            className="font-medium text-[#ffa600e7] dark:text-[#ffa600a9]hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className={`font-medium text-red-600 dark:text-red-500 hover:underline 
                                            disabled:opacity-50 disabled:hover:no-underline
                                        `}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default index;
