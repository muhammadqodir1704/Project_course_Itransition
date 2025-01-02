import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";

const MyForms = () => {
  const { savedForms, renameForm, deleteForm } = useContext(FormContext);

  const getRandomImage = () => {
    return `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/400/400`;
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Forms</h2>
      {savedForms.length === 0 ? (
        <p className="text-gray-500">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedForms.map((form, index) => (
            <div
              key={index}
              className="relative border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <img
                src={getRandomImage()}
                alt="Random"
                className="w-full h-32 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {form.formName}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Opened : {form.openedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyForms;
