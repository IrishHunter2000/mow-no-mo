import mow_no_mo_logo from "../assets/mow_no_mo_logo.png";

export default function Header() {

	return (
        <nav className="w-full flex relative items-center px-6 py-4 bg-green-500">
            <img className="w-1/12 min-w-[100px] left-0" src={mow_no_mo_logo} alt="Mow No Mo Logo" />
            <div className="h-full hidden md:flex absolute inset-0 flex justify-center items-center gap-6 text-lg font-medium">
            </div>
        </nav>
	)
}
