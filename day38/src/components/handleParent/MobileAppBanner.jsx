import DownloadApp from "../handleChildren/DownloadApp";

export default function MobileAppBanner() {
  return (
    <aside>
      <div className="max-w-380 mx-auto mt-21 bg-linear-to-r from-[#eee] to-[#E0E1DC]  rounded-3xl border-b-2 border-black/20 shadow-md shadow-black/20 flex justify-between items-center h-153">
        <div className="relative z-5 -top-[50%] w-[55%]">
          <img
            src="/public/images/banner/banner1.png"
            className="absolute -top-10 left-5 bottom-0 z-20"
          />
          <img
            src="/public/images/banner/banner2.png"
            className="absolute -top-12 -left-0 bottom-0 z-10"
          />
        </div>

        <div className="w-[45%] relative">
          <h2 className="flex items-center">
            <img
              src="/public/images/logos/LOGO.png"
              className="h-[63px] object-cover"
            />
            <span className="text-[68px] font-bold tracking-tighter">
              ing is more
            </span>
          </h2>
          <div className="absolute -left-67 w-[878px] rounded-full bg-[#03081F] py-2 text-right align-middle">
            <h3 className="mr-15 text-[54px] font-medium tracking-tighter">
              <span className="underline text-[#FC8A06]">Personalized</span>
              <span className="text-white"> & Instant</span>
            </h3>
          </div>
          <p className=" mt-[109px] ml-24 text-2xl tracking-tighter font-normal text-black">
            Download the Order.uk app for faster ordering
          </p>
          <div className="flex items-center gap-1 mt-[23px] ml-28">
            <DownloadApp />
          </div>
        </div>
      </div>
    </aside>
  );
}
