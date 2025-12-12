/*
 * (#)index.tsx 0.4.0   12/07/2025
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

import type { JSX } from "react";
import type { FormValues } from "../../../types/FormValues";
import type { ProfilePicture, SaveRequest } from "../../../types/SaveRequest";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { toast } from "react-hot-toast";

import InputFields from "./InputFields";
import formConfig from "../../../configuration/formConfig";
import formSchema from "../../../configuration/formSchema";

/**
 * The form component.
 *
 * @returns {JSX.Element}
 */
export default function Form(): JSX.Element {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: yupResolver(formSchema)
    });

    const handleFormSubmit: (data: FormValues) => void = (data: FormValues): void => {
        // @todo: Configure debug in the package JSON
        // @todo: Test without optional elements

        console.log(data);

        const profilePicture: ProfilePicture = {
            name: data.profilePicture?.[0]?.name ?? "",
            lastModified: data.profilePicture?.[0]?.lastModified ?? 0,
            size: data.profilePicture?.[0]?.size ?? 0
        };

        const saveRequest: SaveRequest = {
            fullName: data.fullName,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            fatherName: data.fatherName,
            grandFatherName: data.grandFatherName,
            maritalStatus: data.maritalStatus,
            occupation: data.occupation,
            emailAddress: data.emailAddress,
            contactNumber: data.contactNumber,
            state: data.state,
            district: data.district,
            municipality: data.municipality,
            wardNumber: data.wardNumber,
            familyName: data.familyName,
            documentType: data.documentType,
            citizenshipNumber: data.citizenshipNumber,
            issuedDistrict: data.issuedDistrict,
            dateOfIssue: data.dateOfIssue,
            profilePicture: profilePicture
        };

        console.log(saveRequest);

        saveForm(saveRequest).finally();

        toast.success(t("success"));
    };

    /**
     * Saves the form.
     *
     * @param   {SaveRequest}   request   The form request
     * @return  {Promise<void>}
     */
    const saveForm: (request: SaveRequest) => Promise<void> = async (request: SaveRequest): Promise<void> => {
        const postUrl: string = "http://localhost:8080/react/learning/api/bank-kyc-form";

        try {
            const response: Response = await fetch(postUrl, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const form: SaveRequest = await response.json();

            console.log("Returned form:");
            console.log(form);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={ handleSubmit(handleFormSubmit) } noValidate className="form min-h-47rem">
            {formConfig.sections.map(section => (
                <div className="mb-20" key={section.id}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-9 bg-primary"></div>
                        <p className="section-heading">{section.heading}</p>
                    </div>

                    <div className="grid items-start content-center grid-cols-3 gap-x-20 gap-y-6">
                        {section.fields.map(field => {
                                const { id, name, type, label, options, placeholder, defaultValue } = field;
                                return (
                                    <InputFields
                                        key={ id }
                                        placeholder={ placeholder }
                                        name={ name }
                                        type={ type }
                                        label={ label }
                                        options={ options }
                                        defaultValue={ defaultValue }
                                        register={ register }
                                        errorMessage={ errors[`${name}`]?.message as string | undefined }
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            ))}

            <div className="flex flex-col items-center gap-2">
                <button
                    type="submit"
                    className="w-1/2 p-4 font-bold text-white transition ease-in rounded-md bg-primary hover:bg-secondary"
                >
                    { t("submit") }
                </button>
                <button
                    type="reset"
                    className="w-1/2 p-4 font-bold text-white transition ease-in rounded-md bg-primary hover:bg-secondary"
                >
                    { t("reset") }
                </button>
            </div>
        </form>
    );
}
