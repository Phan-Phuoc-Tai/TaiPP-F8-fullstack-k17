import DownloadApp from "../handleChildren/DownloadApp";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-[#D9D9D9] mt-[45px]">
      <div className="max-w-380 mx-auto pt-[93px] pb-[58px] flex items-center justify-between">
        <div className="left">
          <a href="#">
            <img src="/public/images/logos/LOGO-footer.png" />
          </a>
          <div className="flex items-center gap-1 mt-[33px]">
            <DownloadApp />
          </div>
          <p className="mt-[22px] text-[15px] font-normal">
            Company # 490039-445, Registered with
            <br /> House of companies.
          </p>
        </div>

        <div className="middle">
          <h4 className="font-bold text-lg text-[#03081F]">
            Get Exclusive Deals in your Inbox
          </h4>

          <InputGroup className="px-3 py-2 h-[58px] rounded-full text-base relative border-[#D1D1D1] bg-[#D2D2D2] mt-6">
            <InputGroupInput
              placeholder="youremail@gmail.com"
              className={"w-95 text-[15px] font-normal text-black/60"}
            />
            <InputGroupAddon>
              <InputGroupButton
                className={
                  "bg-[#FC8A06] h-[57px] w-[171px] rounded-full text-white absolute right-0 top-0 cursor-pointer hover:bg-[#efefef] hover:text-[#FC8A06]"
                }
              >
                Subscribe
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <p className="ml-[30px] mt-2 text-[13px] font-normal text-[#03081F]">
            we wont spam, read our
            <span className="underline"> email policy</span>
          </p>
          <div className="flex items-center gap-[10px] ml-[30px] mt-4">
            <Button size={null} className={"w-[45px] h-[45px] rounded-full"}>
              <a href="https://www.facebook.com/" target="_blank">
                <Facebook style={{ width: 28, height: 28 }} />
              </a>
            </Button>
            <Button size={null} className={"w-[45px] h-[45px]"}>
              <a href="https://www.instagram.com/" target="_blank">
                <Instagram style={{ width: 28, height: 28 }} />
              </a>
            </Button>
            <Button size={null} className={"w-[45px] h-[45px]"}>
              <a href="https://www.tiktok.com/" target="_blank">
                <img
                  src="/public/images/socials/tiktok.svg"
                  style={{ width: 28, height: 28 }}
                />
              </a>
            </Button>
            <Button
              size={null}
              className={
                "w-[45px] h-[45px] bg-transparent hover:bg-transparent"
              }
            >
              <a href="https://www.snapchat.com/" target="_blank">
                <img
                  src="/public/images/socials/snapchat.svg"
                  style={{ width: 38, height: 38 }}
                />
              </a>
            </Button>
          </div>
        </div>

        <div className="right flex items-center justify-between">
          <div className="px-6">
            <h4 className="font-bold text-lg text-[#03081F]">Legal Pages</h4>
            <ul className="flex flex-col gap-3 mt-6">
              <li>
                <a href="#!" className="hover:underline">
                  Terms and conditions
                </a>
              </li>
              <li>
                <a href="#!" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#!" className="hover:underline">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#!" className="hover:underline">
                  Modern Slavery Statement
                </a>
              </li>
            </ul>
          </div>
          <div className="pl-6">
            <h4 className="font-bold text-lg text-[#03081F]">
              Important Links
            </h4>
            <ul className="flex flex-col gap-3 mt-6">
              <li>
                <a href="#!" className="hover:underline">
                  Get help
                </a>
              </li>
              <li>
                <a href="#!" className="hover:underline">
                  Add your restaurant
                </a>
              </li>
              <li>
                <a href="#!" className="hover:underline">
                  Sign up to deliver
                </a>
              </li>
              <li>
                <a href="#!" className="hover:underline">
                  Create a business account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#03081F]">
        <div className="max-w-380 mx-auto py-[26px] flex items-center justify-between">
          <div className="text-[15px] font-normal text-white">
            <span>Order.uk Copyright 2024, All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-15 text-[15px] font-normal text-white">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Pricing</span>
            <span>Do not sell or share my personal information</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
