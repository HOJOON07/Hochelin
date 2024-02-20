export default function Loader({ clasName = "" }) {
  return (
    <div className={`flex gap-4 justify-center ${clasName}`}>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500 mt-10"></div>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500 mt-10"></div>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500 mt-10"></div>
    </div>
  );
}
