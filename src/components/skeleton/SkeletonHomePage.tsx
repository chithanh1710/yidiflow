export function ListSkeletonHomePage() {
  return (
    <div className="mt-12 flex flex-col gap-6">
      <SkeletonHomePage />
      <SkeletonHomePage />
      <SkeletonHomePage />
      <SkeletonHomePage />
      <SkeletonHomePage />
      <SkeletonHomePage />
    </div>
  );
}

export function SkeletonHomePage() {
  return (
    <div className="animate-pulse card-wrapper rounded-xl p-9 sm:px-11">
      <div className="bg-slate-700 h-6 rounded w-32"></div>
      <div className="flex gap-2">
        <div className="bg-slate-700 h-8 w-16 rounded mt-8"></div>
        <div className="bg-slate-700 h-8 w-16 rounded mt-8"></div>
        <div className="bg-slate-700 h-8 w-16 rounded mt-8"></div>
      </div>
      <div className="flex flex-wrap justify-between items-center mt-6">
        <div className="flex gap-2 items-center">
          <div className="bg-slate-700 rounded-full h-10 w-10"></div>
          <div className="h-2 w-52 bg-slate-700 rounded"></div>
          <div className="bg-slate-700 rounded-full h-2 w-2"></div>
          <div className="h-2 w-32 bg-slate-700 rounded"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-16 bg-slate-700 rounded"></div>
          <div className="h-2 w-16 bg-slate-700 rounded"></div>
          <div className="h-2 w-16 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
