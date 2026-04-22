import { Button } from "../ui/button";

export default function Partner() {
  return (
    <section>
      <div className="max-w-380 mx-auto mt-[53px] flex items-center justify-between">
        <div className="relative">
          <img src="/images/partners/partner1.png" />

          <div className="absolute top-0 left-[70px] px-8 py-4 bg-white rounded-b-xl">
            <p className="font-bold text-lg text-[#03081f]">
              Earn more with lower fees
            </p>
          </div>

          <div className="absolute bottom-[39px] left-[70px]">
            <p className="text-lg text-[#FC8A06] font-medium">
              Signup as a business
            </p>
            <h3 className="leading-none font-bold text-[44px] text-white">
              Partner with us
            </h3>
            <Button
              size={null}
              className={
                "mt-9 px-[50px] py-3 rounded-full bg-[#FC8A06] text-white font-medium text-lg hover:text-[#FC8A06] cursor-pointer"
              }
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="relative">
          <img src="/images/partners/partner2.png" />

          <div className="absolute top-0 left-[70px] px-8 py-4 bg-white rounded-b-xl">
            <p className="font-bold text-lg text-[#03081f]">
              Avail exclusive perks
            </p>
          </div>

          <div className="absolute bottom-[39px] left-[70px]">
            <p className="text-lg text-[#FC8A06] font-medium">
              Signup as a rider
            </p>
            <h3 className="leading-none font-bold text-[44px] text-white">
              Ride with us
            </h3>
            <Button
              size={null}
              className={
                "mt-9 px-[50px] py-3 rounded-full bg-[#FC8A06] text-white font-medium text-lg hover:text-[#FC8A06] cursor-pointer"
              }
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
