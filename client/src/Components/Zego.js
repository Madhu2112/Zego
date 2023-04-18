import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid'
import { ZegoSuperBoardManager } from "zego-superboard-web";
import TextEditor from './TextEditor';

export default function Zego(props) {
    // const { id } = useParams();
    const id = props.roomId;
    let myMeeting = async (element) => {
        const appID = 1290850120;
        const serverSecret = "52b88f609337bad7f1d3170c07bd94f0";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, uuidV4(), "nitin");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.addPlugins({ ZegoSuperBoardManager });
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            whiteboardConfig: {
                showAddImageButton: true,
            },
        })
    }
    return (
        <>
            <div className='myCallContainer' ref={myMeeting} style={{ width: '80vw', height: '80vh' }} >
            </div>
        </>
    )
}
