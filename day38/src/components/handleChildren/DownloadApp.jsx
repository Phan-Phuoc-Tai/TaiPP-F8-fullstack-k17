export default function DownloadApp() {
  return (
    <>
      <a
        href="https://apps.apple.com/"
        target="_blank"
        className="bg-black px-4 py-[9px] rounded-[9px] border-2 border-[#A6A6A6]"
      >
        <img src="/public/images/banner/appStore.png" />
      </a>
      <a
        href="https://play.google.com/"
        target="_blank"
        className="border-2 border-[#A6A6A6] rounded-[9px]"
      >
        <img src="/public/images/banner/googlePlay.png" />
      </a>
    </>
  );
}
