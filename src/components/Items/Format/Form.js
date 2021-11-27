export function InputImage(props) {
    return (
        <div className="form-group space-y-2 pb-20">
            <label htmlFor={props.labelFor} className="font-bold text-lg">
                {props.labelName}
            </label>
            <label htmlFor={props.labelFor} className="w-max text-yellow-500 bg-gray-200 rounded-md text-lg flex gap-10 cursor-pointer p-2 border-2 border-gray-300">
            </label>
            <input onChange={props.onChange} type="file" hidden id="photo" name="photo" multiple />
        </div>
    );
}

export function InputSubmit(props) {
    return (
        <div className="form-group space-y-2 text-center">
            <input value={props.value} type="submit" name="submit" className={`font-bold p-2 bg-yellow-400 hover:bg-yellow-500 text-white text-lg rounded-md cursor-pointer px-20 w-${props.w}`} />
        </div>
    );
}