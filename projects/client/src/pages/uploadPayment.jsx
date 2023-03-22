import UploadComponent from '../components/uploadPayment';

export default function UploadPayment() {

    return(
        <>
        <div className="flex flex-row justify-center bg-[#1c1c1c] ">
            <div className="flex flex-col gap-4 border rounded-xl text-black bg-[#e6e6e6] w-[500px] h-[500px] p-4 m-5">
                <div>
                    <h1>Upload Payment</h1>
                </div>
                <div>
                    <UploadComponent/>
                </div>
            </div>
        </div>
        </>
    )
}