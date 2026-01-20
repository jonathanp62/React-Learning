/*
 * (#)formConfig.ts 0.5.0   01/20/2026
 * (#)formConfig.ts 0.4.0   12/15/2025
 *
 * @author  Jonathan Parker
 * @version 0.5.0
 * @since   0.4.0
 *
 * MIT License
 *
 * Copyright (c) 2025, 2026 Jonathan M. Parker
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
                            value: "Alabama", label: "Alabama"
                        },
                        {
                            value: "Alaska", label: "Alaska"
                        },
                        {
                            value: "Arizona", label: "Arizona"
                        },
                        {
                            value: "Arkansas", label: "Arkansas"
                        },
                        {
                            value: "California", label: "California"
                        },
                        {
                            value: "Colorado", label: "Colorado"
                        },
                        {
                            value: "Connecticut", label: "Connecticut"
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
                            value: "Hawaii", label: "Hawaii"
                        },
                        {
                            value: "Idaho", label: "Idaho"
                        },
                        {
                            value: "Illinois", label: "Illinois"
                        },
                        {
                            value: "Indiana", label: "Indiana"
                        },
                        {
                            value: "Iowa", label: "Iowa"
                        },
                        {
                            value: "Kansas", label: "Kansas"
                        },
                        {
                            value: "Kentucky", label: "Kentucky"
                        },
                        {
                            value: "Louisiana", label: "Louisiana"
                        },
                        {
                            value: "Maine", label: "Maine"
                        },
                        {
                            value: "Maryland", label: "Maryland"
                        },
                        {
                            value: "Massachusetts", label: "Massachusetts"
                        },
                        {
                            value: "Michigan", label: "Michigan"
                        },
                        {
                            value: "Minnesota", label: "Minnesota"
                        },
                        {
                            value: "Mississippi", label: "Mississippi"
                        },
                        {
                            value: "Missouri", label: "Missouri"
                        },
                        {
                            value: "Montana", label: "Montana"
                        },
                        {
                            value: "Nebraska", label: "Nebraska"
                        },
                        {
                            value: "Nevada", label: "Nevada"
                        },
                        {
                            value: "New Hampshire", label: "New Hampshire"
                        },
                        {
                            value: "New Jersey", label: "New Jersey"
                        },
                        {
                            value: "New Mexico", label: "New Mexico"
                        },
                        {
                            value: "New York", label: "New York"
                        },
                        {
                            value: "North Carolina", label: "North Carolina"
                        },
                        {
                            value: "North Dakota", label: "North Dakota"
                        },
                        {
                            value: "Ohio", label: "Ohio"
                        },
                        {
                            value: "Oklahoma", label: "Oklahoma"
                        },
                        {
                            value: "Oregon", label: "Oregon"
                        },
                        {
                            value: "Pennsylvania", label: "Pennsylvania"
                        },
                        {
                            value: "Rhode Island", label: "Rhode Island"
                        },
                        {
                            value: "South Carolina", label: "South Carolina"
                        },
                        {
                            value: "South Dakota", label: "South Dakota"
                        },
                        {
                            value: "Tennessee", label: "Tennessee"
                        },
                        {
                            value: "Texas", label: "Texas"
                        },
                        {
                            value: "Utah", label: "Utah"
                        },
                        {
                            value: "Vermont", label: "Vermont"
                        },
                        {
                            value: "Virginia", label: "Virginia"
                        },
                        {
                            value: "Washington", label: "Washington"
                        },
                        {
                            value: "West Virginia", label: "West Virginia"
                        },
                        {
                            value: "Wisconsin", label: "Wisconsin"
                        },
                        {
                            value: "Wyoming", label: "Wyoming"
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
