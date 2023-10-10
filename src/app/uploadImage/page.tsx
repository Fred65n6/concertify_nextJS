// "use client";
// import React, {useState, useEffect} from "react";
// import axios from "axios";

// const UploadImage = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = React.useState<string>("");
//     const [picture, setPicture] = useState({
//         picture: "",
//     });

//     const uploadImage = async () => {
//         try {
//             const response = await axios.post("/api/data/uploadImage", picture);
//             console.log("image uploaded", response.data);
//         } catch (error: any) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.error
//             ) {
//                 setError(error.response.data.error);
//             } else {
//                 setError("An error occurred during upload.");
//             }
//             console.log("Image upload failed", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="">
//             {error && <div className="text-red-500">{error}</div>}
//             <input
//                 name="image"
//                 id="pictureInput"
//                 type="file"
//                 value={picture.picture}
//                 onChange={(e) =>
//                     setPicture({...picture, picture: e.target.value})
//                 }
//             />
//             <button
//                 className="brand_gradient py-2 px-4 rounded-full text-white"
//                 onClick={uploadImage}
//             >
//                 Upload
//             </button>
//         </div>
//     );
// };

// export default UploadImage;

"use client";

import {useState} from "react";

export default function UploadForm() {
    const [file, setFile] = useState<File>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file);

            const res = await fetch("/api/data/uploadImage/", {
                method: "POST",
                body: data,
            });
            // handle the error
            if (!res.ok) throw new Error(await res.text());
        } catch (e: any) {
            // Handle errors here
            console.error(e);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />
            <input type="submit" value="Upload" />
        </form>
    );
}
