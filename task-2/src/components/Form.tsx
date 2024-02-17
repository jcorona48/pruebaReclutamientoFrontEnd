import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Text from "./Inputs/Text";
import TextArea from "./Inputs/TextArea";
import Number from "./Inputs/Number";
import { createBreed, updateBreed, getBreed } from "@/api/breeds";

const AnectodasForm = ({ id = false }) => {
    const [objEdit, setObjEdit] = useState<any>(false);
    const formRef = useRef<any>();
    useEffect(() => {
        formRef.current.reset();
        setObjEdit(false);
        if (id) {
            const fetchUser = async () => {
                const breed = await getBreed(id);
                console.log(breed);
                setObjEdit(breed);
            };
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const form = new FormData(e.target);

        const data: any = Object.fromEntries(form.entries());

        data.subBreeds = data.subBreeds.toLowerCase().split(", ");

        document.querySelector("dialog").close();
        if (id) {
            const userUpdated = await toast.promise(updateBreed(id, data), {
                pending: "Actualizando Raza...",
                success: "Raza actualizada ",
                error: "Error al actualizar Raza",
            });
        } else {
            const userCreated = await toast.promise(createBreed(data), {
                pending: "Creando Raza...",
                success: "Raza creada",
                error: "Error al crear Raza",
            });
        }

        e.target.reset();
        window.location.reload();
    };

    return (
        <>
            <form
                ref={formRef}
                className="p-10 rounded-lg bg-white shadow-md dark:bg-gray-800    flex flex-col gap-6    items-center justify-center "
                onSubmit={handleSubmit}
                method="dialog"
            >
                <div
                    className={`grid grid-cols-1 gap-6 
                        w-full
              `}
                >
                    <Text
                        name={"name"}
                        title={"Name of the breed"}
                        value={objEdit?.name}
                        required={true}
                    />

                    <TextArea
                        rows={8}
                        name={"subBreeds"}
                        title={"Sub-breeds"}
                        value={objEdit?.subBreeds?.join(", ")}
                        required={true}
                    />
                    {/* 

                        <Number 
                            name={"subBreedsLength"}
                            title={"Number of sub-breeds"}
                            value={objEdit?.subBreeds?.length}
                            required={true}
                        ></Number> */}
                </div>

                <button
                    type="submit"
                    className="text-white bg-[#996402] hover:bg-[#FFA500] font-medium rounded-lg text-sm w-full sm:w-64 px-5 py-2.5 text-center dark:bg-[#ffa600b7] dark:hover:bg-[#ffa6009c] mt-8"
                >
                    Guardar
                </button>
            </form>
        </>
    );
};

export default AnectodasForm;
