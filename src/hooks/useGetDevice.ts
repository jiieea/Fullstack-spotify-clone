import { useEffect, useState } from "react";

const useGetDevice = ()=> {
    const [ deviceInfo , setDeviceInfo ] = useState({
        os : 'unknown',
        browser : ' unknown',
        deviceType : 'unknown'
    })


    useEffect(() => {
        if(typeof window !== 'undefined' && window.navigator) {
            const userAgent = window.navigator.userAgent;
            let os = 'unknown';
            let deviceType = 'unknown'
            let browser =  'unknown'

                 // Detect OS
      if (userAgent.includes('Windows')) {
        os = 'Windows'
    } else if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS')) {
        os = 'macOS';
      } else if (userAgent.includes('Android')) {
        os = 'Android';
      } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        os = 'iOS';
      } else if (userAgent.includes('Linux')) {
        os = 'Linux';
      }
      
      // Detect Browser
      if (userAgent.includes('Edg')) {
        browser = 'Edge';
      } else if (userAgent.includes('Chrome')) {
        browser = 'Chrome';
      } else if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browser = 'Safari';
      }

      // Detect Device Type
      if (userAgent.match(/Mobi|Android|iPhone|iPad/i)) {
        deviceType = 'Mobile / Tablet';
      }

       setDeviceInfo({
        os,
        browser,
        deviceType,
      });
        }
    } , [])

    return deviceInfo;
}



export default useGetDevice;