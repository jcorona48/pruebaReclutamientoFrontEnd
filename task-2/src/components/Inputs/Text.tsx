import React from "react";

const Text = ({
    value,
    title,
    name,
    required = false,
    placeholder = null,
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative  ">
                <input
                    type="text"
                    id={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder || title}
                    defaultValue={value}
                    name={name}
                    required={required}
                />
            </div>
        </div>
    );
};

export default Text;