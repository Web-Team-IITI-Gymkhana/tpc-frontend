"use client";

import React, { Component } from "react";

class Loading extends Component {
    render() {
        const { error } : any = this.props;

        // If an error prop is provided and it's true, display the error message
        if (error) {
            return (
                <div className="h-screen w-full text-center flex justify-center items-center font-bold mx-2 my-4 rounded-md bg-red-200 text-red-800">
                    Error: Something went wrong.
                </div>
            );
        }

        // Otherwise, display the loading message
        return (
            <div className="h-screen w-full text-center flex justify-center items-center font-bold mx-2 my-4 rounded-md bg-white">
                Loading...
            </div>
        );
    }
}

export default Loading;
