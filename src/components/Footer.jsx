import { assets } from "../assets/assets_frontend/assets"

const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40  text-sm">
            {/*-- left section --*/}
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="" />
                <p className="leading-6 text-gray-700" >Prescripto lorem ipsum text, dummy text of the printing and transcripting company since the 1900s</p>
            </div>

            {/*-- middle section --*/}
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-2 text-gray-700">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/*-- right section --*/}
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-700">
                    <li>+254-7-41-404-115</li>
                    <li>simonnjoroge806@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <p className="py-5 text-center text-gray-700">copyright prescripto &copy; 2025</p>
            <hr />
        </div>
    </div>
  )
}

export default Footer