import React from 'react'

interface GlobeProps {
  userLocation: { lat: number; lon: number } | null
}

const Globe: React.FC<GlobeProps> = ({ userLocation }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Globe Placeholder</h2>
        {userLocation ? (
          <p>Thanks for visiting from latitude {userLocation.lat.toFixed(2)} and longitude {userLocation.lon.toFixed(2)}!</p>
        ) : (
          <p>Location data not available.</p>
        )}
      </div>
    </div>
  )
}

export default Globe