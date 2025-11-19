/*
 * (#)ErrorBoundary.tsx 0.3.0   11/19/2025
 *
 * @author  Jonathan Parker
 * @version 0.3.0
 * @since   0.3.0
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

import React, { Component } from 'react';

type Props = React.PropsWithChildren<{}>;

type State = {
    hasError: boolean
    error: Error | null
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col justify-center items-center w-full pt-10 bg-yellow-200 h-screen">
                    <h1 className="text-2xl font-bold text-red-700">
                        Oops, something went wrong: { this.state.error?.name }: { this.state.error?.message }
                    </h1>
                    <p className="m-5">{ this.state.error?.stack }</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
