
const Sidebar = () => {
  return (
    <>
        <div className="flex flex-col items-center p-2 gap-4 justify-between pb-4 pt-4">
            <div className="profile-img  h-[45px] w-[45px] bg-white rounded-full">

            </div>
            <div className="sidebar-items flex flex-col gap-4 mb-[50px]">
              <div className="sidebar-item rounded-full bg-white h-[45px] w-[45px]"></div>
              <div className="sidebar-item rounded-full bg-white h-[45px] w-[45px]"></div>
              <div className="sidebar-item rounded-full bg-white h-[45px] w-[45px]"></div>
              <div className="sidebar-item rounded-full bg-white h-[45px] w-[45px]"></div>
              <div className="sidebar-item rounded-full bg-white h-[45px] w-[45px]"></div>
            </div>
            <div className="settings">
              <div className="sidebar-item rounded-full bg-white h-[45px] w-[45px]"></div>
            </div>
        </div>
    </>
  )
}

export default Sidebar
