// import RoomSideBar from "@/components/Test/Room/RoomSideBar";
import RoomProvider from "@/contexts/RoomContext";
import SocketProvider from "@/contexts/SocketContext";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoomProvider>
      <SocketProvider>
        <div className="">
          {/* <RoomSideBar /> */}
          {children}
        </div>
      </SocketProvider>
    </RoomProvider>
  );
}
