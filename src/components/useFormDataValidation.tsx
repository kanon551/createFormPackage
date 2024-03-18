import React, { useState, SyntheticEvent, useEffect } from 'react';
import { FormDataErrorMessages, FormDataErrors, FormField } from "../pages/TestCard";



const useFormDataValidation = (
    formData: Record<string, any>,
    schema: FormField[],
    setFormDataErrors: React.Dispatch<React.SetStateAction<FormDataErrors>>,
    setFormDataErrorMessages: React.Dispatch<React.SetStateAction<FormDataErrorMessages>>
) => {
    useEffect(() => {
        const initializeFormDataErrors = (initialData: Record<string, any>): FormDataErrors => {
            const errors: FormDataErrors = {};
            for (const key in initialData) {
                if (Object.prototype.hasOwnProperty.call(initialData, key)) {
                    errors[key] = false;
                }
            }
            return errors;
        };

        const initializeFormDataErrorMessages = (initialData: Record<string, any>): FormDataErrorMessages => {
            const errorMessages: FormDataErrorMessages = {};
            for (const key in initialData) {
                if (Object.prototype.hasOwnProperty.call(initialData, key)) {
                    errorMessages[key] = '';
                }
            }
            return errorMessages;
        };

        setFormDataErrors(initializeFormDataErrors(formData));
        setFormDataErrorMessages(initializeFormDataErrorMessages(formData));
    }, [formData, setFormDataErrors, setFormDataErrorMessages]);

    const validateData = () => {
        let errorEncountered = false;
        for (const field of schema) {
            const key = field.label;
            if (field.type === "text") {
                if (formData[key] === null || formData[key] === undefined || formData[key] === "") {
                    console.log(`Please enter a value for ${key}`);
                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [key]: true }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [key]: `Please enter a value for ${key}` }));

                    errorEncountered = true;
                }
            }
            else if (field.type === 'checkbox' && field.mode === 'single' && formData[key] === false) {
                console.log(`Please tick ${key}`);
                setFormDataErrors((prevErrors) => ({ ...prevErrors, [key]: true }));
                setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [key]: `Please select ${key}` }));

                errorEncountered = true;
            }
            else if (field.type === "checkbox" && field.mode === 'group' && field.groupLabel) {

                const status = field.groupLabel?.some((option) => {
                    return formData[`${field.label}-${option}`] === true;
                });

                if (status === true && field.groupLabel?.length > 0) {
                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [`${field.label}-${field.groupLabel![0]}`]: false }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [`${field.label}-${field.groupLabel![0]}`]: '' }));
                }
                else {
                    console.log(`Please tick any one of ${field.label}`);

                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [`${field.label}-${field.groupLabel![0]}`]: true }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [`${field.label}-${field.groupLabel![0]}`]: `Please tick any one of ${field.label}` }));

                    errorEncountered = true;
                }
            }
            else if (field.type === 'select' && formData[key] === null) {
                console.log(`Please select ${key}`);
                setFormDataErrors((prevErrors) => ({ ...prevErrors, [key]: true }));
                setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [key]: `Please select ${key}` }));

                errorEncountered = true;
            }
            if (errorEncountered) {
                return null;
            }
        }

        if (!errorEncountered) {
            return formData;
        }
    };

    return { validateData };
};

export default useFormDataValidation;