import { ProccessPkl, SuccessPkl } from "@/components/icons/icons";
import { NotificationChildren } from "@/components/notification_child";
import WhiteTemplate from "@/components/WhiteTemplate";

export default function Notification() {
    return (
        <div className="">
            <WhiteTemplate>
                <h1 className="text-2xl mb-12 font-bold">Notification</h1>
                <div className="flex flex-col gap-5">
                    <NotificationChildren status="success" perusahaan="SMKN 2 MATARAM"/>
                    <NotificationChildren status="proccess" perusahaan="SMKN 2"/>
                </div>
            </WhiteTemplate>
        </div>
    );
}