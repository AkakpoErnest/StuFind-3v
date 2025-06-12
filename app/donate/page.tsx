const DonatePage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Support Our Mission</h1>

      {/* Donation Form or Content Here */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 mb-4">
          Your generous donation helps us continue our vital work. Please consider making a contribution today.
        </p>

        {/* Example Donation Options (replace with actual form) */}
        <div className="mb-4">
          <label htmlFor="donationAmount" className="block text-gray-700 text-sm font-bold mb-2">
            Donation Amount:
          </label>
          <input
            type="number"
            id="donationAmount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Donate Now
        </button>
      </div>
    </div>
  )
}

export default DonatePage
