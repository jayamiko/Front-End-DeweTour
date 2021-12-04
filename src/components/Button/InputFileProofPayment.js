export default function ProofPayment({ setData, setPreview }) {
    const handleChange = (e) => {
        const newImage = URL.createObjectURL(e.target.files[0]);
        setPreview(newImage);
        setData((prevState) => ({ ...prevState, attachment: e.target.files }));
    };

    return (
        <div className="input-file-proofpayment d-flex justify-content-end">
            <div className="proofpayment d-flex justify-content-center flex-column">
                <div
                    className="input-file d-flex justify-content-center align-items-center"
                    style={{ width: 140, height: 140 }}
                >
                    <input
                        type="file"
                        hidden
                        id="proofPayment"
                        aria-label="file upload"
                        name="proofPayment"
                        onChange={handleChange}
                        multiple
                    />
                    <label
                        htmlFor="proofPayment"
                        className="btn btn-primary mt-3 text-white"
                        style={{ fontSize: 12 }}
                    >
                        Upload
                    </label>
                </div>
                <div className="text-muted" style={{ fontSize: 12 }}>
                    upload payment proof
                </div>
            </div>
        </div>
    );
}