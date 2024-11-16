import {useForm} from "react-hook-form";

export default function PaymentPopComp() {
    const {register, handleSubmit, formState: {errors , isSubmitting}} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h2>Payment</h2>
            <h1>User ID : [user id]</h1>
            <h1>User Name : [user name]</h1>
            <h1>User Image : [user image]</h1>
            <h1>Last Payment Date : [last payment date]</h1>
            <h1>Amount : [amount]</h1>
            <h1>Due Payment : [due payment]</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Payment Date:
                    <input type="date" {...register("paymentDate", {required: "Payment Date is required"})} />
                    {errors.paymentDate && <p className="error-msg">{errors.paymentDate.message}</p>}
                </label>
                <br />
                <label>
                    Months:
                    <input type="number" {...register("months", {required: "Months are required"})} />
                    {errors.months && <p className="error-msg">{errors.months.message}</p>}
                </label>
                <br />
                <button disabled={isSubmitting}>{isSubmitting ? "Paying..." : "Pay"}</button>
            </form>
        </div>
    );
}

