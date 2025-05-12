import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Main() {
  return (
    <div className="font-['Poppins',sans-serif] bg-gray-50">
      <footer className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faKeyboard}
                  className="text-indigo-400 text-2xl mr-2"
                />
                <span className="text-xl font-bold">TypeMaster</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform to test and improve your typing skills.
                Fast, fun, and free!
              </p>
            </div>
            {/* ...other footer columns can be added here */}
          </div>
        </div>
      </footer>
    </div>
  )
}
