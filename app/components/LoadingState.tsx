export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-teal-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-teal-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
      <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">
        Creating your magical story...
      </p>
      <div className="mt-4 flex space-x-2">
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}