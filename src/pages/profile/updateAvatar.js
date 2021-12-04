import { useState } from "react";
import { API } from "../../config/api";
import './Profile.css'
import ProfileImg from "../../img/Rectangle 12.png";


export default function Avatar({ userId, avatar }) {
    const [preview, setPreview] = useState(ProfileImg);

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
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="input-file-avatar">
            <div className="preview-image" style={{ width: 280, height: 345 }}>
                <img
                    src={avatar}
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