import React, { useState, SyntheticEvent, useEffect } from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FormHelperText from '@mui/joy/FormHelperText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import useFormDataValidation from '../components/useFormDataValidation';
import CustomDropDown, { MyEvent } from '../components/CustomDropDown';
import { error } from 'console';

export interface FormField {
    type: string;
    label: string;
    validation?: string;
    min?: number;
    max?: number;
    mode?: string;
    groupLabel?: string[];
    options?: string[];
}


export interface FormDataErrors {
    [key: string]: boolean;
}

export interface FormDataErrorMessages {
    [key: string]: string;
}

const schema: FormField[] = [
    {
        type: 'text',
        label: 'Hello',
        validation: 'number',
        min: 2,
        max: 100,
    },
    {
        type: 'checkbox',
        mode: 'single',
        label: 'MaritalStatus',
    },
    {
        type: 'checkbox',
        mode: 'group',
        groupLabel: ['Male', 'Female'],
        label: 'Gender',
    },
    {
        type: 'select',
        options: ['Bangalore', 'Jaipur', 'Delhi'],
        label: 'City',
    },
];



const TestCard = () => {

    const initialState: Record<string, any> = {};

    schema.forEach((field) => {
        if (field.type === 'checkbox') {
            if (field.mode === 'group' && field.groupLabel) {
                field.groupLabel.forEach((option) => {
                    initialState[`${field.label}-${option}`] = false;
                });
            } else {
                initialState[field.label] = false;
            }
        } else if (field.type === 'select' && field.options) {
            // initialState[field.label] = field.options[0];
            initialState[field.label] = null;
        } else {
            initialState[field.label] = '';
        }
    });

    const [formData, setFormData] = useState(initialState);

    const [formDataErrors, setFormDataErrors] = useState<FormDataErrors>({});
    const [formDataErrorMessages, setFormDataErrorMessages] = useState<FormDataErrorMessages>({});

    const { validateData } = useFormDataValidation(
        formData,
        schema,
        setFormDataErrors,
        setFormDataErrorMessages
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationResponse = validateData();
        if (validationResponse) {
            console.log(validationResponse);
        } else {
            console.log('Form data validation failed');
        }

    };

    useEffect(() => {
        fieldValidaion(formData);
    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | MyEvent, field: FormField) => {

        if (field.type === 'checkbox' && e !== null) {

            const target = e.target as HTMLInputElement;
            const { name } = target;
            const isChecked = (e.target as HTMLInputElement).checked;
            if (field.mode === 'single') {

                setFormData((prevData) => ({ ...prevData, [name]: isChecked }));
                setFormDataErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
                setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
            }
            else if (field.mode === 'group' && field.groupLabel) {
                const updatedFormData = { ...formData };
                let isAnyCheckboxSelected = false;
                let selectedCheckboxName = '';

                field.groupLabel?.forEach((option) => {
                    const checkboxName = `${field.label}-${option}`;

                    if (name === checkboxName) {
                        updatedFormData[checkboxName] = isChecked;
                        if (isChecked) {
                            isAnyCheckboxSelected = true;
                            selectedCheckboxName = checkboxName;
                        }
                    } else {
                        updatedFormData[checkboxName] = false;
                    }
                });

                setFormData(updatedFormData);
                setFormDataErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
                setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));

                if (isAnyCheckboxSelected) {
                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [selectedCheckboxName]: false }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [selectedCheckboxName]: '' }));
                }
            }


        }
        else if (field.type === 'text' && e !== null && field.max && field.min) {
            const target = e.target as HTMLInputElement;
            const { name, value } = target;

            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }

        else if (field.type === 'select') {
            setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
            setFormDataErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: false }));
            setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [e.target.name]: '' }));
        }

    };

    const fieldValidaion = (formData: Record<string, any>) => {
        for (const field of schema) {
            const key = field.label;
            if (field.type === "text" && field.max && field.min) {
                if (formData[key] === null || formData[key] === undefined || formData[key] === "") {
                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [key]: false }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [key]: '' }));
                }
                else if (formData[key].length > field.max) {
                    console.log(`Length of ${field.label} field should not exceed ${field.max} characters`);
                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [key]: true }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [key]: `Length of ${field.label} field should not exceed ${field.max} characters` }));
                }
                else if (formData[key].length < field.min) {
                    console.log(`Length of ${field.label} field should be at least ${field.min} characters`);
                    setFormDataErrors((prevErrors) => ({ ...prevErrors, [key]: true }));
                    setFormDataErrorMessages((prevMessages) => ({ ...prevMessages, [key]: `Length of ${field.label} field should be at least ${field.min} characters` }));
                }
            }
        }
    }

    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                mx: 'auto',
                // to make the demo resizable
                overflow: 'auto',
                resize: 'horizontal',
            }}
        >
            <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                Form Validation
            </Typography>
            <Divider inset="none" />
            <CardContent
                component={"form"}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
                onSubmit={handleSubmit}
            >
                {
                    schema.map((field, index) => {
                        return (
                            (field.type === 'text') &&
                            <FormControl key={index} error={formDataErrors[field.label]} sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>{field.label}</FormLabel>
                                <Input
                                    type={field.type}
                                    name={field.label}
                                    value={formData[field.label]}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, field)}
                                    endDecorator={<CreditCardIcon />} />
                                {
                                    formDataErrors[field.label] &&
                                    <FormHelperText>
                                        <InfoOutlined />
                                        {
                                            formDataErrorMessages[field.label]
                                        }
                                    </FormHelperText>
                                }

                            </FormControl>
                        )
                    })
                }
                {
                    schema.map((field, index) => {

                        if (field.type === 'checkbox') {

                            if (field.mode === 'single') {
                                return (
                                    <FormControl key={index} sx={{ gridColumn: '1/-1' }}>
                                        <Checkbox label={field.label}

                                            name={field.label}
                                            checked={formData[field.label]}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, field)} />
                                        {
                                            formDataErrors[field.label] &&
                                            <FormHelperText sx={{ color: 'red' }}>{formDataErrorMessages[field.label]}</FormHelperText>
                                        }

                                    </FormControl>
                                )

                            }

                            else if (field.mode === 'group') {
                                return (
                                    <div key={index} style={{ gridColumn: '1/-1' }}>
                                        <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
                                            {field.label}
                                        </Typography>
                                        {
                                            field.groupLabel !== undefined && formDataErrors[`${field.label}-${field.groupLabel[0]}`] &&
                                            <FormHelperText sx={{ color: 'red' }}>{formDataErrorMessages[`${field.label}-${field.groupLabel[0]}`]}</FormHelperText>
                                        }
                                        <div role="group" aria-labelledby="sandwich-group">
                                            <List size="sm">
                                                {
                                                    field.groupLabel?.map((option, index) => (
                                                        <ListItem key={index}>
                                                            <Checkbox label={option}
                                                                name={`${field.label}-${option}`}
                                                                checked={formData[`${field.label}-${option}`]}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, field)} />
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </div>
                                    </div>
                                )

                            }
                        }
                    })
                }
                {
                    schema.map((field, index) => {
                        if (field.type === 'select') {
                            return (
                                <FormControl key={index} sx={{ gridColumn: '1/-1' }}>

                                    <CustomDropDown
                                        field={field}
                                        formData={formData}
                                        handleDropDownChange={(myEvent: MyEvent) => handleInputChange(myEvent, field)}
                                    />
                                    {
                                        formDataErrors[field.label] &&
                                        <FormHelperText sx={{ color: 'red' }}>{formDataErrorMessages[field.label]}</FormHelperText>
                                    }
                                </FormControl>

                            )
                        }
                    })
                }
                <CardActions sx={{ gridColumn: '1/-1' }}>
                    <Button variant="solid" color="primary" type="submit">
                        Submit
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default TestCard
