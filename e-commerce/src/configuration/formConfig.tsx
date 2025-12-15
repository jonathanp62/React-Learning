/*
 * (#)formConfig.tsx    0.4.0   12/15/2025
 *
 * @author  Jonathan Parker
 * @version 0.4.0
 * @since   0.4.0
 *
 * MIT License
 *
 * Copyright (c) 2025 Jonathan M. Parker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const formConfig = {
    sections: [
        {
            id: 1,
            heading: "Customer Information",
            fields: [
                {
                    id: 11,
                    name: "firstName",
                    type: "text",
                    label: "First Name",
                    placeholder: "Enter your first name"
                },
                {
                    id: 12,
                    name: "lastName",
                    type: "text",
                    label: "Last Name",
                    placeholder: "Enter your last name"
                },
                {
                    id: 13,
                    name: "address",
                    type: "text",
                    label: "Address",
                    placeholder: "Enter your street address"
                },
                {
                    id: 14,
                    name: "city",
                    type: "text",
                    label: "City",
                    placeholder: "Enter your city"
                },
                {
                    id: 15,
                    name: "state",
                    type: "select",
                    label: "State",
                    defaultValue: "",
                    options: [
                        {
                            value: "", label: "Select State", disabled: true
                        },
                        {
                            value: "Arizona", label: "Arizona"
                        },
                        {
                            value: "California", label: "California"
                        },
                        {
                            value: "Delaware", label: "Delaware"
                        },
                        {
                            value: "Florida", label: "Florida"
                        },
                        {
                            value: "Georgia", label: "Georgia"
                        },
                        {
                            value: "Illinois", label: "Illinois"
                        },
                        {
                            value: "Maryland", label: "Maryland"
                        },
                        {
                            value: "Massachusetts", label: "Massachusetts"
                        },
                        {
                            value: "New York", label: "New York"
                        },
                        {
                            value: "North Carolina", label: "North Carolina"
                        },
                        {
                            value: "Ohio", label: "Ohio"
                        },
                        {
                            value: "South Carolina", label: "South Carolina"
                        },
                        {
                            value: "Texas", label: "Texas"
                        },
                        {
                            value: "Virginia", label: "Virginia"
                        },
                        {
                            value: "West Virginia", label: "West Virginia"
                        }
                    ]
                },
                {
                    id: 16,
                    name: "zipCode",
                    type: "text",
                    label: "Zip Code",
                    placeholder: "Enter your zip code"
                },
                {
                    id: 17,
                    name: "country",
                    type: "text",
                    label: "Country",
                    placeholder: "Enter your country"
                },
                {
                    id: 18,
                    name: "phone",
                    type: "text",
                    label: "Phone",
                    placeholder: "Enter your phone number"
                },
                {
                    id: 19,
                    name: "email",
                    type: "text",
                    label: "Email",
                    placeholder: "Enter your email address"
                }
            ]
        }
    ]
};

export default formConfig;
