import React from 'react'
import { FormField } from '../utils/useValidation'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

interface CustomDropDownProps {
    field: FormField,
    [formData: string]: any;
    handleDropDownChange: (event: MyEvent) => void;
}

export interface MyCustomTarget {
    name: string;
    value: string;
}

export interface MyEvent {
    target: MyCustomTarget;
}



const CustomDropDown = ({ field, formData, handleDropDownChange }: CustomDropDownProps) => {

    const handleChange = (event: React.SyntheticEvent | null, newValue: string) => {
        console.log(newValue)

        const myCustomEventObject: MyEvent = {
            target: {
                name: field.label,
                value: newValue,
            },
        };

        handleDropDownChange(myCustomEventObject);

    };


    return (
        <>
            <FormLabel>{field.label}</FormLabel>
            <Select
                name={field.label}
                placeholder={`${field.type} ${field.label}`}
                value={formData[field.label]}
                onChange={handleChange}
            >
                {
                    field.options?.map((option, index) => (
                        <Option key={index} value={option}>{option}</Option>
                    ))
                }
            </Select>
        </>


    )
}

export default CustomDropDown
