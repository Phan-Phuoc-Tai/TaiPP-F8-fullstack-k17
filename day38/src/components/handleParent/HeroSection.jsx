import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

export default function HeroSection() {
  return (
    <article>
      <div className="max-w-380 mx-auto mt-[103px] bg-[#FBFBFB] border border-black/20 rounded-[12px] flex justify-between overflow-hidden relative h-[610px]">
        <div className="left absolute top-[134px] left-13 z-25">
          <p className=" text-base font-normal">
            Order Restaurant food, takeaway and groceries.
          </p>
          <h1>
            <span className="block font-semibold text-[54px]">
              Feast Your Senses,
            </span>
            <span className="block text-[#FC8A06] font-semibold  text-[54px] leading-10">
              Fast and Fresh
            </span>
          </h1>

          <div className=" mt-15">
            <p className=" mb-2 font-normal text-[13px] ">
              Enter a postcode to see what we deliver
            </p>
            <InputGroup className="px-3 py-2 h-[58px] w-88 rounded-full text-base relative">
              <InputGroupInput
                placeholder="e.g. EC4R 3TE"
                className={"text-base"}
              />
              <InputGroupAddon>
                <InputGroupButton
                  className={
                    "bg-[#FC8A06] h-[57px] w-[188px] rounded-full text-white absolute right-0 top-0 cursor-pointer hover:bg-[#efefef] hover:text-[#FC8A06]"
                  }
                >
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="middle absolute bottom-0 left-0 right-0 z-18 mx-auto w-max">
          <img
            src="/images/heroSections/heroSection1.png"
            className="object-cover"
          />
        </div>

        <div className="right relative w-full">
          <div className="bg-[#FC8A06] rounded-tl-[65%] w-[626px] h-[565px] absolute bottom-0 right-0 z-5">
            <div className="absolute bottom-0 left-0">
              <img
                src="/images/heroSections/heroSection2.png"
                className=" object-cover"
              />
            </div>
            <div className="absolute right-9 top-18 w-100">
              <div className=" bg-[#FBFBFB] w-72 p-4 rounded-lg mb-15 relative">
                <div className="flex items-center justify-between">
                  <img src="/images/logos/LOGO-sm.png" />
                  <span className="text-gray-400">now</span>
                </div>
                <h3 className="font-semibold text-[13px]">
                  We've Received your order!
                </h3>
                <p className="text-[13px]">Awaiting Restaurant acceptance</p>
                <div className="absolute -top-12 right-3">
                  <img src="/images/heroSections/1.png" />
                </div>
              </div>

              <div className=" bg-[#FBFBFB] w-72 p-4 rounded-lg mb-19 relative ml-24">
                <div className="flex items-center justify-between">
                  <img src="/images/logos/LOGO-sm.png" />
                  <span className="text-gray-400">now</span>
                </div>
                <h3 className="font-semibold text-[13px]">
                  Order Accepted! <span>✅</span>
                </h3>
                <p className="text-[13px]">
                  Your order will be delivered shortly
                </p>
                <div className="absolute -top-12 right-3">
                  <img src="/images/heroSections/2.png" />
                </div>
              </div>

              <div className=" bg-[#FBFBFB] w-72 p-4 rounded-lg relative ml-13">
                <div className="flex items-center justify-between">
                  <img src="/images/logos/LOGO-sm.png" />
                  <span className="text-gray-400">now</span>
                </div>
                <h3 className="font-semibold text-[13px]">
                  Your rider's nearby<span>🎉</span>
                </h3>
                <p className="text-[13px]">They're almost there - get ready!</p>
                <div className="absolute -top-12 right-3">
                  <img src="/images/heroSections/3.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
