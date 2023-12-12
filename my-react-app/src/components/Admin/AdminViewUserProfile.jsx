import { useRef } from "react";
import { ProfileInfo } from "../General/ProfileInfo"


export function AdminViewUserProfile() {
    let targetuserId = useRef('null')
    
    const HandleParams = () => {
        let params = (new URL(document.location)).searchParams;
        targetuserId.current = params.get('targetuserId');
      }
      HandleParams()


      console.log('targetuserId.current')
      console.log(targetuserId.current)
    
    return (
        <ProfileInfo targetUserId={ targetuserId.current } />
    )
}