import React from "react";

const Number = ({
    value,
    title,
    name,
    required = false,
    placeholder = false,

}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {title} <span className="text-red-500">*</span>
            </label>
            <input
                type="number"
                id={name}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder || title}
                defaultValue={value || 0}
                required={required}
            />
        </div>
    );
};

export default Number;