import React from "react";

const TextArea = ({
    value,
    title,
    name,
    required = false,
    rows = 4,
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
                <textarea
                    rows={rows}
                    id={name}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder || title}
                    defaultValue={value}
                    name={name}
                    required={required}
                />
            </div>
        </div>
    );
};

export default TextArea;