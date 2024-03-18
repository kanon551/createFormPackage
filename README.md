# F-Engine (Form-Engine)

1. Build a library which takes the below JSON and render a form.
2. This library should handle following types of form field - Text, Number, Checkbox, Select
3. Form should do all the validation and show the error message in case of validation failure.
4. Write custom hooks to perform the validation.

Sample JSON:
[
{
"type":"text",
"label":"Hello",
"validation":"number",
"min":0,
"max":100
},
{
"type":"checkbox",
"mode":"single"
"label":"Gender",
},
{
"type":"checkbox",
"mode":"group"
"groupLabel":["Male","Female"]
"label":"Gender"
},
{

"type":"select",
"options":["Bangalore","Jaipur","Delhi"]
"label":"City",
}
]


Submit -> Validation will perform on submit.

# Solution
1. A library has been created and can be called as F-engine.
2. This engine creates forms 
3. This engine handles form fields ( Text, Number, Checkbox, Select)  as of now.
3. This engine validates field data and throws error message
4. This engine has custom hook called useFormDataValidation 

# Description
##  Imagine you're creating a website where users can fill out different types of forms. This code helps you build those forms and make sure users fill them out correctly.

## Building Forms:

You know how different forms ask for different things, right? Like some forms ask for names, some for emails, and some have checkboxes or dropdowns. This code helps create those forms with all these different parts.
## Making Sure Everything's Right:

Have you ever filled out a form and it said, "Oops, you missed something" or "Please enter a valid email"? This code does that checking to make sure users don't make mistakes while filling out the forms.
## Handling Different Types of Information:

Sometimes, forms need to handle numbers, checkboxes (like agreeing to terms), or let you choose from options (like selecting your city). This code knows how to handle all these different types of information in the forms.
## Keeping Things Organized:

The code also organizes the forms neatly on the website. It arranges everything properly so users can easily see what they need to fill out.
## Why It's Important:

Imagine if every website had confusing or broken forms. It would be really frustrating to use, right? So, this code is important because it makes sure forms on websites work smoothly, making it easier for everyone to use the website without getting stuck or making mistakes.

In a nutshell, this code helps create user-friendly forms on websites and ensures that users can fill them out correctly without any hassle. It's important because it improves the overall experience of using the website and reduces errors while filling out forms.

## Improvments

There is always room for improvments, In future this work can be extended to 
1. Add Regex patterns for each field validations ( In case )
2. Add a key called required* ( Allowing to choose only required fields in the form , otherwise ignore)
3. Add Icon Unique to each field ( Thus differentiating between each fields )
4. Add field type="number"
5. Add number field validation (max and min ti define the range)
6. Add Unique ID ( to detect duplicates )
7. Add Unique name ( label should be different from name key )
