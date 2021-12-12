// Import React
import { useState } from "react";

// Import API
import { API } from "../../config/api";

// Import Style
import './Profile.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

export default function Avatar({ userId, avatar }) {
    const [preview, setPreview] = useState(avatar);

    const handleChange = async (e) => {
        try {
            const newImageUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(newImageUrl);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("photo", e.target.files[0], e.target.files[0].name);

            await API.put(`/user/${userId}`, formData, config);

            setTimeout(() => {
                toast.success(`Update Profile is Success`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(`Update Profile is Failed`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    };

    return (
        <div className="input-file-avatar">
            <div className="preview-image" style={{ width: 280, height: 345 }}>
                <img
                    src={preview}
                    alt="User"
                    width="280"
                    height="345"
                    className="rounded"
                />
            </div>
            <input
                type="file"
                hidden
                id="photo"
                aria-label="file upload"
                name="photo"
                onChange={handleChange}
                multiple
            />
            <label
                htmlFor="photo"
                className="btn btnChange mt-3 text-white fw-bold"
                style={{ width: 280 }}
            >
                Change Photo Profile
            </label>
        </div>
    );
}