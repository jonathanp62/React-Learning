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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';

import formConfig from "../../../configuration/formConfig";
import formSchema from "../../../configuration/formSchema";

/**
 * The form component.
 *
 * @returns {JSX.Element}
 */
export default function Form(): JSX.Element {
    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const handleFormSubmit = (data): void => {
        console.log(data);
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
                                        key={ id}
                                        placeholder={ placeholder }
                                        name={ name }
                                        type={ type }
                                        label={ label }
                                        options={ options }
                                        defaultValue={ defaultValue }
                                        register={ register }
                                        errorMessage= {errors[`${name}`]?.message }
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            ))}

            <button
                type="submit"
                className="w-full p-4 font-bold text-white transition ease-in rounded-md bg-primary hover:bg-secondary"
            >
                { t("submit") }
            </button>
        </form>
    );
}
