export default function PaymentSuccess ({
    searchParams: {amount, name},
}: {
    searchParams: {amount: string; name: string};
}) {
    console.log("PaymentSuccess Page Loaded", amount, name); // Debugging

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-500 p-6">
            <div className="w-full max-w-4xl bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-4xl font-extrabold mb-4 text-purple-600">Thank You, {name}!</h1>
                <h2 className="text-2xl mb-4">You Successfully Sent</h2>
                <div className="bg-purple-600 text-white p-4 rounded-md text-4xl font-bold">${amount}</div>
            </div>
        </main>
    );
}