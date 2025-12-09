/*
 * (#)formSchema.tsx    0.4.0   12/07/2025
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

import * as yup from "yup";

const formSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Full Name is Required")
        .min(3, "Name can't be less than 3 characters"),
    gender: yup.
    string()
        .required("Gender must be selected"),
    dateOfBirth: yup
        .string()
        .required("Date of Birth must be selected"),
    fatherName: yup
        .string()
        .required("Father's Name is Required"),
    grandFatherName: yup.string(),
    maritalStatus: yup.string(),
    occupation: yup
        .string()
        .required("You must select your occupation or field"),
    emailAddress: yup
        .string()
        .email("Email Adress must be valid")
        .required("Email address is required"),
    contactNumber: yup
        .string()
        .required("Contact number is required")
        .matches(/^[0-9]/, "Contact Number can't contain any letters or special characters"),
    state: yup
        .string()
        .required("State must be selected")
        .matches(/^[a-zA-Z ]*$/, "State name can't contain numbers or special characters"),
    district: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "District name can't contain numbers or special characters")
        .required("District is required field"),
    municipality: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Municipality name can't contain numbers or special characters")
        .required("Municipality is required field"),
    wardNumber: yup
        .string()
        .required("Ward number is required field")
        .matches(/^[0-9]/, "Ward Number can't contain any letters or special characters"),
    familyName: yup.string(),
    documentType: yup
        .string()
        .required("Document Type must be selected"),
    citizenshipNumber: yup
        .string()
        .required("Citizenship Number is required")
        .matches(/^[0-9]/, "Citizenship Number can't contain any letters or special characters"),
    issuedDistrict: yup
        .string()
        .required("Issued District is required field")
        .matches(/^[a-zA-Z ]*$/, "District name can't contain numbers or special characters"),
    dateOfIssue: yup
        .string()
        .required("Date of Issue must be selected"),
    profilePicture: yup.mixed()
});

export default formSchema;
