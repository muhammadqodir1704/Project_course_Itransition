import { createContext, useState } from "react";
import { insertData, updateData, deleteData } from "../helper/supabaseClient";
export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [savedForms, setSavedForms] = useState([]);
    const insertForm = async (data) => await insertData("forms", data);
    const updateForm = async (id, data) => await updateData("forms", id, data);
    const removeForm = async (id) => await deleteData("forms", id);


    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: [""] }]);
    };

    const addOption = (qIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.push("");
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    const removeOption = (qIndex, oIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
            (_, i) => i !== oIndex
        );
        setQuestions(updatedQuestions);
    };

    const removeQuestion = (qIndex) => {
        setQuestions(questions.filter((_, i) => i !== qIndex));
    };

    const handleQuestionChange = (questionIndex, newText) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, index) =>
                index === questionIndex ? { ...question, text: newText } : question
            )
        );
    };

    const validateForm = () => {
        if (!formName.trim()) {
            alert("Form name is required!");
            return false;
        }
        if (questions.length === 0 || questions.some(q => !q.text.trim())) {
            alert("Each question must have text.");
            return false;
        }
        if (questions.some(q => q.options.some(o => o.trim() === ""))) {
            alert("Each option must have text.");
            return false;
        }
        return true;
    };

    const saveForm = async () => {
        if (validateForm()) {
            const newForm = {
                formName,
                formDescription,
                questions,
            };

            try {
                const result = await insertData("form_templates", newForm);
                console.log("Form saved to Supabase:", result);

                setSavedForms([...savedForms, newForm]);

                // Formalarni tozalash
                setFormName("");
                setFormDescription("");
                setQuestions([]);
            } catch (error) {
                console.error("Error saving form:", error);  
                if (error.message) {
                    alert("Error: " + error.message); 
                } else {
                    alert("Unknown error occurred while saving form.");
                }
            }
        }
    };


    const renameForm = (index) => {
        const newName = prompt("Enter a new name for the form:");
        if (newName) {
            const updatedForms = [...savedForms];
            updatedForms[index].formName = newName;
            setSavedForms(updatedForms);
        }
    };

    const deleteForm = (index) => {
        if (window.confirm("Are you sure you want to delete this form?")) {
            const updatedForms = savedForms.filter((_, i) => i !== index);
            setSavedForms(updatedForms);
        }
    };

    return (
        <FormContext.Provider
            value={{
                formName,
                setFormName,
                formDescription,
                setFormDescription,
                questions,
                setQuestions,
                addQuestion,
                addOption,
                handleOptionChange,
                handleQuestionChange,
                removeOption,
                removeQuestion,
                saveForm,
                savedForms,
                setSavedForms,
                renameForm,
                deleteForm,
                insertForm,
                updateForm,
                removeForm,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
